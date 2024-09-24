import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Vector3 } from 'three';
import { useAnimations } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Avatar = ({ scrollPosition }) => {
  const groupRef = useRef();
  const avatarRef = useRef();
  const { camera } = useThree();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const prevScrollPosition = useRef(scrollPosition);

  // Load the avatar model
  const gltf = useLoader(GLTFLoader, '/models/Me.glb',
    undefined, 
    (error) => {
      console.error('Error loading model:', error);
      setError(error);
    }
  );

  const walkingAnimation = useLoader(FBXLoader, '/animations/_Walking.fbx');
  const idleAnimation = useLoader(FBXLoader, '/animations/Idle.fbx');
  const walkingBackAnimation = useLoader(FBXLoader, '/animations/Offensive Idle.fbx'); // New animation

  useEffect(() => {
    if (gltf && walkingAnimation && idleAnimation && walkingBackAnimation) {
      console.log('GLTF and animations loaded:', gltf, walkingAnimation, idleAnimation, walkingBackAnimation);
      setModel(gltf.scene);

      // Create a new AnimationMixer
      const mixer = new AnimationMixer(gltf.scene);

      // Create animation actions
      const walkAction = mixer.clipAction(walkingAnimation.animations[0]);
      const idleAction = mixer.clipAction(idleAnimation.animations[0]);
      const walkBackAction = mixer.clipAction(walkingBackAnimation.animations[0]);

      // Set up actions object
      const actions = {
        Walk: walkAction,
        Idle: idleAction,
        WalkBack: walkBackAction
      };

      // Play the idle animation by default
      idleAction.play();

      // Store the mixer and actions in the component's state or ref
      groupRef.current.userData.mixer = mixer;
      groupRef.current.userData.actions = actions;
    }

    // Add keyboard event listener
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        setIsMovingForward(true);
      } else if (event.key === 'ArrowUp') {
        setIsMovingBackward(true);
      }
    };
    const handleKeyUp = (event) => {
      if (event.key === 'ArrowDown') {
        setIsMovingForward(false);
      } else if (event.key === 'ArrowUp') {
        setIsMovingBackward(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gltf, walkingAnimation, idleAnimation, walkingBackAnimation]);
const cameraOffset = useRef(new Vector3(-7, 5, 7)); // Offset from the avatar

  useFrame((state, delta) => {
    if (groupRef.current && avatarRef.current) {
      // Move avatar forward based on scroll or key press
      const scrollDelta = scrollPosition - prevScrollPosition.current;
      const moveForward = scrollDelta > 0 || isMovingForward;
      const moveBackward = scrollDelta < 0 || isMovingBackward;

      const { actions, mixer } = groupRef.current.userData;

      if (moveForward) {
        groupRef.current.position.z += 0.1; // Move forward
        if (actions['Walk']) {
          actions['Idle'].stop();
          actions['WalkBack'].stop();
          actions['Walk'].play();
        }
      } else if (moveBackward) {
        groupRef.current.position.z -= 0.4; // Move backward
        if (actions['WalkBack']) {
          actions['Idle'].stop();
          actions['Walk'].stop();
          actions['WalkBack'].play();
        }
      } else {
        if (actions['Idle']) {
          actions['Walk'].stop();
          actions['WalkBack'].stop();
          actions['Idle'].play();
        }
      }

      prevScrollPosition.current = scrollPosition;

      // Update camera position to follow the avatar
      const avatarPosition = new Vector3().setFromMatrixPosition(avatarRef.current.matrixWorld);
      const cameraTargetPosition = avatarPosition.clone().add(cameraOffset.current);
      avatarPosition.y += 3;
      
      camera.position.lerp(cameraTargetPosition, 0.1); // Smooth camera movement
      camera.lookAt(avatarPosition);

      if (mixer) {
        mixer.update(delta);
      }
    }
  });

  if (error) {
    console.error('Error in Avatar component:', error);
    return null;
  }

  // useEffect(()=>{
  //   camera.position.z = groupRef.current.position.z + 5;
  //   camera.position.y = groupRef.current.position.y + 1.6; 

  // },[])
  return (
    <group ref={groupRef} scale={[3, 3, 3]} 
            position={[-2, 0, -100]}>
      {model && (
        <primitive 
          object={model}
          position={[0, 0, 0]}
          ref={avatarRef}  // Initial position
        />
      )}
    </group>
  );
};

export default Avatar;

import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Heals = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene } = useThree();
  const modelRef = useRef();
  const { scene: gltfScene } = useGLTF('/models/desert.glb');

  useEffect(() => {
    const model = gltfScene.clone();
    model.position.set(...position);
    model.scale.set(...scale);
    model.rotation.set(...rotation.map(r => THREE.MathUtils.degToRad(r)));
    modelRef.current = model;
    scene.add(model);

    return () => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
      }
    };
  }, [gltfScene, scene, position, scale, rotation]);

  return null;
};

export default Heals;
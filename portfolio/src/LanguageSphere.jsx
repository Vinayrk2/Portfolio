import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

// Import your language logos
import javascriptLogo from './assets/js.jfif';
import pythonLogo from './assets/python.jfif';
import cLogo from './assets/c.jfif';
import javaLogo from './assets/java.jpg';
import phpLogo from './assets/php.jfif'
// Add more imports for other languages you know

const languages = [
  { name: 'JavaScript', logo: javascriptLogo },
  { name: 'Python', logo: pythonLogo },
  { name: 'C', logo: cLogo },
  { name: 'Java', logo: javaLogo },
  { name: 'php', logo: phpLogo },
  // Add more languages here
];

const LanguageBox = ({ position = [0, 0, 0], boxSize = 1, gap = 1.5 }) => {
  const groupRef = useRef();

  // Load textures
  const textures = useLoader(TextureLoader, languages.map(lang => lang.logo));

  // Create materials with textures
  const materials = textures.map((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
    });
  });

  // Create geometry
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

  // Rotate the boxes
  useFrame((state, delta) => {
    groupRef.current.children.forEach((child) => {
      child.rotation.y += delta * 0.3;
      child.rotation.x += delta * 0.1;
    });
  });

  return (
    <group ref={groupRef} position={position} rotation={[0,1.4,0]}>
      {languages.map((language, index) => {
        const x = (index - (languages.length - 1) / 2) * gap;

        return (
          <mesh
            key={language.name}
            geometry={geometry}
            material={materials[index]}
            position={[x, 0, 0]}
          />
        );
      })}
    </group>
  );
};

export default LanguageBox;
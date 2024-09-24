import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Image } from '@react-three/drei';

// Import images
import matraImage from './assets/mantra.png';
import bhagwadgeetaImage from './assets/bhagwadgeeta.png';
import moviehubImage from './assets/moviehub.png';
import qrCodeImage from '/vite.svg';

import bhagwadgeetaQR from "./assets/bhagwatgeetaQR.png"
import mantraQR from "./assets/mantraQR.png"
import moviehubQR from "./assets/moviehubQR.png"

const ProjectCard = ({ position, title, description, imageUrl, qrCodeUrl }) => {
  const meshRef = useRef();
  const [showQR, setShowQR] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [zOffset, setZOffset] = useState(0);

  useFrame((state, delta) => {
    if (hovered && zOffset < 2) {
      setZOffset(Math.min(zOffset + delta * 5, 2));
    } else if (!hovered && zOffset > 0) {
      setZOffset(Math.max(zOffset - delta * 5, 0));
    }
  });

  const toggleImage = () => {
    setShowQR(!showQR);
  };

  const handleImageError = () => {
    console.error(`Failed to load image: ${showQR ? qrCodeUrl : imageUrl}`);
    setImageError(true);
  };

  return (
    <group position={[position[0], position[1], position[2] + zOffset]} scale={1}>
      <mesh 
        ref={meshRef} 
        onClick={toggleImage}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={hovered ? "lightblue" : "white"} />
      </mesh>
      <group position={[0, 0, 0.11]}> 
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.25}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {description}
        </Text>
        {!imageError && (
          <Image 
            url={showQR ? qrCodeUrl : imageUrl}
            position={[0, -1, 0]}
            scale={[2.1, 1.8, 1]}
            onError={handleImageError}
            lookAt={[0, 0, 0]}
          />
        )}
        {imageError && (
          <Text
            position={[0, -9, 0]}
            fontSize={0.2}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            Image failed to load
          </Text>
        )}
      </group>
    </group>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "The Matra Project",
      description: "A project representing the culture of the Hindu religion, with modern technology.",
      position: [-4, 0, 0],
      imageUrl: matraImage,
      qrCodeUrl: mantraQR
    },
    {
      title: "The Bhagwadgeeta",
      description: "The Shreemad Bhagwadgeeta with hindi-english translation and explanation.",
      position: [0, 0, 0],
      imageUrl: bhagwadgeetaImage,
      qrCodeUrl: bhagwadgeetaQR
    },
    {
      title: "CineMatch",
      description: "{under development}           A platform that recommends movies based on your interests.",
      position: [4, 0, 0],
      imageUrl: moviehubImage,
      qrCodeUrl: moviehubQR
    },
  ];

  return (
    <group position={[5, 7, -60]} rotation={[0, 5.4, 0]} scale={1.3}>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </group>
  );
};

export default ProjectsSection;
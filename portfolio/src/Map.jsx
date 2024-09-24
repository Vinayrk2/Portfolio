import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Avatar from './Avatar';
import Heals from './Heals';
import * as THREE from 'three';
import ProjectsSection from './ProjectsSection';
import LanguageSphere from './LanguageSphere';
import HeroSection from './HeroSection';
import AvatarWrapper from './AvatarWrapper';

const Ground = React.memo(() => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
    <planeGeometry args={[100, 1000]} />
    <meshStandardMaterial color={0x228B22} />
  </mesh>
));

const Road = React.memo(() => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[10, 1000]} />
    <meshStandardMaterial color={0x333333} />
  </mesh>
));

const Map = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 5, 15], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: "linear-gradient(to right, lightgreen, lightblue)" }}
      dpr={[1, 2]} // Limit pixel ratio for better performance
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} />
      
      <Ground />
      <Road />

      <Avatar scrollPosition={scrollPosition} />
      {/* <AvatarWrapper scrollPosition={scrollPosition} /> */}
     
      <Heals 
        position={[30, -2, 40]} 
        scale={[4.5, 4.5, 4.5]} 
        rotation={[0, 90, 0]}
      />

      <ProjectsSection />

      <LanguageSphere position={[0, 5, -25]} radius={2} />
      <HeroSection />
      <OrbitControls enableDamping dampingFactor={0.25} />

    </Canvas>
  );
};

export default Map;
import React, { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import myImage from "./assets/myimage.jpeg"

function HeroContent() {
  const { viewport } = useThree()
  const group = useRef()

  const skills = [
    { category: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C++'] },
    { category: 'Frameworks', items: ['React', 'Node.js', 'Express', 'Django'] },
    { category: 'Other', items: ['Git', 'Docker', 'AWS', 'MongoDB'] },
  ]

  return (
    <group ref={group} rotation={[0, -0.5, 0]} lookAt={[0, 0, 0]} position={[0, 0, -20]}>
      <Html
        transform
        occlude
        position={[0, 5, 0]}
        style={{
          width: 1000,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)',
            fontFamily: 'Inter, sans-serif',
            perspective: '1000px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1200px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 2rem',
              transform: 'rotateY(-10deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div style={{ color: 'white', maxWidth: '50%', transform: 'translateZ(50px)' }}>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                HELLO THERE, WELCOME TO THE PORTFOLIO
              </p>
              <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>
                I'm Vinay Koshti
              </h1>
              <h2
                style={{
                  fontSize: '2.5rem',
                  color: '#ff6b6b',
                  margin: '0 0 1rem 0',
                }}
              >
                A Full Stack Developer
              </h2>
              <div style={{ marginBottom: '2rem' }}>
                <a href='mailto:vinaykoshti02@gmail.com'>
                  <button
                    style={{
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      marginRight: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    CONTACT ME
                  </button>
                </a>
                <a href='https://github.com/Vinayrk2'>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '2px solid white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      marginRight: '1rem',
                    }}
                  >
                    <i className="fa-brands fa-github"></i>
                  </button>
                </a>
                <a href='https://www.linkedin.com/in/vinay-kumar-6550ba265/'>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '2px solid white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </button>
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {skills.map((skillGroup, index) => (
                  <div key={index} style={{ marginRight: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ff6b6b' }}>
                      {skillGroup.category}
                    </h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {skillGroup.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                width: '40%',
                height: '70vh',
                backgroundColor: '#ff6b6b',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateZ(100px)',
              }}
            >
              <img
                src={myImage}
                alt="Vinay Koshti"
                style={{
                  width: '90%',
                  height: '95%',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function HeroSection() {
  return (
    <HeroContent />
  )
}


import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Toast } from 'react-bootstrap';
import Avatar from './Avatar';

const AvatarWrapper = ({ scrollPosition }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePositionChange = (position) => {
    if (position > -95 && position < -90) {
      showToastMessage('Welcome to my portfolio!');
    } else if (position > -50 && position < -45) {
      showToastMessage('This is the project section');
    } else if (position > -20 && position < -15) {
      showToastMessage('Here are my programming languages');
    } else if (position > -5 && position < 0) {
      showToastMessage('Thanks for visiting my portfolio!');
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
        <Avatar scrollPosition={scrollPosition} onPositionChange={handlePositionChange} />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Portfolio Guide</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default AvatarWrapper;

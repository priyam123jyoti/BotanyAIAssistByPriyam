import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function BackgroundAIModel() {
  // 1. Setup the reference to the 3D group
  const group = useRef<THREE.Group>(null); 
  
  // 2. Load the GLB model from the public folder
  // Note: /AI-Animation-3D.glb assumes the file is in public/AI-Animation-3D.glb
  const { scene, animations } = useGLTF('/AI-Animation-3D.glb');
  
  // 3. Extract the animations
  const { actions, names } = useAnimations(animations, group);

  // 4. Play the animation as soon as the component loads
  useEffect(() => {
    if (names.length > 0) {
      // Plays the first animation found in the file
      // fadeIn(0.5) makes the start look smooth
      actions[names[0]]?.fadeIn(0.5).play();
    }
  }, [actions, names]);

  return (
    /* Float gives it a gentle "floating in space" movement */
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <primitive 
        ref={group} 
        object={scene} 
        scale={2.8} // Adjust this if the robot is too small or big
        position={[0, -1.8, 0]} // Positions him vertically
        rotation={[0, -0.5, 0]} // Slight angle for a better "pose"
      />
    </Float>
  );
}

// Pre-load the model for faster performance
useGLTF.preload('/AI-Animation-3D.glb');
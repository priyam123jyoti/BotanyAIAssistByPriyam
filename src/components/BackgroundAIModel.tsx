import { useLayoutEffect, useRef } from 'react';
import { useGLTF, useAnimations, Float } from '@react-three/drei';

export default function BackgroundAIModel() {
  const group = useRef<any>(null);
  // Ensure the path matches EXACTLY what you preloaded in App.tsx
  const { scene, animations } = useGLTF('/AI-Animation-3D.glb');
  const { actions, names } = useAnimations(animations, group);

  useLayoutEffect(() => {
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <primitive 
        ref={group} 
        object={scene} 
        scale={2.5} // Try increasing this if it's too small
        position={[0, -1.5, 0]} 
      />
    </Float>
  );
}
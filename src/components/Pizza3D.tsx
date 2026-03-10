import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, ContactShadows, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ToppingProps {
  position: [number, number, number];
  type: 'pepperoni' | 'basil' | 'mushroom';
}

const Pepperoni = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}>
    <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
    <meshStandardMaterial color="#b91c1c" roughness={0.3} />
  </mesh>
);

const Basil = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} rotation={[Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2]}>
    <sphereGeometry args={[0.1, 8, 8]} />
    <meshStandardMaterial color="#15803d" roughness={0.5} />
  </mesh>
);

const Mushroom = ({ position }: { position: [number, number, number] }) => (
  <group position={position} rotation={[0, Math.random() * Math.PI, 0]}>
    <mesh position={[0, 0.05, 0]}>
      <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#e5e7eb" />
    </mesh>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
      <meshStandardMaterial color="#d1d5db" />
    </mesh>
  </group>
);

const PizzaModel = ({ toppings }: { toppings: string[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const toppingElements = useMemo(() => {
    const elements: React.ReactNode[] = [];
    const count = 12;
    
    toppings.forEach((type, toppingIdx) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (toppingIdx * 0.5);
        const radius = 0.5 + Math.random() * 1.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0.12;

        if (type === 'pepperoni') elements.push(<Pepperoni key={`pep-${i}`} position={[x, y, z]} />);
        if (type === 'basil') elements.push(<Basil key={`bas-${i}`} position={[x, y, z]} />);
        if (type === 'mushroom') elements.push(<Mushroom key={`mush-${i}`} position={[x, y, z]} />);
      }
    });
    return elements;
  }, [toppings]);

  return (
    <group ref={groupRef}>
      {/* Crust */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.1, 2, 0.2, 64]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>
      
      {/* Sauce/Cheese */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.1, 64]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Toppings */}
      {toppingElements}
    </group>
  );
};

export const PizzaScene = ({ toppings }: { toppings: string[] }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          minDistance={4} 
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.1}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <PizzaModel toppings={toppings} />
        </Float>

        <ContactShadows 
          position={[0, -0.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4.5} 
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

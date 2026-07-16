import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number; // Target X displacement
  y: number; // Target Y displacement
  rotation: number;
  scale: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  delay: number;
}

interface ConfettiProps {
  active: boolean;
}

const COLORS = [
  '#FFC0CB', // pink
  '#FFD700', // gold
  '#FF61A6', // hot pink
  '#22C55E', // green
  '#3B82F6', // blue
  '#A855F7', // purple
  '#F97316', // orange
  '#06B6D4'  // cyan
];

const SHAPES: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 45 }).map((_, i) => {
        // Random angle between 0 and 2*PI for radial spray
        const angle = Math.random() * Math.PI * 2;
        const speed = 100 + Math.random() * 250;
        const distance = 150 + Math.random() * 250;
        
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 50, // slightly upward focus
          rotation: Math.random() * 360 + 360, // multiple rotations
          scale: 0.5 + Math.random() * 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          delay: Math.random() * 0.15
        };
      });
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-40">
      {particles.map((p) => {
        const renderShape = () => {
          switch (p.shape) {
            case 'circle':
              return (
                <div 
                  className="rounded-full w-4 h-4" 
                  style={{ backgroundColor: p.color }} 
                />
              );
            case 'square':
              return (
                <div 
                  className="w-4 h-4 rotate-45" 
                  style={{ backgroundColor: p.color }} 
                />
              );
            case 'triangle':
              return (
                <div 
                  className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px]" 
                  style={{ borderBottomColor: p.color }} 
                />
              );
            case 'star':
              return (
                <svg className="w-5 h-5 fill-current" style={{ color: p.color }} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              );
          }
        };

        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: p.x,
              y: [0, p.y * 0.6, p.y, p.y + 150], // parabolic path
              scale: p.scale,
              opacity: [1, 1, 0.8, 0],
              rotate: p.rotation
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.6,
              ease: [0.1, 0.8, 0.25, 1],
              delay: p.delay
            }}
            className="absolute origin-center"
          >
            {renderShape()}
          </motion.div>
        );
      })}
    </div>
  );
};

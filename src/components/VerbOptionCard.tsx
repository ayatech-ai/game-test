import React from 'react';
import { motion } from 'motion/react';

interface VerbOptionCardProps {
  verb: string;
  onClick: () => void;
  disabled: boolean;
  isSelected: boolean;
  isCorrect: boolean | null;
  colorIndex: number;
}

export const VerbOptionCard: React.FC<VerbOptionCardProps> = ({
  verb,
  onClick,
  disabled,
  isSelected,
  isCorrect,
  colorIndex
}) => {
  // Set up 4 distinct playful color palettes for the cards
  const palettes = [
    {
      bg: 'bg-sky-400 hover:bg-sky-500',
      border: 'border-sky-600',
      text: 'text-white shadow-sky-200',
      activeBg: 'bg-sky-600',
    },
    {
      bg: 'bg-indigo-400 hover:bg-indigo-500',
      border: 'border-indigo-600',
      text: 'text-white shadow-indigo-200',
      activeBg: 'bg-indigo-600',
    },
    {
      bg: 'bg-amber-400 hover:bg-amber-500',
      border: 'border-amber-600',
      text: 'text-white shadow-amber-200',
      activeBg: 'bg-amber-600',
    },
    {
      bg: 'bg-pink-400 hover:bg-pink-500',
      border: 'border-pink-600',
      text: 'text-white shadow-pink-200',
      activeBg: 'bg-pink-600',
    }
  ];

  const palette = palettes[colorIndex % palettes.length];

  // If this card is currently selected and checked
  let statusClasses = `${palette.bg} ${palette.border} ${palette.text}`;
  if (isSelected) {
    if (isCorrect === true) {
      statusClasses = 'bg-emerald-500 border-emerald-700 text-white shadow-emerald-200';
    } else if (isCorrect === false) {
      statusClasses = 'bg-rose-500 border-rose-700 text-white shadow-rose-200';
    } else {
      statusClasses = 'bg-blue-600 border-blue-800 text-white shadow-blue-300';
    }
  } else if (disabled && isCorrect !== null) {
    // Dim other cards during evaluation state
    statusClasses = 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed opacity-50';
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04 } : {}}
      whileTap={!disabled ? { scale: 0.96, translateY: 4 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`w-full relative px-6 py-4 md:py-5 rounded-2xl border-2 border-b-6 font-display font-bold text-lg md:text-xl text-center cursor-pointer transition-all focus:outline-none select-none shadow-md ${statusClasses} ${
        isSelected ? 'translate-y-1 border-b-2' : ''
      }`}
      style={{
        // Give a slight tilt for extra playfulness
        transform: isSelected ? 'translateY(4px)' : 'none',
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="capitalize tracking-wider">{verb}</span>
      </div>
    </motion.button>
  );
};

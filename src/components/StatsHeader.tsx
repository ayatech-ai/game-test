import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Star, Heart, Trophy } from 'lucide-react';

interface StatsHeaderProps {
  score: number;
  streak: number;
  lives: number;
  maxLives: number;
  currentQuestion: number;
  totalQuestions: number;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
  score,
  streak,
  lives,
  maxLives,
  currentQuestion,
  totalQuestions
}) => {
  const progressPercent = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border-2 border-slate-100 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Progress & Level Info */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase font-sans">
            Progress
          </span>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-slate-700">
              {currentQuestion}/{totalQuestions}
            </span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold font-sans">
              Level 1
            </span>
          </div>
        </div>

        {/* Score Display with Bounce Animation on Change */}
        <div className="flex items-center gap-2 bg-yellow-50 px-3.5 py-1.5 rounded-xl border border-yellow-100">
          <motion.div
            key={score}
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: [1.2, 1], rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-yellow-500"
          >
            <Star className="w-6 h-6 fill-current" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[10px] text-yellow-600 font-extrabold uppercase leading-none font-sans">
              Score
            </span>
            <span className="font-display font-bold text-lg text-yellow-700 leading-none">
              {score}
            </span>
          </div>
        </div>

        {/* Hot Streak Counter with Flame Animation */}
        <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-100">
          <motion.div
            animate={streak > 0 ? {
              scale: [1, 1.15, 1],
              rotate: [0, -5, 5, 0],
            } : {}}
            transition={{
              repeat: streak > 0 ? Infinity : 0,
              duration: 1.5,
              ease: 'easeInOut'
            }}
            className={streak > 0 ? "text-orange-500" : "text-slate-300"}
          >
            <Flame className={`w-6 h-6 ${streak > 0 ? "fill-current drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)]" : ""}`} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[10px] text-orange-600 font-extrabold uppercase leading-none font-sans">
              Streak
            </span>
            <span className={`font-display font-bold text-lg leading-none ${streak > 0 ? "text-orange-700" : "text-slate-400"}`}>
              {streak} {streak >= 3 ? "🔥" : ""}
            </span>
          </div>
        </div>

        {/* Hearts / Lives indicator with animated loss */}
        <div className="flex items-center gap-1.5 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-100">
          <div className="flex flex-col items-end mr-1.5">
            <span className="text-[10px] text-rose-600 font-extrabold uppercase leading-none font-sans">
              Lives
            </span>
            <span className="font-display font-bold text-sm text-rose-700 leading-none mt-0.5">
              {lives} left
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: maxLives }).map((_, index) => {
              const active = index < lives;
              return (
                <motion.div
                  key={index}
                  animate={active ? { scale: 1 } : { scale: 0.8, rotate: -20, opacity: 0.35 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Heart
                    className={`w-5.5 h-5.5 transition-colors duration-300 ${
                      active ? "text-rose-500 fill-current drop-shadow-[0_1px_4px_rgba(244,63,94,0.3)]" : "text-slate-300"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Bar with smooth slider */}
      <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden relative border border-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400 rounded-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:12px_12px] opacity-40" />
      </div>
    </div>
  );
};

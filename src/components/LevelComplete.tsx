import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, RotateCcw, Award, CheckCircle, HelpCircle } from 'lucide-react';

interface LevelCompleteProps {
  score: number;
  maxStreak: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const LevelComplete: React.FC<LevelCompleteProps> = ({
  score,
  maxStreak,
  correctCount,
  wrongCount,
  totalQuestions,
  onRestart
}) => {
  const accuracy = Math.round((correctCount / (correctCount + wrongCount || 1)) * 100);
  
  // Decide rank and badges
  let rankTitle = "Grammar Explorer";
  let rankSub = "Keep practicing and you'll master verb tenses in no time!";
  let badgeColor = "from-amber-400 to-orange-500";
  
  if (accuracy === 100) {
    rankTitle = "Verbtacular Grandmaster!";
    rankSub = "Incredible! You have a flawless understanding of verb structures.";
    badgeColor = "from-yellow-400 via-amber-300 to-yellow-500";
  } else if (accuracy >= 80) {
    rankTitle = "Action Verb Champion!";
    rankSub = "Superb! You parsed those complex tenses like an absolute pro.";
    badgeColor = "from-blue-400 via-indigo-300 to-purple-500";
  } else if (accuracy >= 60) {
    rankTitle = "Action Apprentice";
    rankSub = "Good job! You've got a solid foundation. Practice makes perfect!";
    badgeColor = "from-emerald-400 to-teal-500";
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border-3 border-slate-100 p-8 md:p-10 text-center relative overflow-hidden">
      
      {/* Decorative ambient rays */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-blue-100/40 via-transparent to-transparent pointer-events-none rounded-full" />

      {/* Trophy / Icon Presentation */}
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-tr ${badgeColor} p-0.5 flex items-center justify-center shadow-lg shadow-orange-100 relative`}
        >
          {/* Sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-white/60 rounded-full"
          />
          <Trophy className="w-16 h-16 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
        </motion.div>

        {/* Small floating stars */}
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.4,
              ease: 'easeInOut'
            }}
            className="absolute text-yellow-400 fill-current"
            style={{
              top: idx === 0 ? '10%' : idx === 1 ? '30%' : '75%',
              left: idx === 0 ? '25%' : idx === 1 ? '70%' : '15%',
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Congratulations Headers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full font-sans shadow-sm inline-block mb-3">
          Level Complete
        </span>
        <h1 className="font-display font-black text-3xl md:text-4xl text-slate-800 tracking-tight leading-tight">
          {rankTitle}
        </h1>
        <p className="mt-2 text-slate-500 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
          {rankSub}
        </p>
      </motion.div>

      {/* Score Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 relative z-10">
        
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 flex flex-col items-center shadow-sm"
        >
          <div className="p-2 bg-yellow-400 rounded-xl text-yellow-900 mb-2">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-yellow-700 uppercase tracking-wider font-sans">
            Total XP
          </span>
          <span className="font-display font-bold text-2xl text-yellow-800 mt-1">
            {score}
          </span>
        </motion.div>

        {/* Max Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex flex-col items-center shadow-sm"
        >
          <div className="p-2 bg-orange-400 rounded-xl text-white mb-2">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider font-sans">
            Max Streak
          </span>
          <span className="font-display font-bold text-2xl text-orange-800 mt-1">
            {maxStreak} 🔥
          </span>
        </motion.div>

        {/* Accuracy Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex flex-col items-center shadow-sm"
        >
          <div className="p-2 bg-emerald-400 rounded-xl text-white mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-sans">
            Accuracy
          </span>
          <span className="font-display font-bold text-2xl text-emerald-800 mt-1">
            {accuracy}%
          </span>
        </motion.div>
      </div>

      {/* Interactive Evaluation Breakdown Bar */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-around text-xs text-slate-500 font-sans font-semibold mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Correct: <strong className="text-slate-800">{correctCount}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>Incorrect: <strong className="text-slate-800">{wrongCount}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Total Sentences: <strong className="text-slate-800">{totalQuestions}</strong></span>
        </div>
      </div>

      {/* Play Again button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
        className="w-full py-4 px-8 bg-blue-500 hover:bg-blue-600 text-white font-display font-black text-xl rounded-2xl border-b-6 border-blue-700 hover:scale-103 active:scale-97 cursor-pointer shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3"
      >
        <RotateCcw className="w-5 h-5 stroke-[2.5]" />
        Play Again
      </motion.button>
    </div>
  );
};

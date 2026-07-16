import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { VerbQuestion } from '../types';

interface SentenceBoardProps {
  question: VerbQuestion;
  selectedVerb: string | null;
  isCorrect: boolean | null;
  shakeTrigger: boolean;
  onClearSelection: () => void;
}

export const SentenceBoard: React.FC<SentenceBoardProps> = ({
  question,
  selectedVerb,
  isCorrect,
  shakeTrigger,
  onClearSelection
}) => {
  // Shake motion variants for wrong answers
  const boardVariants = {
    idle: { scale: 1 },
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      animate={shakeTrigger ? "shake" : "idle"}
      variants={boardVariants}
      className="w-full bg-white rounded-3xl shadow-md border-3 border-slate-100 p-6 md:p-8 relative overflow-hidden mb-8"
    >
      {/* Grammar Tense / Aspect Badge */}
      <div className="absolute top-0 left-6 transform -translate-y-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md font-sans">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {question.tense}
      </div>

      {/* Difficulty Indicator badge */}
      <div className="absolute top-4 right-6 flex items-center gap-1">
        <span className="text-[10px] uppercase font-black text-slate-400 font-sans tracking-wide">
          Difficulty:
        </span>
        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full font-sans ${
          question.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
          question.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
          'bg-rose-100 text-rose-700'
        }`}>
          {question.difficulty}
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center min-h-[160px]">
        {/* The Sentence with Slot */}
        <div className="text-xl md:text-2xl font-bold text-slate-800 text-center leading-relaxed max-w-2xl px-2 font-sans tracking-wide">
          <span>{question.sentenceBefore}</span>
          
          {/* Missing Verb Slot */}
          <div className="inline-block mx-2.5 align-middle">
            <motion.div
              layoutId="verbSlot"
              animate={
                isCorrect === true
                  ? { scale: [1, 1.08, 1], borderColor: '#10B981', backgroundColor: '#ECFDF5' }
                  : isCorrect === false
                  ? { scale: [1, 0.95, 1], borderColor: '#EF4444', backgroundColor: '#FEF2F2' }
                  : selectedVerb
                  ? { scale: 1, borderColor: '#3B82F6', backgroundColor: '#EFF6FF' }
                  : { scale: 1 }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`min-w-[140px] md:min-w-[180px] h-[52px] md:h-[60px] inline-flex items-center justify-center px-4 rounded-2xl border-3 border-dashed text-center transition-all ${
                isCorrect === true
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-display font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : isCorrect === false
                  ? "border-rose-500 bg-rose-50 text-rose-700 font-display font-extrabold"
                  : selectedVerb
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-display font-extrabold cursor-pointer hover:bg-blue-100/50"
                  : "border-slate-300 bg-slate-50 text-slate-400 font-sans font-medium animate-pulse"
              }`}
              onClick={selectedVerb && isCorrect === null ? onClearSelection : undefined}
            >
              {selectedVerb ? (
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.5, y: 15, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    className="tracking-wide"
                  >
                    {selectedVerb}
                  </motion.span>
                  
                  {isCorrect === true && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-emerald-500"
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current text-white bg-emerald-500 rounded-full" />
                    </motion.div>
                  )}

                  {isCorrect === false && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-rose-500 animate-bounce"
                    >
                      <AlertCircle className="w-5 h-5 fill-current text-white bg-rose-500 rounded-full" />
                    </motion.div>
                  )}
                  
                  {!isCorrect && (
                    <span className="text-[10px] text-slate-400 font-bold ml-1 px-1.5 py-0.5 bg-slate-200 rounded hover:bg-slate-300 transition-colors uppercase font-sans">
                      Clear
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm tracking-wider font-extrabold text-slate-400 uppercase font-display">
                  ? Place Verb
                </span>
              )}
            </motion.div>
          </div>
          
          <span>{question.sentenceAfter}</span>
        </div>
      </div>

      {/* Helpful Hint Tab at the bottom */}
      <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex items-center gap-2 justify-center text-xs text-slate-500 bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="font-medium">
          <strong className="text-slate-700 font-bold">Hint:</strong> {question.contextHint}
        </span>
      </div>
    </motion.div>
  );
};

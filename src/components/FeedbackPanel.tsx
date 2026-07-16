import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, RefreshCw, Star } from 'lucide-react';

interface FeedbackPanelProps {
  selectedVerb: string | null;
  isCorrect: boolean | null;
  explanation: string;
  tense: string;
  feedbackPhrase: string;
  onCheck: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  selectedVerb,
  isCorrect,
  explanation,
  tense,
  feedbackPhrase,
  onCheck,
  onContinue,
  onTryAgain
}) => {
  return (
    <div className="w-full mt-6">
      <AnimatePresence mode="wait">
        {isCorrect === null ? (
          /* Neutral / Selection State Panel */
          <motion.div
            key="selection-state"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
          >
            <div className="text-center sm:text-left">
              {selectedVerb ? (
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-sans">
                    Ready to evaluate?
                  </p>
                  <p className="text-slate-800 font-display font-semibold text-lg">
                    You selected <span className="text-blue-600 underline font-extrabold">{selectedVerb}</span>. Let's test it!
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-sans">
                    How to play
                  </p>
                  <p className="text-slate-600 font-sans text-sm md:text-base">
                    Select the best-fitting verb to complete the sentence above!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={onCheck}
              disabled={!selectedVerb}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-display font-black text-lg transition-all shadow-md select-none ${
                selectedVerb
                  ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer hover:scale-103 active:scale-97 border-b-4 border-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-b-4 border-slate-300'
              }`}
            >
              Check Answer
            </button>
          </motion.div>
        ) : isCorrect === true ? (
          /* Correct Answer State Panel */
          <motion.div
            key="correct-state"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-emerald-50 border-3 border-emerald-300 rounded-3xl p-6 shadow-md relative"
          >
            {/* Top Star badge */}
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg border border-yellow-200 font-display">
              <Star className="w-3.5 h-3.5 fill-current" />
              +10 XP
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500 text-white rounded-2xl shrink-0 shadow-lg shadow-emerald-200/50">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-emerald-800 leading-tight">
                    {feedbackPhrase}
                  </h3>
                  <div className="mt-1 text-emerald-700 text-sm md:text-base font-sans">
                    <p className="font-semibold text-emerald-800">
                      Rule explanation ({tense}):
                    </p>
                    <p className="mt-0.5 text-emerald-900/90 leading-relaxed font-medium">
                      {explanation}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onContinue}
                className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-black text-lg rounded-2xl border-b-4 border-emerald-700 hover:scale-103 active:scale-97 cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Incorrect Answer State Panel */
          <motion.div
            key="incorrect-state"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-rose-50 border-3 border-rose-300 rounded-3xl p-6 shadow-md"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-500 text-white rounded-2xl shrink-0 shadow-lg shadow-rose-200/50">
                  <X className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-rose-800 leading-tight animate-pulse">
                    {feedbackPhrase}
                  </h3>
                  <div className="mt-1 text-rose-700 text-sm md:text-base font-sans">
                    <p className="font-semibold text-rose-800">
                      Grammar Tip ({tense}):
                    </p>
                    <p className="mt-0.5 text-rose-900/90 leading-relaxed font-medium">
                      {explanation}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onTryAgain}
                className="w-full md:w-auto px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-display font-black text-lg rounded-2xl border-b-4 border-rose-700 hover:scale-103 active:scale-97 cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
              >
                Try Again
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

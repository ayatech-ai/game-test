import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  RotateCcw, 
  Heart, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

import { VERB_QUESTIONS, ENCOURAGING_PHRASES, WRONG_PHRASES } from './data';
import { GameStats, VerbQuestion } from './types';
import { StatsHeader } from './components/StatsHeader';
import { SentenceBoard } from './components/SentenceBoard';
import { VerbOptionCard } from './components/VerbOptionCard';
import { FeedbackPanel } from './components/FeedbackPanel';
import { LevelComplete } from './components/LevelComplete';
import { Confetti } from './components/Confetti';

// Simple Web Audio API Synthesizer for Retro Game Chimes
const playSynthSound = (type: 'correct' | 'wrong' | 'tap' | 'complete', enabled: boolean) => {
  if (!enabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'correct') {
      // Arpeggio C5 -> E5 -> G5
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
      });
    } else if (type === 'wrong') {
      // Dissonant low chord
      const notes = [220, 207.65]; // A3 and G#3
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      });
    } else if (type === 'complete') {
      // Success fanfare C5 -> G5 -> C6
      const notes = [523.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
      });
    }
  } catch (err) {
    console.warn('Audio Context failed to play sound', err);
  }
};

const INITIAL_STATS: GameStats = {
  score: 0,
  streak: 0,
  maxStreak: 0,
  lives: 3,
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  wrongAnswersCount: 0,
  completed: false,
};

export default function App() {
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [feedbackPhrase, setFeedbackPhrase] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [outOfLives, setOutOfLives] = useState(false);

  // Initialize randomly styled option options
  const currentQuestion: VerbQuestion = VERB_QUESTIONS[stats.currentQuestionIndex] || VERB_QUESTIONS[0];

  // Sound cue handler
  const handlePlaySound = useCallback((type: 'correct' | 'wrong' | 'tap' | 'complete') => {
    playSynthSound(type, soundEnabled);
  }, [soundEnabled]);

  // Handle option click
  const handleSelectVerb = (verb: string) => {
    if (isCorrect !== null) return; // Answer already evaluated
    setSelectedVerb(verb);
    handlePlaySound('tap');
  };

  // Evaluate chosen answer
  const handleCheckAnswer = () => {
    if (!selectedVerb || isCorrect !== null) return;

    const correct = selectedVerb.toLowerCase() === currentQuestion.correctVerb.toLowerCase();

    if (correct) {
      handlePlaySound('correct');
      setIsCorrect(true);
      setConfettiActive(true);
      
      const randomPhrase = ENCOURAGING_PHRASES[Math.floor(Math.random() * ENCOURAGING_PHRASES.length)];
      setFeedbackPhrase(randomPhrase);

      // Update scoring & streak
      setStats(prev => {
        const nextStreak = prev.streak + 1;
        const nextMaxStreak = Math.max(prev.maxStreak, nextStreak);
        return {
          ...prev,
          score: prev.score + 10,
          streak: nextStreak,
          maxStreak: nextMaxStreak,
          correctAnswersCount: prev.correctAnswersCount + 1
        };
      });
    } else {
      handlePlaySound('wrong');
      setIsCorrect(false);
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);

      const randomPhrase = WRONG_PHRASES[Math.floor(Math.random() * WRONG_PHRASES.length)];
      setFeedbackPhrase(randomPhrase);

      // Update scoring, streak & reduce lives
      setStats(prev => {
        const nextLives = prev.lives - 1;
        if (nextLives <= 0) {
          setTimeout(() => setOutOfLives(true), 1200);
        }
        return {
          ...prev,
          streak: 0,
          lives: nextLives,
          wrongAnswersCount: prev.wrongAnswersCount + 1
        };
      });
    }
  };

  // Progress to next question or end game
  const handleContinue = () => {
    setConfettiActive(false);
    setSelectedVerb(null);
    setIsCorrect(null);

    const nextIndex = stats.currentQuestionIndex + 1;
    if (nextIndex >= VERB_QUESTIONS.length) {
      handlePlaySound('complete');
      setStats(prev => ({
        ...prev,
        completed: true
      }));
    } else {
      setStats(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex
      }));
    }
  };

  // Reset answer states on incorrect answer retry
  const handleTryAgain = () => {
    setSelectedVerb(null);
    setIsCorrect(null);
  };

  // Completely restart game
  const handleRestart = () => {
    setStats(INITIAL_STATS);
    setSelectedVerb(null);
    setIsCorrect(null);
    setConfettiActive(false);
    setOutOfLives(false);
    handlePlaySound('tap');
  };

  // Heart refill mechanism for practice
  const handleRefillLives = () => {
    setStats(prev => ({
      ...prev,
      lives: 3
    }));
    setOutOfLives(false);
    setSelectedVerb(null);
    setIsCorrect(null);
    handlePlaySound('correct');
  };

  return (
    <div className="min-h-screen bg-sky-50/70 py-6 px-4 md:py-12 flex flex-col items-center justify-between relative overflow-hidden font-sans">
      
      {/* Decorative whimsical clouds and circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/45 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center relative z-10">
        
        {/* Game Title Bar */}
        <header className="w-full flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-md text-white animate-wave">
              <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl md:text-3xl text-slate-800 tracking-tight leading-none">
                Action Station
              </h1>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans leading-none mt-1 block">
                Verb Grammar Arcade
              </span>
            </div>
          </div>

          {/* Sound Control Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200' 
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </header>

        <AnimatePresence mode="wait">
          {stats.completed ? (
            /* LEVEL COMPLETE SCREEN */
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <LevelComplete
                score={stats.score}
                maxStreak={stats.maxStreak}
                correctCount={stats.correctAnswersCount}
                wrongCount={stats.wrongAnswersCount}
                totalQuestions={VERB_QUESTIONS.length}
                onRestart={handleRestart}
              />
            </motion.div>
          ) : outOfLives ? (
            /* OUT OF LIVES SCREEN */
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl border-3 border-slate-100 p-8 md:p-10 text-center relative overflow-hidden"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-6 border border-rose-200">
                <Heart className="w-12 h-12 stroke-[2.5] animate-pulse" />
              </div>

              <h2 className="font-display font-black text-3xl text-slate-800 tracking-tight">
                No Hearts Left!
              </h2>
              <p className="mt-3 text-slate-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium">
                Mistakes are just markers on the path of learning. Refill your hearts to continue practicing this level!
              </p>

              {/* Heart Refill / Retry Action */}
              <div className="mt-8 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRefillLives}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-black text-lg rounded-2xl border-b-6 border-emerald-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 fill-current" />
                  Refill Hearts & Keep Going
                </motion.button>

                <button
                  onClick={handleRestart}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-sm rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart from Beginning
                </button>
              </div>
            </motion.div>
          ) : (
            /* GAMEPLAY SCREEN */
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col"
            >
              {/* Confetti celebration spray */}
              <Confetti active={confettiActive} />

              {/* Header Stats Panel */}
              <StatsHeader
                score={stats.score}
                streak={stats.streak}
                lives={stats.lives}
                maxLives={3}
                currentQuestion={stats.currentQuestionIndex + 1}
                totalQuestions={VERB_QUESTIONS.length}
              />

              {/* Sentence Presentation Board */}
              <SentenceBoard
                question={currentQuestion}
                selectedVerb={selectedVerb}
                isCorrect={isCorrect}
                shakeTrigger={shakeTrigger}
                onClearSelection={handleTryAgain}
              />

              {/* Verb Options grid */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-3.5 px-1">
                  <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-sans">
                    Choose the Correct Verb Form:
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedVerb === option;
                    return (
                      <div key={option} className="w-full">
                        <VerbOptionCard
                          verb={option}
                          colorIndex={idx}
                          isSelected={isSelected}
                          isCorrect={isSelected ? isCorrect : null}
                          disabled={isCorrect !== null}
                          onClick={() => handleSelectVerb(option)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom slide-up Action & Tip Panel */}
              <FeedbackPanel
                selectedVerb={selectedVerb}
                isCorrect={isCorrect}
                explanation={currentQuestion.explanation}
                tense={currentQuestion.tense}
                feedbackPhrase={feedbackPhrase}
                onCheck={handleCheckAnswer}
                onContinue={handleContinue}
                onTryAgain={handleTryAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative visual footer credit line */}
      <footer className="mt-8 text-center text-slate-400 text-xs font-sans font-semibold">
        <p>© 2026 Action Station • Interactive Grammar Simulator</p>
      </footer>
    </div>
  );
}

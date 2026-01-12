import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMoanaQuiz } from '../services/moanaAI';
import { supabase } from '../supabase'; // Import for future score saving
import type { User } from '@supabase/supabase-js';

// Import our optimized components
import { TopicSelection } from '../components/quiz/TopicSelection';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { ResultsModal } from '../components/quiz/ResultsModal';
import { LoadingScreen } from '../components/quiz/LoadingScreen';

// 1. Define Props to accept the logged-in user
interface BotanyQuizProps {
  user: User | null;
}

export default function BotanyQuiz({ user }: BotanyQuizProps) {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(10).fill(-1));
  const [loading, setLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isRecapMode, setIsRecapMode] = useState(false);

  // Get user's first name for a personalized Jarvis feel
  const researcherName = user?.user_metadata?.full_name?.split(' ')[0] || "Researcher";

  // --- CORE LOGIC ---
  const startQuiz = async (topic: string) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      const data = await generateMoanaQuiz(topic);
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIdx(0);
        setUserAnswers(new Array(data.length).fill(-1));
        setIsRecapMode(false);
        setShowResultsModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("🚨 NEURAL LINK ERROR: Could not fetch botany data.");
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    if (selectedTopic) {
      startQuiz(selectedTopic);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (isRecapMode) return; // Prevent changing answers during review
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const scorePercentage = Math.round(
    (userAnswers.reduce((score, ans, idx) =>
      ans === questions[idx]?.correct ? score + 1 : score, 0
    ) / (questions.length || 10)) * 100
  );

  // --- COMPONENT ROUTING ---

  if (loading) {
    return <LoadingScreen topic={selectedTopic} />;
  }

  // Topic Selection Screen (Entry Point)
  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <div className="absolute top-6 right-6 z-50 text-emerald-500/50 font-mono text-xs uppercase tracking-widest">
          Operator: {researcherName}
        </div>
        <TopicSelection
          onStart={startQuiz}
          onBack={() => navigate('/jarvis-gateway')}
        />
      </div>
    );
  }

  // Quiz & Results Screen
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <QuizInterface
        question={questions[currentIdx]}
        currentIdx={currentIdx}
        totalQuestions={questions.length}
        userAnswer={userAnswers[currentIdx]}
        isRecap={isRecapMode}
        onAnswer={handleAnswer}
        onNext={() => setCurrentIdx(prev => prev + 1)}
        onPrev={() => setCurrentIdx(prev => prev - 1)}
        onFinish={() => setShowResultsModal(true)}
      />

      {showResultsModal && (
        <ResultsModal
          score={scorePercentage}
          onReview={() => {
            setIsRecapMode(true);
            setShowResultsModal(false);
            setCurrentIdx(0);
          }}
          onTerminate={() => navigate('/jarvis-gateway')}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
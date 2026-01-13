import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateMoanaQuiz } from '../services/moanaAI';
import type { User } from '@supabase/supabase-js';

// --- FIXED IMPORTS ---
// 1. Get the data from the constants file (Where the lists live)
import { SUBJECT_TOPICS } from '../components/quiz/constants'; 
// 2. Get the visual component from the Selection file
import { TopicSelection } from '../components/quiz/TopicSelection';

import { QuizInterface } from '../components/quiz/QuizInterface';
import { ResultsModal } from '../components/quiz/ResultsModal';
import { LoadingScreen } from '../components/quiz/LoadingScreen';

interface QuizProps {
  user: User | null;
}

export default function Quiz({ user }: QuizProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // --- NEW DYNAMIC SUBJECT LOGIC ---
  // We grab 'subjectKey' from the navigation state sent by JarvisGateway
  const subjectKey = (location.state?.subjectKey as string) || 'botany';
  const subjectTitle = (location.state?.subjectTitle || 'Botany Quiz').toUpperCase();
  
  // Use the key to filter the correct list (Physics, Chem, etc.)
  const currentTopics = SUBJECT_TOPICS[subjectKey] || SUBJECT_TOPICS.botany;

  // --- STATE MANAGEMENT ---
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isRecapMode, setIsRecapMode] = useState(false);

  const researcherName = user?.user_metadata?.full_name?.split(' ')[0] || "Researcher";

  // --- CORE LOGIC ---
  const startQuiz = async (topic: string) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      // Pass both the specific topic and the subject label to the AI
      const data = await generateMoanaQuiz(topic, subjectTitle);
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIdx(0);
        setUserAnswers(new Array(data.length).fill(-1));
        setIsRecapMode(false);
        setShowResultsModal(false);
      }
    } catch (err) {
      console.error(err);
      alert(`🚨 NEURAL LINK ERROR: Could not sync ${subjectTitle} data.`);
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const scorePercentage = Math.round(
    (userAnswers.reduce((score, ans, idx) =>
      ans === questions[idx]?.correct ? score + 1 : score, 0
    ) / (questions.length || 1)) * 100
  );

  // VIEW: LOADING
  if (loading) return <LoadingScreen topic={`${subjectTitle}: ${selectedTopic}`} />;

  // VIEW: TOPIC SELECTION
  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <div className="absolute top-6 right-6 z-50 text-emerald-500/50 font-mono text-[10px] uppercase tracking-widest">
          Sector: {subjectTitle} | Op: {researcherName}
        </div>
        <TopicSelection
          subjectTitle={subjectTitle}
          topics={currentTopics} 
          onStart={startQuiz}
          onBack={() => navigate('/jarvis-gateway')}
        />
      </div>
    );
  }

  // VIEW: QUIZ & RESULTS
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <QuizInterface
        subjectLabel={subjectTitle} 
        question={questions[currentIdx]}
        currentIdx={currentIdx}
        totalQuestions={questions.length}
        userAnswer={userAnswers[currentIdx]}
        isRecap={isRecapMode}
        onAnswer={(i) => {
          if (isRecapMode) return;
          const updatedAnswers = [...userAnswers];
          updatedAnswers[currentIdx] = i;
          setUserAnswers(updatedAnswers);
        }}
        onNext={() => setCurrentIdx(prev => Math.min(prev + 1, questions.length - 1))}
        onPrev={() => setCurrentIdx(prev => Math.max(prev - 1, 0))}
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
          onRestart={() => startQuiz(selectedTopic)}
        />
      )}
    </div>
  );
}
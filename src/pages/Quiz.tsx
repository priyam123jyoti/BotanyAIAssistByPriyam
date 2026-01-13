import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { generateMoanaQuiz } from '../services/moanaAI';
import type { User } from '@supabase/supabase-js';

// Constants & Components
import { SUBJECT_TOPICS } from '../components/quiz/constants';
import { TopicSelection } from '../components/quiz/TopicSelection';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { ResultsModal } from '../components/quiz/ResultsModal';
import { LoadingScreen } from '../components/quiz/LoadingScreen';

interface QuizProps {
  user: User | null;
}

export default function Quiz({ user }: QuizProps) {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>(); // 🛰️ Detects 'physics', 'botany' etc.

  // --- DYNAMIC SUBJECT LOGIC ---
  const activeSubject = subjectId || 'botany';
  const currentTopics = SUBJECT_TOPICS[activeSubject] || SUBJECT_TOPICS.botany;
  const subjectLabel = activeSubject.toUpperCase();

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
      // We pass both the topic AND the subject to the AI service
      const data = await generateMoanaQuiz(topic, subjectLabel);
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIdx(0);
        setUserAnswers(new Array(data.length).fill(-1));
        setIsRecapMode(false);
        setShowResultsModal(false);
      }
    } catch (err) {
      console.error(err);
      alert(`🚨 NEURAL LINK ERROR: Could not sync ${subjectLabel} data.`);
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

  if (loading) return <LoadingScreen topic={`${subjectLabel}: ${selectedTopic}`} />;

  // Topic Selection Screen
  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <div className="absolute top-6 right-6 z-50 text-emerald-500/50 font-mono text-[10px] uppercase tracking-widest">
          Sector: {subjectLabel} | Op: {researcherName}
        </div>
        <TopicSelection
          subjectTitle={subjectLabel}
          topics={currentTopics} // 👈 Passes the correct list (Physics topics, etc.)
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
        subjectLabel={subjectLabel} // 👈 Displays "PHYSICS SYNC" etc.
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
          onRestart={() => startQuiz(selectedTopic)}
        />
      )}
    </div>
  );
}
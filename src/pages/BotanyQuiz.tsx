import React, { useState } from 'react'; // Removed unused useCallback
import { useNavigate } from 'react-router-dom';
import { generateBotanyQuiz } from '../services/jarvisAI';

// Import our new optimized components
import { TopicSelection } from '../components/quiz/TopicSelection';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { ResultsModal } from '../components/quiz/ResultsModal';
import { LoadingScreen } from '../components/quiz/LoadingScreen';

export default function BotanyQuiz() {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(10).fill(-1));
  const [loading, setLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isRecapMode, setIsRecapMode] = useState(false);

  // --- CORE LOGIC ---
  const startQuiz = async (topic: string) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      const data = await generateBotanyQuiz(topic);
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIdx(0);
        // Reset answers for the new round
        setUserAnswers(new Array(data.length).fill(-1));
        setIsRecapMode(false);
        setShowResultsModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Neural Link Failed. Check your connection.");
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  // NEW: This function handles the "Next Round" button
  const handleRestart = () => {
    if (selectedTopic) {
      startQuiz(selectedTopic); // Re-runs the quiz with the SAME topic
    }
  };

  const handleAnswer = (optionIndex: number) => {
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

  if (!selectedTopic) {
    return (
      <TopicSelection 
        onStart={startQuiz} 
        onBack={() => navigate('/jarvis-gateway')} 
      />
    );
  }

  return (
    <>
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
          onRestart={handleRestart} // <--- ADD THIS LINE HERE
        />
      )}
    </>
  );
}
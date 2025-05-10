import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import testsData, { Question } from '../../data/testsData';
import reviewersData from '../../data/reviewersData';
import { LessonStatus, updateLessonStatus } from '../../utils/storageUtils';
import { CheckCircle, AlertCircle, Timer, RotateCcw } from 'lucide-react';

const PracticeTest: React.FC = () => {
  const { reviewerId, subjectId, lessonId } = useParams<{
    reviewerId: string;
    subjectId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  
  // Find the test data
  const test = testsData.find(
    t => t.reviewerId === reviewerId && 
    t.subjectId === subjectId && 
    t.lessonId === lessonId
  );
  
  // Find the lesson information
  const reviewer = reviewersData.find(r => r.id === reviewerId);
  const subject = reviewer?.subjects.find(s => s.id === subjectId);
  const lesson = subject?.lessons.find(l => l.id === lessonId);
  
  // State for tracking user answers, current question, and test completion
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  
  // Initialize answers array
  useEffect(() => {
    if (test) {
      setAnswers(new Array(test.questions.length).fill(null));
    }
  }, [test]);
  
  // Timer countdown
  useEffect(() => {
    if (!isCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isCompleted) {
      // Auto-submit when time runs out
      handleSubmitTest();
    }
  }, [timeRemaining, isCompleted]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // If test not found
  if (!test || !lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header 
          title="Test Not Found" 
          showBackButton 
          backPath={`/reviewers/${reviewerId}/${subjectId}`} 
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Test not found
            </h2>
            <p className="text-gray-600">
              The practice test you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle answer selection
  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (isCompleted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  // Submit test for grading
  const handleSubmitTest = () => {
    // Calculate score
    let correct = 0;
    test.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const finalScore = Math.round((correct / test.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    
    // Update lesson status to completed if score is good
    if (finalScore >= 70) {
      updateLessonStatus(
        reviewerId || '',
        subjectId || '',
        lessonId || '',
        LessonStatus.COMPLETED
      );
    } else {
      updateLessonStatus(
        reviewerId || '',
        subjectId || '',
        lessonId || '',
        LessonStatus.IN_PROGRESS
      );
    }
  };
  
  // Reset the test
  const handleResetTest = () => {
    setAnswers(new Array(test.questions.length).fill(null));
    setCurrentQuestion(0);
    setIsCompleted(false);
    setTimeRemaining(600);
  };
  
  // Current question data
  const question: Question = test.questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        title={test.title} 
        showBackButton 
        backPath={`/reviewers/${reviewerId}/${subjectId}`} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Test header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {lesson.title} - Practice Test
            </h2>
            <p className="text-gray-600">
              Answer all questions to complete this test.
            </p>
          </div>
          
          {!isCompleted && (
            <div className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-lg">
              <Timer size={18} className="mr-2" />
              <span className="font-medium">Time remaining: {formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        
        {isCompleted ? (
          /* Test results */
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                score >= 70 ? 'bg-green-100' : 'bg-red-100'
              } mb-4`}>
                {score >= 70 ? (
                  <CheckCircle size={40} className="text-green-600" />
                ) : (
                  <AlertCircle size={40} className="text-red-600" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {score >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
              </h3>
              
              <p className="text-gray-600 mb-2">
                You scored {score}% on this test.
              </p>
              
              <p className="text-gray-600">
                {score >= 70 
                  ? 'You have completed this lesson!' 
                  : 'You need to score at least 70% to complete this lesson.'}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {test.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className={`p-4 rounded-lg ${
                    answers[index] === question.correctAnswer
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className="font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  
                  <div className="ml-4">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`py-1 ${
                          optIndex === question.correctAnswer
                            ? 'text-green-700 font-medium'
                            : optIndex === answers[index] && optIndex !== question.correctAnswer
                              ? 'text-red-700 line-through'
                              : ''
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleResetTest}
                className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                <RotateCcw size={18} className="mr-2" />
                Try Again
              </button>
              
              <button
                onClick={() => navigate(`/reviewers/${reviewerId}/${subjectId}`)}
                className="flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Back to Lessons
              </button>
            </div>
          </div>
        ) : (
          /* Test questions */
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Question navigator */}
            <div className="flex flex-wrap gap-2 mb-6">
              {test.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white'
                      : answers[index] !== null
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {/* Current question */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {currentQuestion + 1}. {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectAnswer(currentQuestion, index)}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      answers[currentQuestion] === index
                        ? 'bg-blue-100 border-blue-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                        answers[currentQuestion] === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`py-2 px-4 rounded-lg ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentQuestion < test.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  disabled={answers.includes(null)}
                  className={`py-2 px-4 rounded-lg ${
                    answers.includes(null)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticeTest;
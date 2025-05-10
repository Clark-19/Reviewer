import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import reviewersData from '../../data/reviewersData';
import { Book } from 'lucide-react';

const ReviewerSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleReviewerSelect = (reviewerId: string) => {
    navigate(`/reviewers/${reviewerId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Select a Reviewer" />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Reviewers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewersData.map((reviewer) => (
            <div
              key={reviewer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <Book size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {reviewer.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {reviewer.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{reviewer.subjects.length} Subjects</span>
                  <span>
                    {reviewer.subjects.reduce(
                      (total, subject) => total + subject.lessons.length, 
                      0
                    )} Lessons
                  </span>
                </div>
                
                <button
                  onClick={() => handleReviewerSelect(reviewer.id)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReviewerSelection;
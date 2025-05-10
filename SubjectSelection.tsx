import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import reviewersData from '../../data/reviewersData';
import { BookOpen, FileText, GraduationCap as Graduation } from 'lucide-react';
import { getSubjectProgressCounts } from '../../utils/storageUtils';

const SubjectSelection: React.FC = () => {
  const { reviewerId } = useParams<{ reviewerId: string }>();
  const navigate = useNavigate();
  
  // Find the selected reviewer
  const reviewer = reviewersData.find(r => r.id === reviewerId);
  
  if (!reviewer) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title="Subject Not Found" showBackButton backPath="/reviewers" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Reviewer not found</h2>
            <p className="text-gray-600">The reviewer you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/reviewers/${reviewerId}/${subjectId}`);
  };
  
  // Icons for different subjects
  const getSubjectIcon = (subjectId: string) => {
    switch (subjectId) {
      case 'math':
        return <Graduation size={24} />;
      case 'science':
        return <FileText size={24} />;
      case 'english':
      default:
        return <BookOpen size={24} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        title={reviewer.name} 
        showBackButton 
        backPath="/reviewers" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select a Subject
        </h2>
        <p className="text-gray-600 mb-6">
          {reviewer.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewer.subjects.map((subject) => {
            const totalLessons = subject.lessons.length;
            const progress = getSubjectProgressCounts(
              reviewerId || '',
              subject.id,
              totalLessons
            );
            
            // Calculate progress percentage
            const progressPercentage = totalLessons > 0 
              ? Math.round((progress.completed / totalLessons) * 100) 
              : 0;
              
            return (
              <div
                key={subject.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      {getSubjectIcon(subject.id)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {subject.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{subject.lessons.length} Lessons</span>
                    <span>{progressPercentage}% Complete</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-gray-600">Not Started: {progress.notStarted}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="text-gray-600">In Progress: {progress.inProgress}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-gray-600">Completed: {progress.completed}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SubjectSelection;
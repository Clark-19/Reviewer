import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import LessonItem from './LessonItem';
import reviewersData, { Lesson, Subject, Reviewer } from '../../data/reviewersData';
import { getLessonStatus } from '../../utils/storageUtils';

const LessonsList: React.FC = () => {
  const { reviewerId, subjectId } = useParams<{ 
    reviewerId: string; 
    subjectId: string;
  }>();
  const navigate = useNavigate();
  
  // Find the reviewer and subject from the data
  const reviewer: Reviewer | undefined = reviewersData.find(
    r => r.id === reviewerId
  );
  
  const subject: Subject | undefined = reviewer?.subjects.find(
    s => s.id === subjectId
  );
  
  if (!reviewer || !subject) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header 
          title="Not Found" 
          showBackButton 
          backPath={reviewerId ? `/reviewers/${reviewerId}` : '/reviewers'} 
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Content not found
            </h2>
            <p className="text-gray-600">
              The lessons you're looking for don't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        title={`${subject.name} - ${reviewer.name}`} 
        showBackButton 
        backPath={`/reviewers/${reviewerId}`} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {subject.name} Lessons
          </h2>
          <p className="text-gray-600">
            Complete all lessons to master {subject.name} for the {reviewer.name}.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-4 border-b bg-gray-100 font-medium text-gray-700">
            <div className="col-span-5 md:col-span-4">Lesson</div>
            <div className="col-span-4 md:col-span-3 text-center">YouTube Tutorial</div>
            <div className="hidden md:block md:col-span-3 text-center">Practice Test</div>
            <div className="col-span-3 md:col-span-2 text-center">Status</div>
          </div>
          
          {subject.lessons.map((lesson: Lesson) => {
            const status = getLessonStatus(
              reviewerId || '',
              subjectId || '',
              lesson.id
            );
            
            return (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                reviewerId={reviewerId || ''}
                subjectId={subjectId || ''}
                status={status}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LessonsList;
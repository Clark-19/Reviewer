import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../../data/reviewersData';
import { LessonStatus, updateLessonStatus } from '../../utils/storageUtils';
import { Youtube, FileCheck, ExternalLink } from 'lucide-react';

interface LessonItemProps {
  lesson: Lesson;
  reviewerId: string;
  subjectId: string;
  status: LessonStatus;
}

const LessonItem: React.FC<LessonItemProps> = ({ 
  lesson, 
  reviewerId, 
  subjectId, 
  status 
}) => {
  const [currentStatus, setCurrentStatus] = useState<LessonStatus>(status);
  const navigate = useNavigate();
  
  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as LessonStatus;
    setCurrentStatus(newStatus);
    updateLessonStatus(reviewerId, subjectId, lesson.id, newStatus);
  };
  
  // Handle taking a test
  const handleTakeTest = () => {
    // Update status to in progress if it's not started
    if (currentStatus === LessonStatus.NOT_STARTED) {
      const newStatus = LessonStatus.IN_PROGRESS;
      setCurrentStatus(newStatus);
      updateLessonStatus(reviewerId, subjectId, lesson.id, newStatus);
    }
    
    navigate(`/reviewers/${reviewerId}/${subjectId}/${lesson.id}/test`);
  };
  
  // Handle opening YouTube tutorial
  const handleOpenYouTube = () => {
    // Update status to in progress if it's not started
    if (currentStatus === LessonStatus.NOT_STARTED) {
      const newStatus = LessonStatus.IN_PROGRESS;
      setCurrentStatus(newStatus);
      updateLessonStatus(reviewerId, subjectId, lesson.id, newStatus);
    }
    
    // Open embedded YouTube player in a modal (basic implementation)
    window.open(lesson.youtubeLink, '_blank', 'noopener,noreferrer');
  };
  
  // Status badge styling
  const getStatusStyles = () => {
    switch (currentStatus) {
      case LessonStatus.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200';
      case LessonStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case LessonStatus.NOT_STARTED:
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };
  
  // Status label
  const getStatusLabel = () => {
    switch (currentStatus) {
      case LessonStatus.COMPLETED:
        return 'Completed';
      case LessonStatus.IN_PROGRESS:
        return 'In Progress';
      case LessonStatus.NOT_STARTED:
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 p-4 items-center border-b hover:bg-gray-50 transition-colors">
      <div className="col-span-5 md:col-span-4">
        <h3 className="font-medium text-gray-800">{lesson.title}</h3>
      </div>
      
      <div className="col-span-4 md:col-span-3 flex justify-center">
        <button
          onClick={handleOpenYouTube}
          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center"
        >
          <Youtube size={16} className="mr-1" />
          <span className="hidden md:inline">Watch</span>
        </button>
      </div>
      
      <div className="hidden md:flex md:col-span-3 justify-center">
        {lesson.hasTest ? (
          <button
            onClick={handleTakeTest}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
          >
            <FileCheck size={16} className="mr-1" />
            Take Test
          </button>
        ) : (
          <span className="text-gray-400">No test available</span>
        )}
      </div>
      
      <div className="col-span-3 md:col-span-2">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className={`w-full text-xs md:text-sm p-1 md:p-2 rounded border ${getStatusStyles()}`}
        >
          <option value={LessonStatus.NOT_STARTED}>Not Started</option>
          <option value={LessonStatus.IN_PROGRESS}>In Progress</option>
          <option value={LessonStatus.COMPLETED}>Completed</option>
        </select>
      </div>
      
      {/* Mobile-only test button */}
      <div className="col-span-12 md:hidden mt-2">
        {lesson.hasTest && (
          <button
            onClick={handleTakeTest}
            className="w-full p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
          >
            <FileCheck size={16} className="mr-1" />
            Take Practice Test
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonItem;
export enum LessonStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

// Key for storing lesson progress in localStorage
const PROGRESS_STORAGE_KEY = 'reviewer_lesson_progress';

// Define an interface for lesson progress tracking
interface LessonProgress {
  [reviewerId: string]: {
    [subjectId: string]: {
      [lessonId: string]: LessonStatus;
    };
  };
}

// Load existing progress from localStorage
export const loadProgress = (): LessonProgress => {
  try {
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return storedProgress ? JSON.parse(storedProgress) : {};
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return {};
  }
};

// Save progress to localStorage
export const saveProgress = (progress: LessonProgress): void => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
};

// Get status for a specific lesson
export const getLessonStatus = (
  reviewerId: string,
  subjectId: string,
  lessonId: string
): LessonStatus => {
  const progress = loadProgress();
  
  return progress[reviewerId]?.[subjectId]?.[lessonId] || LessonStatus.NOT_STARTED;
};

// Update status for a specific lesson
export const updateLessonStatus = (
  reviewerId: string,
  subjectId: string,
  lessonId: string,
  status: LessonStatus
): void => {
  const progress = loadProgress();
  
  // Initialize nested objects if they don't exist
  if (!progress[reviewerId]) {
    progress[reviewerId] = {};
  }
  
  if (!progress[reviewerId][subjectId]) {
    progress[reviewerId][subjectId] = {};
  }
  
  // Update the status
  progress[reviewerId][subjectId][lessonId] = status;
  
  // Save the updated progress
  saveProgress(progress);
};

// Get count of lessons by status for a specific subject
export const getSubjectProgressCounts = (
  reviewerId: string,
  subjectId: string,
  totalLessons: number
) => {
  const progress = loadProgress();
  
  let completed = 0;
  let inProgress = 0;
  
  if (progress[reviewerId]?.[subjectId]) {
    const lessonStatuses = progress[reviewerId][subjectId];
    
    for (const status of Object.values(lessonStatuses)) {
      if (status === LessonStatus.COMPLETED) {
        completed++;
      } else if (status === LessonStatus.IN_PROGRESS) {
        inProgress++;
      }
    }
  }
  
  const notStarted = totalLessons - completed - inProgress;
  
  return {
    completed,
    inProgress,
    notStarted
  };
};
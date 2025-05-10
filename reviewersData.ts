export interface Lesson {
  id: string;
  title: string;
  youtubeLink: string;
  hasTest: boolean;
}

export interface Subject {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface Reviewer {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

// Mock data for the reviewers, subjects, and lessons
const reviewersData: Reviewer[] = [
  {
    id: 'upcat',
    name: 'UPCAT Reviewer',
    description: 'University of the Philippines College Admission Test Reviewer',
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        lessons: [
          {
            id: 'algebra',
            title: 'Algebra Fundamentals',
            youtubeLink: 'https://www.youtube.com/embed/NybHckSEQBI',
            hasTest: true,
          },
          {
            id: 'geometry',
            title: 'Geometry Basics',
            youtubeLink: 'https://www.youtube.com/embed/302eJ3TzJQU',
            hasTest: true,
          },
          {
            id: 'trigonometry',
            title: 'Trigonometric Functions',
            youtubeLink: 'https://www.youtube.com/embed/mhd9FXYdf4s',
            hasTest: true,
          },
        ],
      },
      {
        id: 'science',
        name: 'Science',
        lessons: [
          {
            id: 'physics',
            title: 'Basic Physics Concepts',
            youtubeLink: 'https://www.youtube.com/embed/b1t41Q3xRM8',
            hasTest: true,
          },
          {
            id: 'chemistry',
            title: 'Chemistry Essentials',
            youtubeLink: 'https://www.youtube.com/embed/rz4Dd1I_fX0',
            hasTest: true,
          },
          {
            id: 'biology',
            title: 'Biology Fundamentals',
            youtubeLink: 'https://www.youtube.com/embed/QnQe0xW_JY4',
            hasTest: true,
          },
        ],
      },
      {
        id: 'english',
        name: 'English',
        lessons: [
          {
            id: 'grammar',
            title: 'Grammar and Usage',
            youtubeLink: 'https://www.youtube.com/embed/9SrEEPt4MQA',
            hasTest: true,
          },
          {
            id: 'reading',
            title: 'Reading Comprehension',
            youtubeLink: 'https://www.youtube.com/embed/L_HWLvP4eYc',
            hasTest: true,
          },
          {
            id: 'vocabulary',
            title: 'Vocabulary Building',
            youtubeLink: 'https://www.youtube.com/embed/k3FC_FhTLIY',
            hasTest: true,
          },
        ],
      },
    ],
  },
  {
    id: 'acet',
    name: 'ACET Reviewer',
    description: 'Ateneo College Entrance Test Reviewer',
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        lessons: [
          {
            id: 'algebra',
            title: 'Advanced Algebra',
            youtubeLink: 'https://www.youtube.com/embed/NybHckSEQBI',
            hasTest: true,
          },
          {
            id: 'calculus',
            title: 'Pre-Calculus',
            youtubeLink: 'https://www.youtube.com/embed/IYrjm5J1LSc',
            hasTest: true,
          },
        ],
      },
      {
        id: 'science',
        name: 'Science',
        lessons: [
          {
            id: 'advanced-physics',
            title: 'Advanced Physics',
            youtubeLink: 'https://www.youtube.com/embed/b1t41Q3xRM8',
            hasTest: true,
          },
          {
            id: 'earth-science',
            title: 'Earth Science',
            youtubeLink: 'https://www.youtube.com/embed/at8RGGBJTGs',
            hasTest: true,
          },
        ],
      },
      {
        id: 'english',
        name: 'English',
        lessons: [
          {
            id: 'writing',
            title: 'Essay Writing',
            youtubeLink: 'https://www.youtube.com/embed/GgkRoYPLhts',
            hasTest: true,
          },
          {
            id: 'critical-reading',
            title: 'Critical Reading',
            youtubeLink: 'https://www.youtube.com/embed/L_HWLvP4eYc',
            hasTest: true,
          },
        ],
      },
    ],
  },
  {
    id: 'ust',
    name: 'UST Reviewer',
    description: 'University of Santo Tomas Entrance Exam Reviewer',
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        lessons: [
          {
            id: 'statistics',
            title: 'Statistics Fundamentals',
            youtubeLink: 'https://www.youtube.com/embed/xxpc-HPKN28',
            hasTest: true,
          },
          {
            id: 'problem-solving',
            title: 'Problem Solving Techniques',
            youtubeLink: 'https://www.youtube.com/embed/uHKDk-4m9zM',
            hasTest: true,
          },
        ],
      },
      {
        id: 'science',
        name: 'Science',
        lessons: [
          {
            id: 'medical-concepts',
            title: 'Medical Science Concepts',
            youtubeLink: 'https://www.youtube.com/embed/byASUXGq8JQ',
            hasTest: true,
          },
          {
            id: 'scientific-method',
            title: 'Scientific Method',
            youtubeLink: 'https://www.youtube.com/embed/yi0hwFDQTSQ',
            hasTest: true,
          },
        ],
      },
      {
        id: 'english',
        name: 'English',
        lessons: [
          {
            id: 'comprehension',
            title: 'Advanced Comprehension',
            youtubeLink: 'https://www.youtube.com/embed/L_HWLvP4eYc',
            hasTest: true,
          },
          {
            id: 'literature',
            title: 'Filipino Literature',
            youtubeLink: 'https://www.youtube.com/embed/nhz0_CmV2M0',
            hasTest: true,
          },
        ],
      },
    ],
  },
];

export default reviewersData;
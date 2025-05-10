export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Test {
  reviewerId: string;
  subjectId: string;
  lessonId: string;
  title: string;
  questions: Question[];
}

// Mock data for practice tests
const testsData: Test[] = [
  // UPCAT - Math - Algebra
  {
    reviewerId: 'upcat',
    subjectId: 'math',
    lessonId: 'algebra',
    title: 'Algebra Fundamentals Practice Test',
    questions: [
      {
        id: 'q1',
        question: 'Solve for x: 2x + 5 = 13',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Factor the expression: x² - 9',
        options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', '(x+3)²'],
        correctAnswer: 0,
      },
      {
        id: 'q3',
        question: 'Simplify: (3x² - 6x) ÷ 3x',
        options: ['x - 2', 'x - 3', 'x', '3x - 2'],
        correctAnswer: 0,
      },
      {
        id: 'q4',
        question: 'What is the solution to the inequality 4x - 3 > 9?',
        options: ['x > 3', 'x > 2', 'x < 3', 'x < 2'],
        correctAnswer: 0,
      },
      {
        id: 'q5',
        question: 'If f(x) = 2x² - 4x + 5, what is f(3)?',
        options: ['11', '13', '17', '23'],
        correctAnswer: 1,
      },
    ],
  },
  
  // UPCAT - Science - Physics
  {
    reviewerId: 'upcat',
    subjectId: 'science',
    lessonId: 'physics',
    title: 'Basic Physics Concepts Practice Test',
    questions: [
      {
        id: 'q1',
        question: 'What is the SI unit of force?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        question: 'Which of the following is a vector quantity?',
        options: ['Mass', 'Time', 'Temperature', 'Velocity'],
        correctAnswer: 3,
      },
      {
        id: 'q3',
        question: 'According to Newton\'s third law:',
        options: [
          'An object in motion stays in motion',
          'Force equals mass times acceleration',
          'Every action has an equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q4',
        question: 'Calculate the acceleration of an object with a mass of 5 kg when a force of 10 N is applied.',
        options: ['1 m/s²', '2 m/s²', '5 m/s²', '10 m/s²'],
        correctAnswer: 1,
      },
      {
        id: 'q5',
        question: 'What is the formula for kinetic energy?',
        options: ['KE = mgh', 'KE = ½mv²', 'KE = Fd', 'KE = W/t'],
        correctAnswer: 1,
      },
    ],
  },
  
  // ACET - English - Writing
  {
    reviewerId: 'acet',
    subjectId: 'english',
    lessonId: 'writing',
    title: 'Essay Writing Practice Test',
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is NOT typically part of an essay introduction?',
        options: [
          'Thesis statement',
          'Hook or attention grabber',
          'Detailed evidence',
          'Background information'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        question: 'Which transition word would best show contrast between ideas?',
        options: ['Furthermore', 'Similarly', 'However', 'Therefore'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        question: 'What is the purpose of a conclusion in an essay?',
        options: [
          'To introduce new arguments',
          'To summarize key points and restate the thesis',
          'To provide detailed examples',
          'To ask questions for further research'
        ],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'Which of the following is an example of a strong thesis statement?',
        options: [
          'I will discuss the effects of climate change.',
          'Climate change is happening everywhere.',
          'Climate change has significant economic, social, and environmental impacts that require immediate action.',
          'Climate change is bad for the environment.'
        ],
        correctAnswer: 2,
      },
      {
        id: 'q5',
        question: 'What is the correct order of the writing process?',
        options: [
          'Drafting, revising, editing, planning',
          'Planning, drafting, revising, editing',
          'Revising, planning, drafting, editing',
          'Editing, planning, drafting, revising'
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export default testsData;
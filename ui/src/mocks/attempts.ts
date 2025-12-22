import type { Attempt } from "../components/fluency-dashboard";

const currentDate = new Date();

const currentWeek = new Date(
  currentDate.getFullYear(), 
  currentDate.getMonth(),
  currentDate.getDate() - 7,
  currentDate.getHours(), 
  currentDate.getMinutes()
);

const pastMonth = new Date(
  currentDate.getFullYear(), 
  currentDate.getMonth() - 1,
  currentDate.getDate(),
  currentDate.getHours(), 
  currentDate.getMinutes()
);

const old = new Date(
  currentDate.getFullYear() - 1, 
  currentDate.getMonth(),
  currentDate.getDate(),
  currentDate.getHours(), 
  currentDate.getMinutes()
);

export const mockAttempts: Attempt[] = [
  { 
    id: 1, 
    studentUuid: "student-week-1", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: true 
  },
  { 
    id: 2, 
    studentUuid: "student-week-2", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: false 
  },
  { 
    id: 3, 
    studentUuid: "student-week-3", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: true 
  },
  { 
    id: 4, 
    studentUuid: "student-week-4", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: false 
  },
  { 
    id: 5, 
    studentUuid: "student-week-5", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: true 
  },
  { 
    id: 6, 
    studentUuid: "student-week-6", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: false 
  },
  { 
    id: 7, 
    studentUuid: "student-week-7", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: true 
  },
  { 
    id: 8, 
    studentUuid: "student-week-8", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: false 
  },
  { 
    id: 9, 
    studentUuid: "student-week-9", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: true 
  },
  { 
    id: 10, 
    studentUuid: "student-week-10", 
    attemptedAt: {
      date: currentWeek.toISOString()
    },
    firstOperand: 2, 
    secondOperand: 3, 
    correct: false 
  },

  { 
    id: 101, 
    studentUuid: "student-month-1", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: false 
  },
  { 
    id: 102, 
    studentUuid: "student-month-2", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: true 
  },
  { 
    id: 103, 
    studentUuid: "student-month-3", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: false 
  },
  { 
    id: 104, 
    studentUuid: "student-month-4", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: true 
  },
  { 
    id: 105, 
    studentUuid: "student-month-5", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: false 
  },
  { 
    id: 106, 
    studentUuid: "student-month-6", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: true 
  },
  { 
    id: 107, 
    studentUuid: "student-month-7", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: false 
  },
  { 
    id: 108, 
    studentUuid: "student-month-8", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: true 
  },
  { 
    id: 109, 
    studentUuid: "student-month-9", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: false 
  },
  { 
    id: 110, 
    studentUuid: "student-month-10", 
    attemptedAt: {
      date: pastMonth.toISOString()
    },
    firstOperand: 4, 
    secondOperand: 5, 
    correct: true 
  },

  { 
    id: 201, 
    studentUuid: "student-old-1", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: true 
  },
  { 
    id: 202, 
    studentUuid: "student-old-2", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 203, 
    studentUuid: "student-old-3", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 204, 
    studentUuid: "student-old-4", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: true 
  },
  { 
    id: 205, 
    studentUuid: "student-old-5", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 206, 
    studentUuid: "student-old-6", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 207, 
    studentUuid: "student-old-7", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: true 
  },
  { 
    id: 208, 
    studentUuid: "student-old-8", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 209, 
    studentUuid: "student-old-9", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: false 
  },
  { 
    id: 210, 
    studentUuid: "student-old-10", 
    attemptedAt: {
      date: old.toISOString()
    },
    firstOperand: 6, 
    secondOperand: 7, 
    correct: true 
  },
];

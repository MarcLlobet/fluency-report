import type { Attempt } from "../components/fluency-dashboard";
import { calculateTableSummaries } from "./calculateTableSummaries";
import {describe, it, expect } from 'vitest';

describe('calculateTableSummaries', () => {

  it('returns if students have difficulties', () => {
    const caseAttempt = {
      studentUuid: 'student1',
      firstOperand: 2, 
      secondOperand: 3,
      attemptedAt: {
        date: new Date(2000, 1, 1, 13).toDateString()
      }
    }

    const attempts: Attempt[] = [
      { id: 0, ...caseAttempt, studentUuid: 'student2', correct: false},
      { id: 1, ...caseAttempt, correct: false },
      { id: 2, ...caseAttempt, correct: true },
      { id: 3, ...caseAttempt, correct: false, 
        attemptedAt: {
          date: new Date(2000, 1, 1, 14).toDateString()
        }
      },
    ];

    const summaries = calculateTableSummaries(attempts);

    const firstOperandSummary = summaries.find(s => s.firstOperand === 2);
    const secondOperandSummary = firstOperandSummary?.secondOperands.find(s => s.secondOperand === 3);

    expect(secondOperandSummary).toEqual({
      isInProgress: false,
      isMostlyFailed: true,
      key: "2x3",
      secondOperand: 3,
    });
  });

  it('returns table with unseen state', () => {

    const attempts: Attempt[] = [
    ];

    const summaries = calculateTableSummaries(attempts);

    const firstOperandSummary = summaries.find(s => s.firstOperand === 2);
    const secondOperandSummary = firstOperandSummary?.secondOperands.find(s => s.secondOperand === 3);

    expect(secondOperandSummary).toEqual({
      isInProgress: false,
      isMostlyFailed: false,
      key: "2x3",
      secondOperand: 3,
    });
  });

  it('returns first operand data', () => {

    const attempts: Attempt[] = [
    ];

    const summaries = calculateTableSummaries(attempts);

    const firstOperandSummary = summaries.find(s => s.firstOperand === 2);

    expect(firstOperandSummary).toEqual({
      firstOperand: 2,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      secondOperands: expect.any(Array),
    });
  });
});
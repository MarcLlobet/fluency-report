import type { Attempt } from "../components/fluency-dashboard";
import { MAX_OPERAND } from "../constants";

type SecondOperand = {
  key: string;
  secondOperand: number;
  isInProgress: boolean;
  studentsWithDifficulties: number | null;
  isMostlyFailed: boolean;
}

type NewTableSummary = {
    firstOperand: number;
    secondOperands: SecondOperand[]
};

export function calculateTableSummaries(attempts: Attempt[]): NewTableSummary[] {
  const summaries: NewTableSummary[] = [];

  // Per cada taula de multiplicar (1-12)
  for (let firstOperand = 1; firstOperand <= MAX_OPERAND; firstOperand++) {
    // Filtrar intents per aquesta taula (firstOperand)
    const firstOperandAttempts = attempts.filter((a) => a.firstOperand === firstOperand);

    for (let secondOperand = 1; secondOperand <= MAX_OPERAND; secondOperand++) {
      const tableAttempts = firstOperandAttempts.filter((a) => a.secondOperand === secondOperand);

      const firstOperandSummary = summaries.find(s => s.firstOperand === firstOperand);

      if(tableAttempts.length === 0) {
        // No hi ha intents per aquesta taula
        if(!firstOperandSummary) {
          summaries.push({
            firstOperand,
            secondOperands: [
              {
                key: `${firstOperand}x${secondOperand}`,
                secondOperand,
                isInProgress: false,
                studentsWithDifficulties: null,
                isMostlyFailed: false,
              },
            ],
          });
          } else {
            firstOperandSummary.secondOperands.push({
              key: `${firstOperand}x${secondOperand}`,
              secondOperand,
              isInProgress: false,
              studentsWithDifficulties: null,
              isMostlyFailed: false,
            });
        }
        continue;
      };

      // Agrupar per alumne
      const attemptsByStudent = new Map<string, Attempt[]>();
      for (const attempt of tableAttempts) {
        const studentAttempts = attemptsByStudent.get(attempt.studentUuid) || [];
        studentAttempts.push(attempt);
        attemptsByStudent.set(attempt.studentUuid, studentAttempts);
      }

      // Comptar alumnes amb dificultats (últim intent incorrecte)
      let studentsWithDifficulties = 0;
      for (const [, studentAttempts] of attemptsByStudent) {
        // Ordenar per attemptedAt descendent i agafar l'últim
        const sortedAttempts = studentAttempts.sort(
          (a, b) =>
            new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
        );
        const lastAttempt = sortedAttempts[0];

        if (!lastAttempt.correct) {
          studentsWithDifficulties++;
        }
      }

      if(!firstOperandSummary) {
        summaries.push({
          firstOperand,
          secondOperands: [
            {
              key: `${firstOperand}x${secondOperand}`,
              secondOperand,
              isInProgress: true,
              studentsWithDifficulties,
              isMostlyFailed: studentsWithDifficulties > (tableAttempts.length / 2),
            },
          ],
        });
      } else {
        firstOperandSummary.secondOperands.push({
          key: `${firstOperand}x${secondOperand}`,
          secondOperand,
          isInProgress: true,
          studentsWithDifficulties,
          isMostlyFailed: studentsWithDifficulties > (tableAttempts.length / 2),
        });
      }
    }
  }

  return summaries;
}
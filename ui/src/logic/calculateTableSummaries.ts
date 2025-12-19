import type { Attempt } from "../components/fluency-dashboard";
import { MAX_OPERAND } from "../constants";

export type SecondOperand = {
  key: string;
  secondOperand: number;
  isInProgress: boolean;
  isMostlyFailed: boolean;
}

type NewTableSummary = {
    firstOperand: number;
    secondOperands: SecondOperand[]
};

type AttemptsByOperand = Map<number, Attempt[]>;

export function calculateTableSummaries(attempts: Attempt[]): NewTableSummary[] {
  

  const attemptsByFirstOperand = Map.groupBy(
    attempts, 
    ({ firstOperand }) => firstOperand
  );

  const attemptsByOperands = Array.from(attemptsByFirstOperand.entries())
    .reduce((prev, [firstOperand, firstOperandAttempts]) => 
      new Map([
        ...prev.entries(),
        [
          firstOperand,
          Map.groupBy(
            firstOperandAttempts,
            ({ secondOperand }) => secondOperand
          ) as AttemptsByOperand
        ]
      ]),
    new Map<number, AttemptsByOperand>()
  );

  const failedLastAttempts = Array.from(attemptsByOperands.values())
  .map((attemptsByFirstOperand) => 
    Array.from(attemptsByFirstOperand.values())
    .map((attemptsBySecondOperand) => {
      const attemptsByStudent = Object.groupBy(attemptsBySecondOperand, ({ studentUuid }) => studentUuid) as Record<string, Attempt[]>;

      const studentAttempts = Object.values(attemptsByStudent)

      const sortedAttempts = studentAttempts
        .map(attempts => attempts.sort(
          (a, b) =>
            new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
        ));
      const failedAttempts = sortedAttempts.filter(attemptsByStudent => {
          const [latestAttempt] = attemptsByStudent
          return !latestAttempt.correct
        })

      return failedAttempts.length > (studentAttempts.length / 2)
    })
  );

  const twelveList = Array.from({length: MAX_OPERAND}, (_, f) => f + 1)

  const tableSummary = twelveList.map((firstOperand, firstOperandIndex) => ({
    firstOperand,
    secondOperands: twelveList.map((secondOperand, secondOperandIndex) => {
      const isMostlyFailed = !!failedLastAttempts?.[firstOperandIndex]?.[secondOperandIndex]

      const hasAttempts = !!attemptsByOperands
          ?.get(firstOperand)
          ?.get(secondOperand)
          ?.length;

      return {
        key: `${firstOperand}x${secondOperand}`,
        secondOperand,
        isMostlyFailed: hasAttempts && isMostlyFailed,
        isInProgress: hasAttempts && !isMostlyFailed,
      }
    })
  }));

  return tableSummary;
}
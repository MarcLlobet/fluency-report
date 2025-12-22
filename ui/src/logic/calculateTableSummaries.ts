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

const getAttemptsByOperands = (attempts: Attempt[]): Map<
  number, 
  Map<number, Attempt[]>
> => {
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
          )
        ]
      ]),
    new Map<number, Map<number, Attempt[]>>()
  );

  return attemptsByOperands;
}

export const calculateTableSummaries = (attempts: Attempt[]): NewTableSummary[] => {
  const attemptsByOperands = getAttemptsByOperands(attempts);

  const failedLastAttempts = Array.from(attemptsByOperands.entries())
  .reduce((prevFirst, [firstOperand, attemptsByFirstOperand]) => new Map([
      ...prevFirst.entries(),
      [
        firstOperand,
        Array.from(attemptsByFirstOperand.entries())
        .reduce((prevSecond, [secondOperand, attemptsBySecondOperand]) => {
          const attemptsByStudent = Object.groupBy(attemptsBySecondOperand, ({ studentUuid }) => studentUuid) as Record<string, Attempt[]>;

          const studentAttempts = Object.values(attemptsByStudent);

          const lastAttempts = studentAttempts.map(attempts => 
            attempts.reduce((prevAttempt, attempt) =>
              prevAttempt.attemptedAt >= attempt.attemptedAt
                ? prevAttempt
                : attempt
              , { attemptedAt: 0 } as unknown as Attempt
            )
          );

          const failedAttempts = lastAttempts.filter(attemptByStudent => 
            !attemptByStudent.correct
          );

          const isMostlyFailed = failedAttempts.length > (studentAttempts.length / 2)

          return new Map([
            ...prevSecond.entries(),
            [
              secondOperand,
              isMostlyFailed
            ]
          ])
        }, new Map<number, boolean>())
      ]
    ]), new Map<number, Map<number, boolean>>()
  );

  const twelveList = Array.from({length: MAX_OPERAND}, (_, f) => f + 1)

  const tableSummary = twelveList.map((firstOperand) => ({
    firstOperand,
    secondOperands: twelveList.map((secondOperand) => {
      const isMostlyFailed = !!failedLastAttempts
          ?.get(firstOperand)
          ?.get(secondOperand);

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
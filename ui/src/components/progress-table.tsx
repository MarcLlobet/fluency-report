import styled from "@emotion/styled";
import { useMemo } from "react";

import CellFluency from "./cell-fluency";
import type { Attempt } from "./fluency-dashboard";

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

type TableSummary = {
  multiplicationTable: number;
  isInProgress: boolean;
  studentsWithDifficulties: number | null;
};

function calculateTableSummaries(attempts: Attempt[]): TableSummary[] {
  const summaries: TableSummary[] = [];

  // Per cada taula de multiplicar (1-12)
  for (let table = 1; table <= 12; table++) {
    // Filtrar intents per aquesta taula (firstOperand)
    const tableAttempts = attempts.filter((a) => a.firstOperand === table);

    if (tableAttempts.length === 0) {
      // No hi ha intents per aquesta taula
      summaries.push({
        multiplicationTable: table,
        isInProgress: false,
        studentsWithDifficulties: null,
      });
      continue;
    }

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

    summaries.push({
      multiplicationTable: table,
      isInProgress: true,
      studentsWithDifficulties,
    });
  }

  return summaries;
}

type Props = {
  attempts: Attempt[];
};

function ProgressTable({ attempts }: Props): React.ReactNode {
  const tableSummaries = useMemo(
    () => calculateTableSummaries(attempts),
    [attempts]
  );

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Tabla de multiplicar</TableHeader>
          <TableHeader>En progreso</TableHeader>
          <TableHeader>Alumnos con dificultades</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
        {tableSummaries.map((summary) => (
          <TableRow key={summary.multiplicationTable}>
            <TableCell>{summary.multiplicationTable}</TableCell>
            <TableCell>
              <CellFluency
                status={summary.isInProgress ? "inProgress" : "notSeen"}
                variant="cell-small-size"
              />
            </TableCell>
            <TableCell>
              {summary.studentsWithDifficulties !== null
                ? summary.studentsWithDifficulties
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProgressTable;

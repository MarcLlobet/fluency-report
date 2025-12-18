import styled from "@emotion/styled";
import { useMemo } from "react";

import CellFluency from "./cell-fluency";
import type { Attempt } from "./fluency-dashboard";
import { calculateTableSummaries } from "../logic/calculateTableSummaries";
import { MAX_OPERAND } from "../constants";

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

type Props = {
  attempts: Attempt[];
};

const operandsList = Array.from({length: MAX_OPERAND}, (_, i) => i + 1);

function ProgressTable({ attempts }: Props): React.ReactNode {
  const tableSummaries = useMemo(
    () => calculateTableSummaries(attempts),
    [attempts]
  );

  console.log("Table Summaries:", tableSummaries);

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>x</TableHeader>
          {operandsList.map(operand => (
            <TableHeader key={operand}>{operand}</TableHeader>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {tableSummaries.map((summary) => (
          <TableRow key={summary.firstOperand}>
            <TableHeader>{summary.firstOperand}</TableHeader>
            {summary.secondOperands.map((secondOperand) => (
              <TableCell key={secondOperand.key}>
                <CellFluency
                  status={secondOperand.isMostlyFailed
                    ? "mostlyFailed"
                    : secondOperand.isInProgress
                    ? "inProgress"
                    : "notSeen"}
                  variant="cell-small-size"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProgressTable;

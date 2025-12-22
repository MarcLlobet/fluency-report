import styled from "@emotion/styled";
import { useMemo } from "react";
import ProgressTable from "./progress-table";
import { getAttemptsByDate, type DateOptionsType } from "../logic/dateFilter";

export type Attempt = {
  id: number;
  studentUuid: string;
  attemptedAt: {
    date: string;
  };
  firstOperand: number;
  secondOperand: number;
  correct: boolean;
};

const FluencyDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function FluencyDashboard({ 
  date, 
  attempts 
}: { 
  date: DateOptionsType, 
  attempts: Attempt[] 
}): React.ReactNode {

  const attemptsByDate = useMemo(() => getAttemptsByDate(attempts), [attempts]);

  const filteredAttempts = attemptsByDate.get(date) ?? [];

  return (
    <FluencyDashboardWrapper>
      <h3>Multiplication tables up to 12</h3>
      <ProgressTable attempts={filteredAttempts} />
    </FluencyDashboardWrapper>
  );
}

export default FluencyDashboard;

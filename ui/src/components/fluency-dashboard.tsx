import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ProgressTable from "./progress-table";

export type Attempt = {
  id: number;
  studentUuid: string;
  attemptedAt: string;
  firstOperand: number;
  secondOperand: number;
  correct: boolean;
};

const FluencyDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function FluencyDashboard(): React.ReactNode {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/attempts")
      .then((response) => response.json())
      .then((data: Attempt[]) => {
        setAttempts(data);
      })
      .catch((error) => {
        console.error("Error getting data from API:", error);
      });
  }, []);

  return (
    <FluencyDashboardWrapper>
      <h3>Tablas de multiplicar hasta el 12</h3>
      <ProgressTable attempts={attempts} />
    </FluencyDashboardWrapper>
  );
}

export default FluencyDashboard;

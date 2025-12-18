import styled from "@emotion/styled";
import { TitleHeader } from "./title-header";
import FluencyDatePeriodDropdown from "./fluency-date-period-dropdown";
import FluencyDashboard from "./fluency-dashboard";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-left: 2rem;
`;

const StudentsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export function MainLayout(): React.ReactNode {
  return (
    <Container>
      <TitleHeader
        title="Fluidez"
        description="Es un espacio dentro de la Práctica Individualizada pensado para consolidar y automatizar las operaciones aritméticas básicas."
      />
      <StudentsInfoWrapper>
        <FluencyDatePeriodDropdown />
        <FluencyDashboard />
      </StudentsInfoWrapper>
    </Container>
  );
}

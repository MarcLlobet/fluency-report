import type { Attempt } from "../components/fluency-dashboard";

// 15 UUIDs per als alumnes
const studentIds = [
  "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "d4e5f6a7-b8c9-0123-def0-234567890123",
  "e5f6a7b8-c9d0-1234-ef01-345678901234",
  "f6a7b8c9-d0e1-2345-f012-456789012345",
  "a7b8c9d0-e1f2-3456-0123-567890123456",
  "b8c9d0e1-f2a3-4567-1234-678901234567",
  "c9d0e1f2-a3b4-5678-2345-789012345678",
  "d0e1f2a3-b4c5-6789-3456-890123456789",
  "e1f2a3b4-c5d6-7890-4567-901234567890",
  "f2a3b4c5-d6e7-8901-5678-012345678901",
  "a3b4c5d6-e7f8-9012-6789-123456789012",
  "b4c5d6e7-f8a9-0123-7890-234567890123",
  "c5d6e7f8-a9b0-1234-8901-345678901234",
];

// Taules incloses (excloent 1, 5, 7, 9)
const includedFirstOperands = [2, 3, 4, 6, 8, 10, 11, 12];

// Tots els segons operands (1-12)
const secondOperands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateMockAttempts(): Attempt[] {
  const attempts: Attempt[] = [];
  let idCounter = 1;
  const baseDate = new Date("2025-01-15T08:00:00Z");

  for (const studentId of studentIds) {
    // Cada alumne pot no tenir totes les combinacions completades
    // Seleccionem aleatòriament quines taules ha practicat aquest alumne
    const studentTables = includedFirstOperands.filter(
      () => Math.random() > 0.2
    );

    for (const firstOperand of studentTables) {
      // Per cada taula, l'alumne pot no haver practicat tots els segons operands
      const studentSecondOperands = secondOperands.filter(
        () => Math.random() > 0.15
      );

      for (const secondOperand of studentSecondOperands) {
        // 2-3 intents per combinació
        const numAttempts = Math.random() > 0.5 ? 3 : 2;

        for (let attempt = 0; attempt < numAttempts; attempt++) {
          // Taxa d'encert aproximada del 60-70%
          const correct = Math.random() > 0.35;

          // Generar data d'intent (incrementant el temps)
          const attemptDate = new Date(baseDate.getTime() + idCounter * 30000);

          attempts.push({
            id: idCounter,
            studentUuid: studentId,
            attemptedAt: attemptDate.toISOString(),
            firstOperand,
            secondOperand,
            correct,
          });

          idCounter++;
        }
      }
    }
  }

  return attempts;
}

export const mockAttempts: Attempt[] = generateMockAttempts();

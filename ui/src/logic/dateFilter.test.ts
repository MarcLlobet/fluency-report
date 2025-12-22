import { getAttemptsByDate } from "./dateFilter";
import { DATE_OPTIONS } from "../constants";
import { describe, expect, it } from "vitest";
import type { Attempt } from "../components/fluency-dashboard";

const currentDate = new Date();

const currentWeek = new Date(
  currentDate.getFullYear(), 
  currentDate.getMonth(),
  currentDate.getDate() - 7,
  currentDate.getHours(), 
  currentDate.getMinutes()
);

const pastMonth = new Date(
  currentDate.getFullYear(), 
  currentDate.getMonth() - 1,
  currentDate.getDate(),
  currentDate.getHours(), 
  currentDate.getMinutes()
);

const old = new Date(
  currentDate.getFullYear() - 1, 
  currentDate.getMonth(),
  currentDate.getDate(),
  currentDate.getHours(), 
  currentDate.getMinutes()
);

describe("getAttemptsByDate", () => {
    it("returns undefined for all periods if no attempts", () => {
        const result = getAttemptsByDate([]);
        expect(result.get(DATE_OPTIONS.current_week)).toBeUndefined();
        expect(result.get(DATE_OPTIONS.past_month)).toBeUndefined();
        expect(result.get(DATE_OPTIONS.all_time)).toBeUndefined();
    });

    it("groups attempts correctly for each period", () => {
        const attempts: Attempt[] = [
            { id: 1, attemptedAt: { date: currentWeek.toISOString() }, studentUuid: "a", firstOperand: 2, secondOperand: 3, correct: true },
            { id: 2, attemptedAt: { date: pastMonth.toISOString() }, studentUuid: "b", firstOperand: 2, secondOperand: 3, correct: false },
            { id: 3, attemptedAt: { date: old.toISOString() }, studentUuid: "c", firstOperand: 2, secondOperand: 3, correct: true },
        ];
        const result = getAttemptsByDate(attempts);

        expect(result.get(DATE_OPTIONS.current_week)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ studentUuid: "a" })
            ])
        );

        expect(result.get(DATE_OPTIONS.past_month)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ studentUuid: "b" })
            ])
        );

        expect(result.get(DATE_OPTIONS.all_time)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ studentUuid: "c" })
            ])
        );
    });

    it("handles multiple attempts in the same period", () => {
        const attempts: Attempt[] = [
            { id: 1, attemptedAt: { date: currentWeek.toISOString() }, studentUuid: "a", firstOperand: 2, secondOperand: 3, correct: true },
            { id: 2, attemptedAt: { date: currentWeek.toISOString() }, studentUuid: "b", firstOperand: 2, secondOperand: 3, correct: false },
            { id: 3, attemptedAt: { date: pastMonth.toISOString() }, studentUuid: "c", firstOperand: 2, secondOperand: 3, correct: true },
            { id: 4, attemptedAt: { date: old.toISOString() }, studentUuid: "d", firstOperand: 2, secondOperand: 3, correct: false },
        ];
        const result = getAttemptsByDate(attempts);
        expect(result.get(DATE_OPTIONS.current_week)).toHaveLength(2);
        expect(result.get(DATE_OPTIONS.past_month)).toHaveLength(1);
        expect(result.get(DATE_OPTIONS.all_time)).toHaveLength(1);
    });

    it("handles overlapping dates (boundary conditions)", () => {
        // Use fixed dates for deterministic boundary tests
        const currentWeekBoundary = new Date("2025-12-15T10:00:00.000Z"); // exactly 7 days before currentWeek
        const pastMonthBoundary = new Date("2025-11-21T10:00:00.000Z"); // exactly 1 month before currentWeek
        const attempts: Attempt[] = [
            { id: 1, attemptedAt: { date: currentWeekBoundary.toISOString() }, studentUuid: "w", firstOperand: 2, secondOperand: 3, correct: true },
            { id: 2, attemptedAt: { date: pastMonthBoundary.toISOString() }, studentUuid: "m", firstOperand: 2, secondOperand: 3, correct: false },
        ];
        const result = getAttemptsByDate(attempts);
        expect(result.get(DATE_OPTIONS.past_month)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ studentUuid: "w" })
            ])
        );
        expect(result.get(DATE_OPTIONS.all_time)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ studentUuid: "m" })
            ])
        );
    });

    it("does not mutate the input array", () => {
        const attempts: Attempt[] = [
            { id: 1, attemptedAt: { date: currentWeek.toISOString() }, studentUuid: "a", firstOperand: 2, secondOperand: 3, correct: true },
            { id: 2, attemptedAt: { date: pastMonth.toISOString() }, studentUuid: "b", firstOperand: 2, secondOperand: 3, correct: false },
            { id: 3, attemptedAt: { date: old.toISOString() }, studentUuid: "c", firstOperand: 2, secondOperand: 3, correct: true },
        ];
        const original = JSON.stringify(attempts);
        getAttemptsByDate(attempts);
        expect(JSON.stringify(attempts)).toBe(original);
    });
});
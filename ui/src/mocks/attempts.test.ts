import { DATE_OPTIONS } from "../constants";
import { getAttemptsByDate } from "../logic/dateFilter";
import { mockAttempts } from "./attempts";
import { describe, expect, it } from "vitest";

describe("mockAttempts date filtering", () => {
  const attemptsByDate = getAttemptsByDate(mockAttempts);
  it("returns 10 attempts for current week", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.current_week)).toHaveLength(10);
  });
  it("returns 20 attempts for past month (including current week)", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.past_month)).toHaveLength(10);
  });
  it("returns 30 attempts for all time (including all)", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.all_time)).toHaveLength(10);
  });
});

export const MAX_OPERAND = 12;

export const DATE_OPTIONS = {
    all_time: "all_time",
    past_month: "past_month",
    current_week: "current_week",
} as const;

export const DATE_OPTIONS_LABEL = {
    [DATE_OPTIONS.all_time]: "All time",
    [DATE_OPTIONS.past_month]: "Past month",
    [DATE_OPTIONS.current_week]: "Current week",
} as const;
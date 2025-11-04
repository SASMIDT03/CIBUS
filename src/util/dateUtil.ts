export function getWeekNumber(d: Date): number {
    // Create a copy of the date to avoid modifying the original
    const date = new Date(d.getTime());

    // Find the Thursday of the current week
    // ISO 8601 weeks start on Monday, so a week's number is determined by the year of its Thursday.
    // Set day to Thursday, preserving the time.
    // getDay() is 0 for Sunday, 1 for Monday, etc.
    const dayNum = date.getUTCDay() || 7; // Make Sunday 7
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);

    // Get the first day of the year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    // Calculate the number of days between the Thursday and the first day of the year
    const dayDiff = (date.getTime() - yearStart.getTime()) / 86400000; // 86400000 is milliseconds in a day

    // The week number is the number of full weeks passed, rounded up.
    return Math.ceil((dayDiff + 1) / 7);
}

export function formatDisplayDate(date: string): string {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}
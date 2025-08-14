import type { Profile, CheckInData } from "../types/models";

type Data = {
    title: string;
    icon: string;
    value: number;
    diff: number;
};

export const CalculateDashboardMetrics = (
    profiles: Profile[],
    checkins: CheckInData[]
): Data[] => {
    const toDate = (d: any) => (d instanceof Date ? d : new Date(d));
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth(); // 0-11

    // Month boundaries (local time)
    const endOfPrevMonth = new Date(curYear, curMonth, 0, 23, 59, 59, 999);

    // prev month/year w/ rollover
    const prevMonth = (curMonth + 11) % 12;
    const prevYear = curMonth === 0 ? curYear - 1 : curYear;

    const isMonthYear = (d: Date, m: number, y: number) =>
        d.getMonth() === m && d.getFullYear() === y;

    // Profiles
    const newMembersThisMonth = profiles.filter((p) =>
        isMonthYear(toDate(p.created_at), curMonth, curYear)
    );
    const newMembersPrevMonth = profiles.filter((p) =>
        isMonthYear(toDate(p.created_at), prevMonth, prevYear)
    );

    // Infer last month's total members = profiles created on or before end of previous month
    const totalMembersPrev = profiles.filter(
        (p) => toDate(p.created_at) <= endOfPrevMonth
    ).length;

    // Check-ins
    const checkinsThisMonth = checkins.filter((c) =>
        isMonthYear(toDate(c.created_at), curMonth, curYear)
    );
    const checkinsPrevMonth = checkins.filter((c) =>
        isMonthYear(toDate(c.created_at), prevMonth, prevYear)
    );

    // Unique events (for average attendance)
    const unique = <T>(arr: T[]) => [...new Set(arr)];
    const eventsThisMonth = unique(
        checkinsThisMonth.map((c) => c.event_id)
    ).filter((v) => v != null);
    const eventsPrevMonth = unique(
        checkinsPrevMonth.map((c) => c.event_id)
    ).filter((v) => v != null);

    // Unique attendees per month (COUNT for "Member Retention" per your expectation)
    const memberKey = (c: any) => c.profile_id ?? c.member_id ?? c.user_id; // set to your real key
    const activeMembersThisMonth = unique(
        checkinsThisMonth.map(memberKey)
    ).filter((v) => v != null);
    const activeMembersPrevMonth = unique(
        checkinsPrevMonth.map(memberKey)
    ).filter((v) => v != null);

    // Metrics
    const averageAttendance = eventsThisMonth.length
        ? checkinsThisMonth.length / eventsThisMonth.length
        : 0;
    const averageAttendancePrev = eventsPrevMonth.length
        ? checkinsPrevMonth.length / eventsPrevMonth.length
        : 0;

    // Relative % change helper (curr vs prev)
    const pctChange = (curr: number, prev: number) =>
        prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;

    const round = (n: number) => Math.round((n + Number.EPSILON) * 10) / 10;
    const roundInt = (n: number) => Math.round(n);

    // Values (counts) and diffs (% change)
    const newMembersVal = newMembersThisMonth.length;
    const newMembersPrevVal = newMembersPrevMonth.length;

    const totalMembersVal = profiles.length;
    const totalMembersDiffPct = pctChange(totalMembersVal, totalMembersPrev);

    const activeMembersVal = activeMembersThisMonth.length; // ← what you wanted to see as "1"
    const activeMembersPrevVal = activeMembersPrevMonth.length;

    const avgAttendanceVal = averageAttendance;

    return [
        {
            title: "New Members",
            icon: "user",
            value: newMembersVal, // count
            diff: roundInt(pctChange(newMembersVal, newMembersPrevVal)), // % change
        },
        {
            title: "Total Members",
            icon: "users_group",
            value: totalMembersVal, // count
            diff: roundInt(totalMembersDiffPct), // % change vs last month's total
        },
        {
            title: "Member Retention", // showing ACTIVE MEMBER COUNT
            icon: "heart",
            value: activeMembersVal, // count of unique members who checked in this month
            diff: roundInt(pctChange(activeMembersVal, activeMembersPrevVal)), // % change in count
        },
        {
            title: "Average Attendance",
            icon: "chart",
            value: round(avgAttendanceVal), // number (check-ins per event)
            diff: roundInt(pctChange(averageAttendance, averageAttendancePrev)), // % change
        },
    ];
};

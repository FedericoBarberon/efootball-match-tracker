import type { Match } from "@/domain/match/Match";
import { Team } from "@/domain/team/Team";

export type MatchHistoryItemDTO = {
    id: string;
    homePlayer: string;
    homeTeam: {
        id: string;
        name: string;
        isArchived: boolean;
    };
    homeGoals: number;
    awayPlayer: string;
    awayTeam: {
        id: string;
        name: string;
        isArchived: boolean;
    };
    awayGoals: number;
    date: string; // ISO
};

const DEFAULT_TEAM = (() => {
    const res = Team.create({ id: "NONE", name: "UNKNOWN_TEAM" });
    if (!res.ok) throw Error("FAILED");
    return res.value;
})();

export function toMatchHistoryItemDTO(
    match: Match,
    homeTeam: Team | null,
    awayTeam: Team | null,
): MatchHistoryItemDTO {
    return {
        id: match.id,
        homePlayer: match.homePlayer,
        homeTeam: homeTeam ?? DEFAULT_TEAM,
        homeGoals: match.homeGoals,
        awayPlayer: match.awayPlayer,
        awayTeam: awayTeam ?? DEFAULT_TEAM,
        awayGoals: match.awayGoals,
        date: match.date.toISOString(),
    };
}

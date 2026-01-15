import type { Match, MatchId } from "./Match";

export interface MatchRepository {
    save(match: Match): Promise<void>
    getAll(): Promise<Match[]>
    getById(id: MatchId): Promise<Match | null>
    delete(id: MatchId): Promise<void>
}
import { Match, type MatchId } from "../../domain/match/Match";
import type { MatchRepository } from "../../domain/match/MatchRepository";

const KEY = "EFOOTBALL-MATCHES"

export class LocalStorageMatchRepository implements MatchRepository {
    async save(match: Match): Promise<void> {
        const matches = await this.getAll()
        matches.push(match)
        localStorage.setItem(KEY, JSON.stringify(matches))
    }
    async getAll(): Promise<Match[]> {
        const data = JSON.parse(localStorage.getItem(KEY) ?? "[]")
        if (!Array.isArray(data)) return []

        return data.reduce((matches, matchJSON) => {
            const result = Match.fromJSON(matchJSON)

            if (!result.ok) return matches

            return [...matches, result.value]
        }, [])
    }
    async getById(id: MatchId): Promise<Match | null> {
        return (await this.getAll()).find(m => m.id === id) ?? null
    }
    async delete(id: MatchId): Promise<void> {
        const filteredMatches = (await this.getAll()).filter(m => m.id !== id)
        localStorage.setItem(KEY, JSON.stringify(filteredMatches))
    }

}
import type { Match, MatchId } from "../domain/match/Match";
import type { MatchRepository } from "../domain/match/MatchRepository";

export class InMemoryMatchRepository implements MatchRepository {
    private matches: Match[]
    constructor() {
        this.matches = []
    }
    async save(match: Match): Promise<void> {
        const index = this.matches.findIndex(m => m.id === match.id)

        if (index === -1) {
            this.matches.push(match)
        } else {
            this.matches[index] = match
        }
    }
    async getAll(): Promise<Match[]> {
        return [...this.matches]
    }
    async getById(id: MatchId): Promise<Match | null> {
        const index = this.matches.findIndex(m => m.id === id)

        if (index === -1) return null

        return this.matches[index]
    }
    async delete(id: MatchId): Promise<void> {
        this.matches = this.matches.filter(m => m.id !== id)
    }
}
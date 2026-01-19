import type { Team, TeamId } from "../domain/team/Team";
import type { TeamRepository } from "../domain/team/TeamRepository";

export class InMemoryTeamRepository implements TeamRepository {
    private teams: Team[]
    constructor() {
        this.teams = []
    }
    async save(team: Team): Promise<void> {
        const index = this.teams.findIndex(t => t.id === team.id)

        if (index === -1) {
            this.teams.push(team)
        } else {
            this.teams[index] = team
        }
    }
    async getAll(): Promise<Team[]> {
        return [...this.teams]
    }
    async getById(id: TeamId): Promise<Team | null> {
        const index = this.teams.findIndex(t => t.id === id)

        if (index === -1) return null

        return this.teams[index]
    }
    async delete(id: TeamId): Promise<void> {
        this.teams = this.teams.filter(t => t.id !== id)
    }

}
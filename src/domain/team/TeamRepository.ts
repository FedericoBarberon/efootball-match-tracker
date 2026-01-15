import type { Team, TeamId } from "./Team"

export interface TeamRepository {
    save(team: Team): Promise<void>
    getAll(): Promise<Team[]>
    getById(id: TeamId): Promise<Team | null>
    delete(id: TeamId): Promise<void>
}
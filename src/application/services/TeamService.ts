import type { CreateTeamCommand } from "../commands";
import { Team, type TeamId } from "../../domain/team/Team";
import type { TeamRepository } from "../../domain/team/TeamRepository";

export class TeamService {
    constructor(private readonly repo: TeamRepository) { }

    async create(data: CreateTeamCommand): Promise<TeamId> {
        const id = crypto.randomUUID()
        const result = Team.create({ id, ...data })

        if (!result.ok) throw result.err

        this.repo.save(result.value)
        return id
    }

    async getAll(): Promise<Team[]> {
        return this.repo.getAll()
    }

    async getById(id: TeamId): Promise<Team | null> {
        return this.repo.getById(id)
    }

    async delete(id: TeamId): Promise<void> {
        await this.repo.delete(id)
    }

    async archive(id: TeamId): Promise<void> {
        const team = await this.getById(id)

        if (!team) throw new Error(`Team with id ${id} not found`)

        team.archive()
        this.repo.save(team)
    }

    async unarchive(id: TeamId): Promise<void> {
        const team = await this.getById(id)

        if (!team) throw new Error(`Team with id ${id} not found`)

        team.unarchive()
        this.repo.save(team)
    }
}
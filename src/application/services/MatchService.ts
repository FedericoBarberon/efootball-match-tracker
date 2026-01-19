import { Match, type MatchId } from "../../domain/match/Match";
import type { MatchRepository } from "../../domain/match/MatchRepository";
import type { CreateMatchCommand, UpdateMatchCommand } from "../commands";

export class MatchService {
    constructor(private readonly repo: MatchRepository) { }

    async create(data: CreateMatchCommand): Promise<MatchId> {
        const id = crypto.randomUUID()
        const result = Match.create({ id, ...data })

        if (!result.ok) {
            throw result.err
        }

        await this.repo.save(result.value)

        return id
    }

    async getAll(): Promise<Match[]> {
        return this.repo.getAll()
    }

    async getById(id: MatchId): Promise<Match | null> {
        const match = await this.repo.getById(id)

        return match
    }

    async delete(id: MatchId): Promise<void> {
        this.repo.delete(id)
    }

    async update(id: MatchId, data: UpdateMatchCommand): Promise<void> {
        const match = await this.repo.getById(id)

        if (!match) {
            throw new Error(`Match with id ${id} not found`)
        }

        const result = match.edit(data)

        if (!result.ok) throw result.err

        this.repo.save(match)
    }
}
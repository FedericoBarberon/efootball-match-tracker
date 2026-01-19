import type { MatchId } from "../../domain/match/Match"
import type { CreateMatchCommand, UpdateMatchCommand } from "../commands"
import { toMatchHistoryItemDTO, type MatchHistoryItemDTO } from "../dto/MatchHistoryItemDTO"
import type { MatchService } from "../services/MatchService"
import type { TeamService } from "../services/TeamService"

export class MatchOrchestrator {
    constructor(
        private readonly matchService: MatchService,
        private readonly teamService: TeamService
    ) { }

    async getMatchHistory(): Promise<MatchHistoryItemDTO[]> {
        const matches = await this.matchService.getAll()

        return Promise.all(matches.map(async match => {
            const homeTeam = await this.teamService.getById(match.homeTeamId)
            const awayTeam = await this.teamService.getById(match.awayTeamId)

            return toMatchHistoryItemDTO(match, homeTeam, awayTeam)
        }))
    }

    async createMatch(data: CreateMatchCommand): Promise<MatchId> {
        await this.validateTeams(data.homeTeamId, data.awayTeamId)
        return this.matchService.create(data)
    }

    async updateMatch(id: MatchId, data: UpdateMatchCommand): Promise<void> {
        const homeTeamId = data.homeTeamId
        const awayTeamId = data.awayTeamId

        // Solo valida si se intenta cambiar los equipos
        if (homeTeamId || awayTeamId) {
            await this.validateTeams(homeTeamId, awayTeamId)
        }

        this.matchService.update(id, data)
    }

    private async validateTeams(
        homeTeamId?: string,
        awayTeamId?: string
    ): Promise<void> {
        const [homeTeam, awayTeam] = await Promise.all([
            homeTeamId ? this.teamService.getById(homeTeamId) : Promise.resolve(null),
            awayTeamId ? this.teamService.getById(awayTeamId) : Promise.resolve(null)
        ])

        if ((homeTeamId && !homeTeam) || (awayTeamId && !awayTeam)) {
            throw new Error("The teams must exist")
        }

        if (homeTeam?.isArchived || awayTeam?.isArchived) {
            throw new Error("The teams cannot be archived")
        }
    }
}
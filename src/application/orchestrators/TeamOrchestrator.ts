import type { TeamId } from "@/domain/team/Team";
import type { MatchService } from "../services/MatchService";
import type { TeamService } from "../services/TeamService";

export class TeamOrchestrator {
    constructor(
        private readonly matchService: MatchService,
        private readonly teamService: TeamService,
    ) {}

    async deleteTeam(id: TeamId): Promise<void> {
        await this.matchService.deleteMatchesWithTeam(id);
        await this.teamService.delete(id);
    }
}

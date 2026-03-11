import { MatchOrchestrator } from "@/application/orchestrators/MatchOrchestrator";
import { TeamOrchestrator } from "@/application/orchestrators/TeamOrchestrator";
import { MatchService } from "@/application/services/MatchService";
import { TeamService } from "@/application/services/TeamService";
import { LocalStorageMatchRepository } from "@/infra/localStorage/LocalStorageMatchRepository";
import { LocalStorageTeamRepository } from "@/infra/localStorage/LocalStorageTeamRepository";

const matchRepo = new LocalStorageMatchRepository();
const teamRepo = new LocalStorageTeamRepository();

export const matchService = new MatchService(matchRepo);
export const teamService = new TeamService(teamRepo);

export const matchOrchestrator = new MatchOrchestrator(
    matchService,
    teamService,
);

export const teamOrchestrator = new TeamOrchestrator(
    matchService,
    teamService,
);

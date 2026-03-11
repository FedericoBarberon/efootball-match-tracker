import { Team, type TeamId } from "../../domain/team/Team";
import type { TeamRepository } from "../../domain/team/TeamRepository";

const KEY = "EFOOTBALL-TEAMS";

export class LocalStorageTeamRepository implements TeamRepository {
    async save(team: Team): Promise<void> {
        const teams = await this.getAll();

        const index = teams.findIndex((t) => t.id === team.id);

        if (index === -1) {
            teams.push(team);
        } else {
            teams[index] = team;
        }

        localStorage.setItem(KEY, JSON.stringify(teams));
    }
    async getAll(): Promise<Team[]> {
        const data = JSON.parse(localStorage.getItem(KEY) ?? "[]");
        if (!Array.isArray(data)) return [];

        return data.reduce((teams, teamJSON) => {
            const result = Team.fromJSON(teamJSON);

            if (!result.ok) return teams;

            return [...teams, result.value];
        }, []);
    }
    async getById(id: TeamId): Promise<Team | null> {
        return (await this.getAll()).find((t) => t.id === id) ?? null;
    }
    async delete(id: TeamId): Promise<void> {
        const filteredMatches = (await this.getAll()).filter((t) =>
            t.id !== id
        );
        localStorage.setItem(KEY, JSON.stringify(filteredMatches));
    }
}

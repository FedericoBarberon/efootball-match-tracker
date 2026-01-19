import type { CreateMatchProps, UpdateMatchProps } from "../domain/match/Match"
import type { CreateTeamProps, UpdateTeamProps } from "../domain/team/Team"

// Match Commands
export type CreateMatchCommand = Omit<CreateMatchProps, "id">
export type UpdateMatchCommand = UpdateMatchProps

// Team Commands
export type CreateTeamCommand = Omit<CreateTeamProps, "id">
export type UpdateTeamCommand = UpdateTeamProps
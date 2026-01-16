import { Err, Ok, type Result } from "../../core/result"
import { formatName } from "../../utils/names"
import type { DomainError } from "../errors"
import { InvalidTeamNameError } from "./errors"

export type TeamId = string

export class Team {
    private constructor(
        public readonly id: TeamId,
        public name: string,
        public isArchived: boolean
    ) { }

    static create(props: {
        id: TeamId,
        name: string,
    }): Result<Team, DomainError> {
        const team = new Team(props.id, formatName(props.name), false)
        const validation = team.validate()

        if (!validation.ok) return validation

        return Ok(team)
    }

    edit(props: {
        name?: string
        isArchived?: boolean
    }): Result<void, DomainError> {
        this.name = props.name ? formatName(props.name) : this.name
        this.isArchived = props.isArchived ?? this.isArchived

        const validation = this.validate()
        if (!validation.ok) return validation

        return Ok(undefined)
    }

    private validate(): Result<void, DomainError> {
        if (this.name === "") return Err(new InvalidTeamNameError)

        return Ok(undefined)
    }

}
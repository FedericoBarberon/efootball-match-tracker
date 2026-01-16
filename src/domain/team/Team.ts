import { Err, Ok, type Result } from "../../core/result"
import { formatName } from "../../utils/names"
import type { DomainError } from "../errors"
import { InvalidTeamNameError } from "./errors"

export type TeamId = string

export type TeamProps = {
    id: TeamId
    name: string
    isArchived: boolean
}

export type CreateTeamProps = Omit<TeamProps, "isArchived">
export type UpdateTeamProps = Partial<Omit<TeamProps, "id">>

export class Team {
    private constructor(private props: TeamProps) { }

    get id(): TeamId {
        return this.props.id
    }

    get name(): string {
        return this.props.name
    }

    get isArchived(): boolean {
        return this.props.isArchived
    }

    private set name(value: string) {
        this.props.name = value
    }

    private set isArchived(value: boolean) {
        this.props.isArchived = value
    }

    static create(props: CreateTeamProps): Result<Team, DomainError> {
        const team = new Team({
            id: props.id,
            name: formatName(props.name),
            isArchived: false
        })
        const validation = team.validate()

        if (!validation.ok) return validation

        return Ok(team)
    }

    edit(props: UpdateTeamProps): Result<void, DomainError> {
        if (props.name !== undefined) this.name = formatName(props.name)
        if (props.isArchived !== undefined) this.isArchived = props.isArchived

        const validation = this.validate()
        if (!validation.ok) return validation

        return Ok(undefined)
    }

    archive() {
        this.edit({ isArchived: true })
    }

    unarchive() {
        this.edit({ isArchived: false })
    }

    private validate(): Result<void, DomainError> {
        if (this.name === "") return Err(new InvalidTeamNameError)

        return Ok(undefined)
    }

}
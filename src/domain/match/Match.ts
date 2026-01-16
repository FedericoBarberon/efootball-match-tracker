import { Err, Ok, type Result } from "../../core/result"
import { formatName } from "../../utils/names"
import { DomainError } from "../errors"
import type { TeamId } from "../team/Team"
import { InvalidGoalsError, InvalidPlayerNameError, SamePlayerError, SameTeamsError } from "./errors"

export type MatchId = string

export type MatchProps = {
    id: MatchId
    date: Date
    homeTeamId: TeamId
    homePlayer: string
    homeGoals: number
    awayTeamId: TeamId
    awayPlayer: string
    awayGoals: number
}

export type CreateMatchProps = MatchProps
export type UpdateMatchProps = Partial<Omit<MatchProps, "id">>

export class Match {
    private constructor(private props: MatchProps) { }

    get id(): MatchId {
        return this.props.id
    }

    get homePlayer(): string {
        return this.props.homePlayer
    }

    get awayPlayer(): string {
        return this.props.awayPlayer
    }

    get homeTeamId(): TeamId {
        return this.props.homeTeamId
    }

    get awayTeamId(): TeamId {
        return this.props.awayTeamId
    }

    get homeGoals(): number {
        return this.props.homeGoals
    }

    get awayGoals(): number {
        return this.props.awayGoals
    }

    get date(): Date {
        return this.props.date
    }

    private set homePlayer(value: string) {
        this.props.homePlayer = value
    }

    private set awayPlayer(value: string) {
        this.props.awayPlayer = value
    }

    private set homeTeamId(value: TeamId) {
        this.props.homeTeamId = value
    }

    private set awayTeamId(value: TeamId) {
        this.props.awayTeamId = value
    }

    private set homeGoals(value: number) {
        this.props.homeGoals = value
    }

    private set awayGoals(value: number) {
        this.props.awayGoals = value
    }

    private set date(value: Date) {
        this.props.date = value
    }

    static create(props: CreateMatchProps): Result<Match, DomainError> {
        const match = new Match({
            id: props.id,
            date: props.date,
            homeTeamId: props.homeTeamId,
            homePlayer: formatName(props.homePlayer),
            homeGoals: props.homeGoals,
            awayTeamId: props.awayTeamId,
            awayPlayer: formatName(props.awayPlayer),
            awayGoals: props.awayGoals
        })

        const validation = match.validate()
        if (!validation.ok) return validation

        return Ok(match)
    }

    edit(props: UpdateMatchProps): Result<void, DomainError> {
        if (props.homePlayer !== undefined) this.homePlayer = formatName(props.homePlayer)
        if (props.awayPlayer !== undefined) this.awayPlayer = formatName(props.awayPlayer)
        if (props.homeTeamId !== undefined) this.homeTeamId = props.homeTeamId
        if (props.awayTeamId !== undefined) this.awayTeamId = props.awayTeamId
        if (props.homeGoals !== undefined) this.homeGoals = props.homeGoals
        if (props.awayGoals !== undefined) this.awayGoals = props.awayGoals
        if (props.date !== undefined) this.date = props.date

        const validation = this.validate()
        if (!validation.ok) return validation

        return Ok(undefined)
    }

    private validate(): Result<void, DomainError> {
        if (this.homePlayer === "" || this.awayPlayer === "") return Err(new InvalidPlayerNameError)
        if (this.homePlayer === this.awayPlayer) return Err(new SamePlayerError)
        if (this.homeTeamId === this.awayTeamId) return Err(new SameTeamsError)
        if (this.homeGoals < 0) return Err(new InvalidGoalsError(this.homeGoals))
        if (this.awayGoals < 0) return Err(new InvalidGoalsError(this.awayGoals))

        return Ok(undefined)
    }
}

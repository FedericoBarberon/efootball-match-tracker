import { Err, Ok, type Result } from "../../core/result"
import { formatName } from "../../utils/names"
import { DomainError } from "../errors"
import type { TeamId } from "../team/Team"
import { InvalidGoalsError, InvalidPlayerNameError, SamePlayerError, SameTeamsError } from "./errors"

export type MatchId = string

export class Match {
    private constructor(
        public readonly id: MatchId,
        public homePlayer: string,
        public awayPlayer: string,
        public homeTeamId: TeamId,
        public awayTeamId: TeamId,
        public homeGoals: number,
        public awayGoals: number,
        public date: Date
    ) { }

    static create(props: {
        id: MatchId
        homePlayer: string
        awayPlayer: string
        homeTeamId: TeamId
        awayTeamId: TeamId
        homeGoals: number
        awayGoals: number
        date: Date
    }): Result<Match, DomainError> {
        const match = new Match(
            props.id,
            formatName(props.homePlayer),
            formatName(props.awayPlayer),
            props.homeTeamId,
            props.awayTeamId,
            props.homeGoals,
            props.awayGoals,
            props.date
        )

        const validation = match.validate()
        if (!validation.ok) return validation

        return Ok(match)
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

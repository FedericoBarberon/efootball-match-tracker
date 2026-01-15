import { DomainError } from '../errors';

export class InvalidGoalsError extends DomainError {
    constructor(goals: number) {
        super(`Invalid goals: ${goals}. Must be a non-negative number.`);
        this.name = 'InvalidGoalsError';
    }
}

export class SameTeamsError extends DomainError {
    constructor() {
        super('Teams must be different');
        this.name = 'SameTeamsError';
    }
}

export class InvalidPlayerNameError extends DomainError {
    constructor() {
        super('Player name cannot be empty');
        this.name = 'InvalidPlayerNameError';
    }
}
export class SamePlayerError extends DomainError {
    constructor() {
        super('Players must be different');
        this.name = 'SamePlayerError';
    }
}

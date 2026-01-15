import { DomainError } from '../errors';

export class InvalidTeamNameError extends DomainError {
    constructor() {
        super("Name cannot be empty");
        this.name = 'InvalidPlayerNameError';
    }
}
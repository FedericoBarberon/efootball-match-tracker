export type Result<T, E> = { ok: true, value: T } | { ok: false, err: E }

export function Ok<T>(value: T): Result<T, never> {
    return { ok: true, value }
}

export function Err<E>(err: E): Result<never, E> {
    return { ok: false, err }
}
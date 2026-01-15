export function normalizeName(name: string): string {
    return name.trim().toLowerCase()
}

export function formatName(name: string): string {
    return normalizeName(name).split(" ").map(w => w.charAt(0).toUpperCase + w.slice(1)).join(" ")
}
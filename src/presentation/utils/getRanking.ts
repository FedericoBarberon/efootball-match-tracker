import type { MatchHistoryItemDTO } from "@/application/dto/MatchHistoryItemDTO"


export type Ranking = {
    player: string,
    wins: number,
    goals: number
}

export function getRanking(matches: MatchHistoryItemDTO[]) {
    const playersStatistics = new Map<string, Ranking>

    matches.forEach(match => {
        const lowerCaseHomePlayer = match.homePlayer.toLowerCase()
        const lowerCaseAwayPlayer = match.awayPlayer.toLowerCase()

        if (!playersStatistics.has(lowerCaseHomePlayer)) {
            playersStatistics.set(lowerCaseHomePlayer, { player: match.homePlayer, wins: 0, goals: 0 })
        }
        if (!playersStatistics.has(lowerCaseAwayPlayer)) {
            playersStatistics.set(lowerCaseAwayPlayer, { player: match.awayPlayer, wins: 0, goals: 0 })
        }

        const newHomeStatistic = playersStatistics.get(lowerCaseHomePlayer)!
        const newAwayStatistic = playersStatistics.get(lowerCaseAwayPlayer)!

        newHomeStatistic.goals += match.homeGoals
        newAwayStatistic.goals += match.awayGoals

        if (match.homeGoals > match.awayGoals) {
            newHomeStatistic.wins += 1
        } else if (match.awayGoals > match.homeGoals) {
            newAwayStatistic.wins += 1
        }

        playersStatistics.set(lowerCaseHomePlayer, newHomeStatistic)
        playersStatistics.set(lowerCaseAwayPlayer, newAwayStatistic)
    })

    return Array.from(playersStatistics.values())
        .sort((a, b) => {
            const winsDifference = b.wins - a.wins
            const goalsDifference = b.goals - a.goals
            if (winsDifference === 0) return goalsDifference
            return winsDifference
        })
}
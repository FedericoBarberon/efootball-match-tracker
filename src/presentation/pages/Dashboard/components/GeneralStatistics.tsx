import { useMemo } from "react";
import { useMatchesQuery } from "../../../queries/match/useMatchesQuery";
import Card from "../../../components/Card";
import TextSkeleton from "../../../components/TextSkeleton";

export default function GeneralStatistics() {
    const { data: matches = [], isLoading } = useMatchesQuery()

    const averageGoals = useMemo(() => {
        if (matches.length === 0) return 0

        return matches.reduce((sum, m) => (
            sum + m.homeGoals + m.awayGoals / matches.length
        ), 0)
    }, [matches])

    const totalGames = matches.length

    return <section className="flex gap-4 md:flex-col">
        <Card className="p-4 flex justify-center items-center flex-col gap-2 grow text-center">
            <p className="font-bold text-slate-300 text-sm">TOTAL GAMES</p>
            <TextSkeleton isLoading={isLoading}>
                <p className="font-black text-white text-4xl">
                    {totalGames}
                </p>
            </TextSkeleton>
        </Card>
        <Card className="p-4 flex justify-center items-center flex-col gap-2 grow text-center">
            <p className="font-bold text-slate-300 text-sm">AVG. GOALS</p>
            <TextSkeleton isLoading={isLoading}>
                <p className="font-black text-white text-4xl">{averageGoals.toFixed(2)}</p>
            </TextSkeleton>
        </Card>
    </section>
}
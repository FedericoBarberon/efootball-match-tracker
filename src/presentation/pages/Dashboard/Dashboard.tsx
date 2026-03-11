import GeneralStatistics from "./components/GeneralStatistics";
import MatchesHistoryContainer from "./components/MatchesHistoryContainer";
import PlayerStandings from "./components/PlayerStandings";

export default function Dashboard() {
    return <>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[4fr_1fr]">
            <PlayerStandings />
            <GeneralStatistics />
        </div>
        <MatchesHistoryContainer />
    </>
}
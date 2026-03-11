import CreateMatch from "./components/CreateMatch";
import Teams from "./components/Teams";

export default function ManageData() {
    return <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-6">
        <CreateMatch />
        <Teams />
    </div>
}
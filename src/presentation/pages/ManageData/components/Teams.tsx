import { HiUserGroup } from "react-icons/hi2";
import Card from "../../../components/Card";
import TeamForm from "./TeamForm";
import TeamContainer from "./TeamContainer";

export default function Teams() {
    return <Card className="p-6 flex flex-col gap-4">
        <header className="flex gap-2 items-center border-b border-slate-600 pb-2">
            <HiUserGroup size={24} className="text-blue-600" />
            <h3 className="font-bold">Teams</h3>
        </header>
        <div className="flex flex-col gap-6 grow">
            <TeamForm />
            <TeamContainer />
        </div>
    </Card>
}
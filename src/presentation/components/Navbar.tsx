import { FiDatabase } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { PiGameControllerBold } from "react-icons/pi";
import { Link } from "wouter";

const ROUTES = [
    {
        href: "/dashboard",
        label: "Dashboard",
        Icon: MdDashboard
    },
    {
        href: "/manage",
        label: "Manage Data",
        Icon: FiDatabase
    },
]

export default function Navbar() {
    return (
        <header className="flex gap-3 p-4 bg-slate-900 items-center border-b border-b-slate-500">
            <PiGameControllerBold className="text-blue-600" size={24} />
            <h1 className="font-bold text-white text-xl grow">EFOOTBALL Match Tracker</h1>
            <nav className="p-4 flex gap-6 text-white font-bold">
                {
                    ROUTES.map(route => (
                        <Link key={route.href} href={route.href} className={(active) => `flex gap-2 items-center justify-center hover:text-blue-300 transition duration-150 ${(active ? "text-blue-300 underline underline-offset-8" : "")}`}>
                            <route.Icon />
                            <span>{route.label}</span>
                        </Link>
                    ))
                }
            </nav>
        </header>
    )
}
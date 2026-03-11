import { FiDownload } from "react-icons/fi"
import { downloadBlob } from "../utils/downloadBlob"
import Papa from "papaparse"
import Popover from "./Popover"
import type { MatchHistoryItemDTO } from "@/application/dto/MatchHistoryItemDTO"

type FileFormat = "json" | "csv"

export default function DownloadMatches({ matches }: { matches: MatchHistoryItemDTO[] }) {
    const handleDownload = (format: FileFormat) => {
        let content = "";

        switch (format) {
            case "json": {
                content = JSON.stringify(matches, null, 2)
                break
            }
            case "csv": {
                content = Papa.unparse(matches, {
                    header: true,
                })
                break
            }
            default:
                return
        }

        downloadBlob(new Blob([content], { type: "text/json" }), "matches." + format)
    }

    return <Popover Button={({ onClick }) => (
        <button onClick={onClick} className="cursor-pointer rounded hover:bg-[#a099d833] p-2 text-slate-400 hover:text-white transition duration-150" title="Download as JSON">
            <FiDownload size={20} />
        </button>
    )}>
        <button onClick={() => handleDownload("json")} className="hover:bg-slate-600 w-full px-4 py-2 font-semibold cursor-pointer">JSON</button>
        <button onClick={() => handleDownload("csv")} className="hover:bg-slate-600 w-full px-4 py-2 font-semibold cursor-pointer">CSV</button>
    </Popover>
}
import { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode,
    Button: (props: { onClick: () => void }) => React.ReactNode
}

export default function Popover({ children, Button }: Props) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return <div ref={ref} className="relative">
        <Button onClick={() => setOpen(show => !show)} />
        <div className={`bg-slate-900 absolute left-[-50%] transition duration-150 rounded border border-slate-400 text-right z-10 ${open ? "opacity-100 pointer-events-auto translate-y-1.5" : "opacity-0 pointer-events-none -translate-y-1.5"}`}>
            {children}
        </div>
    </div>
}
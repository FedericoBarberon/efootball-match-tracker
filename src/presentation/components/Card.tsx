
type CardParams = {
    children?: React.ReactNode,
    className?: string
}

export default function Card({ children, className }: CardParams) {
    return (
        <div className={`bg-slate-800 rounded-md border border-slate-600 ${className ?? ""}`}>
            {children}
        </div>
    )
}
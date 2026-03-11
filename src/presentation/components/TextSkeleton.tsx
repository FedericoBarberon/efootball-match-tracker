export default function TextSkeleton({ children, isLoading }: { children?: React.ReactElement, isLoading: boolean }) {
    if (isLoading) return <div className="bg-slate-600 px-4 animate-pulse rounded-sm">
        <span className="invisible">
            {children}
        </span>
    </div>

    return children
}
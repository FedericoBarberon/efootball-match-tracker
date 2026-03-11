import { CgSpinner } from "react-icons/cg";

type Props = {
    size?: number,
    className?: string
}

export default function Spinner({ size = 24, className }: Props) {
    return <CgSpinner size={size} className={`animate-spin duration-300 ${className}`} />
}
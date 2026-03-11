import { createPortal } from "react-dom"

type Props = {
    onClose: () => void,
    children: React.ReactElement
}

export default function Modal({ children, onClose }: Props) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        createPortal(<div className="w-screen h-screen fixed grid place-content-center z-10 bg-[#00000033] top-0" onClick={handleClick}>
            {children}
        </div>,
            document.body
        )
    )
}
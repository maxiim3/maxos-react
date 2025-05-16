import type React from "react"
import {useState, useEffect, useRef} from "react"
import {Rnd, type Position} from "react-rnd"
import {X, Minus, Square} from "lucide-react"
import {cn} from "~/lib/utils" // Adjust path if necessary

interface AppWindowProps {
	className?: string
	title?: string
	initialPosition?: {x: number; y: number}
	initialSize?: {width: number; height: number}
	minWidth?: number
	minHeight?: number
	zIndex?: number
	children: React.ReactNode
	onClose?: () => void
	id: number
}

type Size = {
	width: string | number
	height: string | number
}

const DRAG_HANDLE_CLASS = "macos-window-drag-handle"

export default function AppWindow({
	className,
	title = "Untitled Window",
	initialPosition = {x: 100, y: 100},
	initialSize = {width: 500, height: 400},
	minWidth = 250,
	minHeight = 180,
	children,
	onClose,
	zIndex: initialZIndex,
	id,
}: AppWindowProps) {
	const [isMinimized, setIsMinimized] = useState(false)
	const [isMaximized, setIsMaximized] = useState(false)

	// Current position and size, controlled by react-rnd and local state
	const [position, setPosition] = useState<Position>(initialPosition)
	const [size, setSize] = useState<Size>(initialSize)

	useEffect(() => {
		if (!isMaximized && !isMinimized) {
			setPosition(initialPosition)
			setSize(initialSize)
		}
	}, [initialPosition, initialSize])

	return (
		<Rnd
			size={isMaximized ? {width: "100%", height: "100%"} : size}
			position={isMaximized ? {x: 0, y: 0} : position}
			minWidth={minWidth}
			minHeight={minHeight}
			dragHandleClassName={DRAG_HANDLE_CLASS}
			enableResizing={!isMaximized && !isMinimized}
			disableDragging={isMaximized || isMinimized}
			style={{border: "1px solid #ccc", position: "relative", zIndex: "30", cursor: "none"}} // RND applies its own styles
			onDragStop={(_e, d) => {
				if (!isMaximized) {
					setPosition({x: d.x, y: d.y})
				}
			}}
			onResizeStop={(_e, _direction, ref, _delta, newPosition) => {
				if (!isMaximized) {
					setSize({
						width: ref.style.width,
						height: ref.style.height,
					})
					setPosition(newPosition)
				}
			}}
			className={cn(
				"!bg-transparent !border-none", // Override RND default border/bg
				isMinimized && "pointer-events-none" // Prevent interaction when "minimized"
			)}>
			<div
				className={cn(
					"fixed shadow-xl rounded-lg overflow-hidden bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300/50 dark:border-slate-700/50",
					isMaximized && "!rounded-none !shadow-none",
					className
				)}
				style={{
					width: "100%", // RND controls actual size, this div fills RND
					height: "100%",
				}}>
				{/* Window header / title bar */}
				<div
					className={cn(
						DRAG_HANDLE_CLASS,
						"h-10 bg-slate-200/70 dark:bg-slate-700/70 flex items-center px-3 select-none"
					)}>
					<div className="flex space-x-2 mr-auto">
						<button
							className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
							aria-label="Close window">
							<X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
						</button>
						<button
							className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
							aria-label="Minimize window">
							<Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
						</button>
						<button
							className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
							aria-label={isMaximized ? "Restore window" : "Maximize window"}>
							<Square className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
						</button>
					</div>

					{!isMinimized && (
						<div className="text-sm font-medium text-slate-700 dark:text-slate-200 absolute left-1/2 -translate-x-1/2">
							{title}
						</div>
					)}
				</div>

				<div className="h-[calc(100%-40px)] overflow-auto">
					{!isMinimized && <div className="p-4">{children}</div>}
				</div>
			</div>
		</Rnd>
	)
}

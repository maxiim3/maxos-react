import React, {
	type ComponentPropsWithRef,
	type DragEvent,
	type FC,
	forwardRef,
	type MouseEvent,
	type MouseEventHandler,
	type Ref,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react"
import {createPortal} from "react-dom"
import {cn} from "~/lib/utils"
import TopBar from "~/components/organisms/topbar"
import bg from "./bg.module.css"
import RenderWindowApps from "~/components/organisms/render-window-apps"
import {useWindowContext, WindowProvider} from "~/contexts/window-context"

export default function App() {
	const cursorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!cursorRef.current) return

		cursorRef.current.style.transition = "all 30ms ease"
	}, [cursorRef.current])

	function cursorEvents(event: MouseEvent<HTMLElement>) {
		if (!cursorRef.current) return

		const acceleration = Math.abs(event.movementX) + Math.abs(event.movementY)
		const isButton = event.target && event.target?.type && event.target.type === "button"

		cursorRef.current.style.left = `${event.clientX}px`
		cursorRef.current.style.top = `${event.clientY}px`
		cursorRef.current.style.scale = isButton ? "30%" : `${acceleration + 100}%`

		cursorRef.current.dataset.state = isButton ? "special" : "reg"
	}

	return (
		<main
			onMouseMove={cursorEvents}
			className={cn(
				bg.bgImage,
				"w-screen h-screen grid grid-cols-1 grid-rows-[auto_1fr] cursor-none"
			)}>
			<TopBar />
			<WindowProvider>
				<CustomPointer ref={cursorRef} />
				<DesktopGrid />
				<RenderWindowApps />
			</WindowProvider>
		</main>
	)
}

const CustomPointer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
	return createPortal(
		<div
			ref={ref}
			className="absolute rounded-full size-5 bg-violet-800 transition-all duration-[30ms] z-50 data-[state='special']:bg-slate-900/80"
		/>,
		document.body
	)
})

const DesktopGrid = () => {
	const {addProcess} = useWindowContext()
	function handleClick(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault()
		event.stopPropagation()
		addProcess(0)
	}

	function handleStartDragging(event: DragEvent<HTMLElement>) {
		if (event.dataTransfer) {
			// Clear previous drag data cache
			event.dataTransfer.clearData()
			// Register data drag event
			event.dataTransfer.setData("text/plain", event.target.id || "icon")
			event.dataTransfer.effectAllowed = "all"
			event.dataTransfer.dropEffect = "move"
		}
	}

	function onDrop(event: DragEvent<HTMLElement>) {
		event.preventDefault()
		event.stopPropagation()
		const target = event.target as HTMLDivElement

		const data = event.dataTransfer.getData("text")
		const source = document.getElementById(data)

		target.classList.contains("bg-orange-500") && target.classList.remove("bg-orange-500")
		!target.classList.contains("bg-transparent") && target.classList.add("bg-transparent")

		source?.classList.remove("absolute")
		source && target.appendChild(source)
	}

	function onDragOver(event: DragEvent<HTMLElement>) {
		event.preventDefault()
		event.stopPropagation()
		const el = event.target as HTMLDivElement

		el.classList.contains("bg-transparent") && el.classList.remove("bg-transparent")
		!el.classList.contains("bg-orange-500") && el.classList.add("bg-orange-500")
	}

	function onDragLeave(event: DragEvent<HTMLElement>) {
		event.preventDefault()
		event.stopPropagation()
		const el = event.target as HTMLDivElement

		el.classList.contains("bg-orange-500") && el.classList.remove("bg-orange-500")
		!el.classList.contains("bg-transparent") && el.classList.add("bg-transparent")
	}

	return (
		<div className="grid grid-cols-8 grid-rows-8 h-full w-full">
			<div
				id="icon"
				className="absolute top-48 left-96 bg-red-400 size-12 z-20"
				draggable="true"
				onDragStart={handleStartDragging}
				onClick={handleClick}
			/>
			{Array(8 * 8)
				.fill(1)
				.map((_, i: number) => {
					const key = `grid-cell-${useId()}-${i}`
					return (
						<div
							data-id="grid-cell"
							className="border border-dashed border-slate-300/50 bg-transparent hover:border-purple-500/70 hover:bg-orange-300/80 transition-all flex items-center justify-center relative z-10"
							key={key}
							id={key}
							onDragOver={onDragOver}
							onDragLeave={onDragLeave}
							onDrop={onDrop}
						/>
					)
				})}
		</div>
	)
}

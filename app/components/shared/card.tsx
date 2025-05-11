import React, { forwardRef, useEffect, useMemo, useReducer, useRef, useState, type Ref } from "react"
import { useInjectColorContext } from "~/contexts/color-context"

interface CardProps {
	top: number,
	bottom: number,
	margin: number,
}

function checkVisibility(el: HTMLDivElement, top: number, bottom: number, margin: number) {
	return el && (el.offsetTop >= top + 200) && (el.offsetTop + el.offsetHeight <= bottom - 200)
}

const CardWithColor = forwardRef((_, elementRef: Ref<HTMLDivElement>) => {
	const { color } = useInjectColorContext()
	return (
		<div
			ref={elementRef}
			style={{ backgroundColor: color }}
			className="w-32 text-center rounded-xl p-3 transition-all duration-500 opacity-100">
			<p> My Card: {color}</p>
		</div>
	)
})


const Card = ({ top, bottom, margin }: CardProps) => {
	const elementRef = useRef(null)
	const isVisible = useMemo(() => {
		return elementRef.current && checkVisibility(elementRef.current, top, bottom, margin)
	}, [top, bottom, margin])

	// useEffect(() => {
	// 	if (!elementRef.current) return

	// 	const el = elementRef.current as HTMLDivElement
	// 	const visible = checkVisibility(elementRef.current, top, bottom, margin)
	// 	setVisibility(visible)
	// 	console.log("I should be visible", { visible, top, bottom, margin })
	// }, [top, bottom, margin])

	if (!isVisible)
		return (
			<div
				ref={elementRef}
				className="w-32 rounded-xl p-3 border opacity-0">
				<p>x</p>
			</div>
		)

	return (
		<CardWithColor ref={elementRef} />
	)
}

export default Card
import React from "react"
import {cn} from "~/lib/utils" // Adjust this path to your cn utility

type UITextSize = "small" | "normal" | "big"
type UITextFontWeight = "light" | "normal" | "thick"

interface UITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode
	size?: UITextSize
	fontWeight?: UITextFontWeight
	// className is part of React.HTMLAttributes, but explicitly listed for clarity
	// and to ensure it's passed to cn
}

const sizeClasses: Record<UITextSize, string> = {
	small: "text-xs",
	normal: "text-sm",
	big: "text-base",
}

const fontWeightClasses: Record<UITextFontWeight, string> = {
	light: "font-light",
	normal: "font-normal", // Default browser weight for <p>
	thick: "font-bold",
}

const UIText: React.FC<UITextProps> = ({
	children,
	size = "normal",
	fontWeight = "normal",
	className,
	...props // Spread remaining HTML attributes for the <p> element
}) => {
	return (
		<p
			className={cn(
				sizeClasses[size],
				fontWeightClasses[fontWeight],
				className // Allows additional classes to be passed and merged
			)}
			{...props}>
			{children}
		</p>
	)
}

export default UIText

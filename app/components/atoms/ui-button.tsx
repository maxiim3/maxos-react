import type {ComponentPropsWithoutRef, FC} from "react"

const UIButton: FC<ComponentPropsWithoutRef<"button">> = props => {
	return (
		<button
			{...props}
			className="cursor-none focus:bg-gray-100/40 active:bg-gray-100/40 py-[2px] px-3 rounded-sm *:select-none *:pointer-events-none">
			{props.children}
		</button>
	)
}

export default UIButton

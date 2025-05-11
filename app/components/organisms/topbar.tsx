import React, {type ComponentPropsWithRef, type FC} from "react"
import {cn} from "~/lib/utils"
import {Shell} from "lucide-react"
import UIText from "~/components/atoms/ui-text"
import CalendarPopover from "~/components/organisms/calendar-popover"
import ControlPopover from "./control-popover"

const TopBar = () => {
	return (
		<header className="relative w-full p-2 group">
			<nav className="w-full bg-gray-200/60 group-hover:bg-gray-200/70 transition-all duration-300 backdrop-blur-sm group-hover:shadow-sm shadow-xl py-0.5 px-2 rounded-full grid grid-cols-3">
				<TopBarItem pos="start">
					<Shell width={16} />
					<UIText size="small">Welcome to maxOS</UIText>
				</TopBarItem>
				<TopBarItem>
					<CalendarPopover />
				</TopBarItem>
				<TopBarItem pos="end">
					<ControlPopover />
				</TopBarItem>
			</nav>
		</header>
	)
}

const TopBarItem: FC<ComponentPropsWithRef<"div"> & {pos?: "start" | "end"}> = ({
	children,
	pos,
}) => {
	return (
		<div
			className={cn("flex items-center justify-center gap-1 px-1", {
				// default center
				"justify-self-start": pos === "start",
				"justify-self-end": pos === "end",
			})}>
			{children}
		</div>
	)
}

export default TopBar

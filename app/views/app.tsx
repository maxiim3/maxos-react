import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	type ComponentPropsWithRef,
	type FC,
} from "react"
import {createPortal} from "react-dom"
import {cn} from "~/lib/utils"
import TopBar from "~/components/organisms/topbar"
import bg from "./bg.module.css"
import RenderWindowApps from "~/components/organisms/render-window-apps"
import {WindowProvider} from "~/contexts/window-context"

export default function App() {
	return (
		<main className={cn(bg.bgImage, "w-screen h-screen")}>
			<TopBar />
			<WindowProvider>
				{/* add <Desktop/> */}
				<RenderWindowApps />
			</WindowProvider>
		</main>
	)
}

// Prepared everything. Now implement how to open windows from processes.
// use tanstack store ?
// create Desktop component to add a few icons off apps. they will trigger new processes with singleton for each (uniq instance)

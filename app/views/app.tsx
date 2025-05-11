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
				<RenderWindowApps />
			</WindowProvider>
		</main>
	)
}

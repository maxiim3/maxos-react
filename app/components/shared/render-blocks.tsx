import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	type PropsWithChildren,
} from "react"
import {createPortal} from "react-dom"
import {ColorContextProvider, SwitchColor, useInjectColorContext} from "~/contexts/color-context"

const LazyMemoizedCard = React.lazy(() => import("~/components/shared/card"))

function useDocumentLoaded() {
	const [isLoaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(typeof window !== "undefined" && !!document?.documentElement)
		console.log(typeof window !== "undefined" && !!document?.documentElement)
	}, [window, document])

	return {isLoaded}
}
const P = ({children}: PropsWithChildren) => <p className="fixed top-4 right-4">{children}</p>

const RenderBlocks = () => {
	const {view, marginOfError} = useWindowScroll()
	return (
		<div className="flex flex-col gap-12 mt-2">
			<ColorContextProvider>
				<div className="flex flex-wrap gap-4">
					{Array.from({length: 100}).map(() => (
						<LazyMemoizedCard
							key={useId()}
							top={view[0]}
							bottom={view[1]}
							margin={marginOfError}
						/>
					))}
				</div>
				{typeof window !== "undefined" &&
					document &&
					createPortal(<SwitchColor />, document.body)}
			</ColorContextProvider>
		</div>
	)
}

function useWindowScroll() {
	const documentHeight = useRef(0)
	const viewPortHeight = useRef(0)

	const [topPos, setTopPost] = useState(0)
	const [marginOfError, setMargin] = useState(0)

	const bottomPos = useMemo(() => topPos + viewPortHeight.current, [topPos])
	const {isLoaded} = useDocumentLoaded()

	function watchScroll() {
		setTopPost(document.documentElement.scrollTop)
	}

	useEffect(() => {
		watchScroll()
	}, [isLoaded])
	useEffect(() => {
		setMargin(viewPortHeight.current * 0.1)
	}, [topPos, documentHeight, viewPortHeight, marginOfError])
	useEffect(() => {
		// TODO - Do not handle window resizing. Consider using watchScroll event.target.documentElement as document element to get the updated width/height
		documentHeight.current = document.documentElement.scrollHeight
		viewPortHeight.current = document.documentElement.clientHeight

		if (window) {
			window.addEventListener("scroll", watchScroll)
		}

		return () => {
			console.log("unmount  useWindowScroll")
			window.removeEventListener("scroll", watchScroll)
		}
	}, [])

	return {
		marginOfError,
		view: [topPos, bottomPos],
	}
}

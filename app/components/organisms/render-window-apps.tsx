import {useWindowContext} from "~/contexts/window-context"
import AppWindow from "./app-window"
import {createPortal} from "react-dom"

const RenderWindowApps = () => {
	const {processList} = useWindowContext()
	return Array.from(processList.values()).map(process =>
		createPortal(
			<AppWindow
				id={process}
				title="My Simple Window"
				initialPosition={{x: 50, y: 50}}
				initialSize={{width: 400, height: 300}}
				onClose={() => {
					// In a real app, this would set state to hide the window
					console.log("Window close button clicked!")
				}}>
				{/* A simple div inside the window */}
				<div
					style={{
						padding: "20px",
						backgroundColor: "#f0f0f0",
						height: "100%",
						boxSizing: "border-box",
					}}>
					<p>This is a simple div inside the Window.</p>
					<p>Content goes here.</p>
				</div>
			</AppWindow>,
			document.body
		)
	)
}

export default RenderWindowApps

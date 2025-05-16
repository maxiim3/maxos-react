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
				<RenderProcessStrategy process={process} />
			</AppWindow>,
			document.body
		)
	)
}

const RenderProcessStrategy = (props: {process: number}) => {
	switch (props.process) {
		case 0:
			return <div>INFOMANIAK</div>
		case 1:
			return <div>FINDER</div>
		default:
			return <div>Default</div>
	}
}
export default RenderWindowApps

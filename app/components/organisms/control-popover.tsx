import {CalendarDays, Settings2} from "lucide-react"
import UIButton from "../atoms/ui-button"
import UIText from "../atoms/ui-text"
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover"
import Clock from "../molecules/clock"
import {Calendar} from "../ui/calendar"
import VolumeControl from "./volume-control"
import BrightnessControl from "./brightness-control"

const ControlPopover = () => {
	return (
		<>
			{/* <UIText size="small">
				<Clock />
			</UIText> */}
			<Popover>
				<PopoverTrigger asChild>
					<UIButton aria-label="Open calendar">
						<Settings2 width={16} />
					</UIButton>
				</PopoverTrigger>
				<PopoverContent>
					<div>
						<VolumeControl />
						<BrightnessControl />
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default ControlPopover

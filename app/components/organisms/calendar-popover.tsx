import {CalendarDays} from "lucide-react"
import UIButton from "../atoms/ui-button"
import UIText from "../atoms/ui-text"
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover"
import Clock from "../molecules/clock"
import {Calendar} from "../ui/calendar"

const CalendarModal = () => {
	return (
		<>
			<UIText size="small">
				<Clock />
			</UIText>
			<Popover>
				<PopoverTrigger asChild>
					<UIButton aria-label="Open calendar">
						<CalendarDays width={16} />
					</UIButton>
				</PopoverTrigger>
				<PopoverContent>
					<Calendar />
				</PopoverContent>
			</Popover>
		</>
	)
}

export default CalendarModal

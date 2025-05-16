import { CalendarDays } from "lucide-react"
import UIButton from "../atoms/ui-button"
import UIText from "../atoms/ui-text"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import Clock from "../molecules/clock"

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
					Je suis un calendrier
				</PopoverContent>
			</Popover>
		</>
	)
}

export default CalendarModal

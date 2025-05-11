import React, {useState, useEffect} from "react"
import {format} from "date-fns"

const Clock: React.FC = () => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date())

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentDateTime(new Date())
		}, 1000)

		return () => {
			clearInterval(timerId)
		}
	}, [])

	return (
		<time dateTime={currentDateTime.toISOString()}>{formatDateAndTime(currentDateTime)}</time>
	)
}

const formatDateAndTime = (date: Date): string => {
	// EEE: Day of week (Mon, Tue, etc.)
	// d: Day of month (1, 2, etc.)
	// MMMM: Full month name (January, February, etc.)
	// HH:mm:ss: Time
	const dayAndDayOfMonth = format(date, "EEE d")
	let month = format(date, "MMMM")

	// Truncate month name to 4 characters if longer
	if (month.length > 4) {
		month = month.substring(0, 4)
	}

	const time = format(date, "HH:mm:ss")

	return `${dayAndDayOfMonth} ${month} ${time}`
	// Example output: "Mon 1 June 14:30:45" or "Wed 23 Sept 10:15:00"
}

export default Clock

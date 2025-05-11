import {useState} from "react"
import {Sun, SunDim, SunMedium, Moon} from "lucide-react"
import {Slider} from "~/components/ui/slider"
import {cn} from "~/lib/utils"

const getBrightnessIcon = (brightness: number) => {
	if (brightness < 25) return <Moon className="h-5 w-5" />
	if (brightness < 50) return <SunDim className="h-5 w-5" />
	if (brightness < 75) return <SunMedium className="h-5 w-5" />
	return <Sun className="h-5 w-5" />
}

export default function BrightnessControl() {
	const [brightness, setBrightness] = useState(90)

	const handleBrightnessChange = (value: number[]) => {
		const newBrightness = value[0]
		setBrightness(newBrightness)
	}

	return (
		<div
			className={cn(
				"flex items-center space-x-2 p-3 rounded-lg",
				"transition-all duration-300"
			)}
			style={{
				filter: `brightness(${Math.max(0.5, (brightness / 100) * 1.5)})`,
			}}>
			<button
				className="p-2 hover:bg-slate-100/30 rounded-full transition-colors"
				onClick={() => handleBrightnessChange([brightness === 0 ? 75 : 0])}
				aria-label={brightness === 0 ? "Increase brightness" : "Minimum brightness"}>
				{getBrightnessIcon(brightness)}
			</button>
			<Slider
				value={[brightness]}
				max={100}
				step={1}
				className="w-28 sm:w-40"
				onValueChange={handleBrightnessChange}
				aria-label="Brightness"
			/>
			<span className="text-sm w-8 text-center tabular-nums">{brightness}%</span>
		</div>
	)
}

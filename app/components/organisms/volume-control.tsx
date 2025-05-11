import {useState} from "react"
import {Volume, Volume1, Volume2, VolumeX} from "lucide-react"
import {Slider} from "~/components/ui/slider"
import {cn} from "~/lib/utils"

const getVolumeIcon = (volume: number) => {
	if (volume === 0) return <VolumeX className="h-5 w-5" />
	if (volume < 33) return <Volume className="h-5 w-5" />
	if (volume < 66) return <Volume1 className="h-5 w-5" />
	return <Volume2 className="h-5 w-5" />
}

export default function VolumeControl() {
	const [volume, setVolume] = useState(80)

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0]
		setVolume(newVolume)
	}

	return (
		<div className={cn("flex items-center space-x-2")}>
			<button
				className="p-2 hover:bg-slate-100 rounded-full dark:hover:bg-slate-800 transition-colors"
				onClick={() => handleVolumeChange([volume === 0 ? 50 : 0])}
				aria-label={volume === 0 ? "Unmute" : "Mute"}>
				{getVolumeIcon(volume)}
			</button>
			<Slider
				value={[volume]}
				max={100}
				step={1}
				className="w-28 sm:w-40"
				onValueChange={handleVolumeChange}
				aria-label="Volume"
			/>
			<span className="text-sm w-8 text-center tabular-nums">{volume}%</span>
		</div>
	)
}

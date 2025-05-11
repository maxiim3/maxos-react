import { createContext, type PropsWithChildren, useCallback, useContext, useState } from "react"

interface ConsumeColorContext {
	color: string
	updateColor: (color: string) => void
}

const DEFAULT_COLOR = "yellow"

const ColorContext = createContext<ConsumeColorContext | undefined>(undefined)

export const ColorContextProvider = ({ children }: PropsWithChildren) => {
	const [color, setColor] = useState<string>(DEFAULT_COLOR)

	const updateColor = useCallback((color: string) => { setColor(color) }, [])

	return (
		<ColorContext.Provider
			value={{
				color,
				updateColor,
			}}>
			{children}
		</ColorContext.Provider>
	)
}

export const useInjectColorContext = () => {
	const context = useContext(ColorContext)

	if (!context) throw Error("Context not initialized")

	return context
}

export const SwitchColor = () => {
	const { updateColor } = useInjectColorContext()

	const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateColor(e.currentTarget.value)
	}

	return (
		<label>
			{'Switch Color'}
			<input
				type="color"
				onChange={handleColor} />
		</label>
	)
}

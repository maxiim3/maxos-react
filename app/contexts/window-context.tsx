import type React from "react"
import {createContext, useCallback, useContext, useState} from "react"

interface WindowContextType {
	processList: Set<number>
	highestZIndex: number
	getNewZIndex: () => number
	addProcess: (id: number) => void
	killProcess: (id: number) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({children}: {children: React.ReactNode}) {
	const [highestZIndex, setHighestZIndex] = useState(100)
	const [processList, setProcessList] = useState(new Set<number>())

	const getNewZIndex = useCallback(() => {
		const newZIndex = highestZIndex + 1
		setHighestZIndex(newZIndex)
		return newZIndex
	}, [highestZIndex])

	const addProcess = useCallback((id: number) => {
		setProcessList(prevList => {
			const updatedList = new Set(prevList)
			updatedList.add(id)
			return updatedList
		})
	}, [])

	const killProcess = useCallback((id: number) => {
		setProcessList(prevList => {
			const updatedList = new Set(prevList)
			updatedList.delete(id)
			return updatedList
		})
	}, [])

	return (
		<WindowContext.Provider
			value={{highestZIndex, getNewZIndex, processList, addProcess, killProcess}}>
			{children}
		</WindowContext.Provider>
	)
}

export function useWindowContext() {
	const context = useContext(WindowContext)
	if (context === undefined) {
		throw new Error("useWindowContext must be used within a WindowProvider")
	}
	return context
}

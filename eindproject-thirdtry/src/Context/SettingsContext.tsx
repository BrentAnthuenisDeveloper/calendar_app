import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { CalendarEvent } from "../Navigation/types";

interface SettingsContextProps {}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
	return (
		<SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error(
			"useCalendarContext must be used within a CalendarProvider"
		);
	}
	return context;
};

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { CalendarEvent } from "../Navigation/types";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface CalendarContextProps {
	events: CalendarEvent[];
	addEvent: (event: CalendarEvent) => void;
	removeEvent: (id: string) => void;
	calendarType: string;
	SetCalendarType: (type: string) => void;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
	findEvent: (id: string) => CalendarEvent | undefined;
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}

const CalendarContext = createContext<CalendarContextProps | null>(null);

export const CalendarProvider = ({ children }: PropsWithChildren) => {
	const [events, setEvents] = useState<CalendarEvent[]>([
		{
			id: "1",
			title: "Event 1",
			description: "Description for Event 1",
			time: new Date(2025, 4, 9, 12, 0, 0, 0),
			endTime: new Date(2025, 4, 9, 14, 0, 0, 0),
		},
		{
			id: "2",
			title: "Event 2",
			description: "Description for Event 2",
			time: new Date(2025, 4, 9, 13, 0, 0, 0),
			endTime: new Date(2025, 4, 9, 14, 0, 0, 0),
		},
		{
			id: "3",
			title: "Event 3",
			description: "Description for Event 3",
			time: new Date(2025, 4, 9, 15, 0, 0, 0),
			endTime: new Date(2025, 4, 9, 20, 0, 0, 0),
		},
	]);
	const [calendarType, SetCalendarType] = useState("day");
	const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
	const [currentDate, setCurrentDate] = useState(new Date(Date.now()));

	const addEvent = (event: CalendarEvent) => {
		setEvents((prevEvents) => [...prevEvents, event]);
	};
	const findEvent = (id: string) => {
		const event = events.find((event) => event.id === id);
		return event;
	};
	const removeEvent = (id: string) => {
		setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
	};
	// useEffect(() => {
	// 	const Events = [
	// 		{
	// 			id: "1",
	// 			title: "Event 1",
	// 			description: "Description for Event 1",
	// 			date: "2023-10-01",
	// 		},
	// 		{
	// 			id: "2",
	// 			title: "Event 2",
	// 			description: "Description for Event 2",
	// 			date: "2023-10-02",
	// 		},
	// 		{
	// 			id: "3",
	// 			title: "Event 3",
	// 			description: "Description for Event 3",
	// 			date: "2023-10-03",
	// 		},
	// 	];
	// 	for (const calendarEvent of Events) {
	// 		addEvent(calendarEvent);
	// 	}
	// }, []);

	return (
		<CalendarContext.Provider
			value={{
				events,
				addEvent,
				removeEvent,
				calendarType,
				SetCalendarType,
				selectedDate,
				setSelectedDate,
				findEvent,
				currentDate,
				setCurrentDate,
			}}
		>
			{children}
		</CalendarContext.Provider>
	);
};

export const useCalendarContext = () => {
	const context = useContext(CalendarContext);
	if (!context) {
		throw new Error(
			"useCalendarContext must be used within a CalendarProvider"
		);
	}
	return context;
};

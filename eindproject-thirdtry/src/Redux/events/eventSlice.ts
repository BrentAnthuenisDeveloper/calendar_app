import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CalendarEvent from "../../Types/CalendarEvent";

const initialState: CalendarEvent[] = [
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
];

const eventsSlice = createSlice({
	initialState: initialState,
	name: "events",
	reducers: {
		addEvent: (state, action: PayloadAction<CalendarEvent>) => {
			const event = action.payload;
			const existingEvent = state.find((e) => e.id === event.id);
			if (!existingEvent) {
				return [event, ...state];
			} else return state;
		},
		removeEvent: (state, action: PayloadAction<string>) => {
			return state.filter((event) => event.id !== action.payload);
		},
		clearAll: (state, action) => {
			return initialState;
		},
		modifyEvent: (state, action: PayloadAction<CalendarEvent>) => {
			return state.map((event) =>
				event.id === action.payload.id ? action.payload : event
			);
		},
	},
});

export const {
	reducer,
	actions: { addEvent, removeEvent, modifyEvent, clearAll },
} = eventsSlice;

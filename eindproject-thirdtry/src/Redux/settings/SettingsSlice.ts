import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CalendarEvent from "../../Types/CalendarEvent";

interface Settings {
	currentDate: Date;
}

const initialState: Settings = { currentDate: new Date() };

const SettingsSlice = createSlice({
	initialState: initialState,
	name: "settings",
	reducers: {
		setCurrentDate: (state, action: PayloadAction<Date>) => {
			state.currentDate = action.payload;
		},
	},
});

export const {
	reducer,
	actions: { setCurrentDate },
} = SettingsSlice;

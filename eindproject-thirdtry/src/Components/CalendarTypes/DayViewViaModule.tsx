import { StyleSheet, Text, View } from "react-native";
import {
	CalendarProvider,
	ExpandableCalendar,
	Timeline,
} from "react-native-calendars";
import React, { useState } from "react";
import { CalendarEvent, StackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";

interface DayViewProps {
	calendar: CalendarEvent[];
	removeEvent: (id: string) => void;
	navigation: StackNavProps<"Calendar">["navigation"];
}
const DayView = ({ calendar, removeEvent, navigation }: DayViewProps) => {
	const events = calendar.map((event) => ({
		id: event.id,
		title: event.title,
		start: event.time,
		end: event.endTime ? event.endTime : event.time,
		description: event.description,
	}));
	const { currentDate,setSelectedDate } = useCalendarContext();
	const currentDateString = currentDate.toISOString();
	console.log("events", events);
	return (
		<CalendarProvider date={currentDateString}>
			<ExpandableCalendar firstDay={1} onDayPress={(dayData)=>setSelectedDate(new Date(dayData.toString()))}/>
			<Timeline
				events={events}
				styles={{}}
				onEventPress={(event) =>
					navigation.navigate("TaskDetails", {
						CalendarEventId: event.id ?? "noId",
					})
				}
			/>
		</CalendarProvider>
	);
};

export default DayView;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import React, { useState } from "react";
import { CalendarEvent, CalendarStackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";
import { format } from "date-fns";
import { FlatList } from "react-native-gesture-handler";
import AgendaItem from "./AgendaItem";
import MyText from "../MyText";

interface DayViewProps {
	calendar: CalendarEvent[];
	removeEvent: (id: string) => void;
	navigation: CalendarStackNavProps<"Calendar">["navigation"];
}
const AgendaWithFlatList = ({
	calendar,
	removeEvent,
	navigation,
}: DayViewProps) => {
	const { currentDate, selectedDate, setSelectedDate } = useCalendarContext();

	const currentDateString = currentDate.toISOString();

	const SelectedDaysItems = () => {
		console.log(
			"unfilterdCalendardates",
			calendar.map((event) => event.time.toString())
		);
		console.log("selectedDate", selectedDate.toString());
		const filteredCalendar = calendar.filter((event) => {
			return (
				event.time.getDate() === selectedDate.getDate() &&
				event.time.getMonth() === selectedDate.getMonth() &&
				event.time.getFullYear() === selectedDate.getFullYear()
			);
		});
		console.log("filteredCalendar", filteredCalendar);
		return filteredCalendar;
	};

	return (
		<CalendarProvider date={currentDateString} style={styles.container}>
			<ExpandableCalendar
				firstDay={1}
				onDayPress={(dayData) => setSelectedDate(new Date(dayData.timestamp))}
				theme={{
					agendaDayTextColor: "#222",
					agendaDayNumColor: "#222",
					agendaTodayColor: "blue",
					agendaKnobColor: "#ccc",
				}}
			/>
			{SelectedDaysItems().length > 0 ? (
				<FlatList
					style={styles.flatList}
					data={SelectedDaysItems()}
					renderItem={({ item }) => {
						return <AgendaItem event={item} />;
					}}
					contentContainerStyle={styles.listContent}
				/>
			) : (
				<View style={styles.noEventsContainer}>
					<MyText style={styles.noEventsText}>No Events For This Date</MyText>
				</View>
			)}
		</CalendarProvider>
	);
};

export default AgendaWithFlatList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	flatList: {
		flex: 1,
	},
	listContent: {
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	noEventsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	noEventsText: {
		fontSize: 20,
		color: "#666",
		textAlign: "center",
	},
});

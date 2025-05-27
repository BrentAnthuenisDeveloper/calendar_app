import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { CalendarStackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";
import { FlatList } from "react-native";
import AgendaItem from "./AgendaItem";
import MyText from "../MyText";
import { ActivityIndicator } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import { CalendarEvent } from "@/Calendar-env";
import { format } from "date-fns";

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
	const [loading, setLoading] = useState(true);
	const { currentDate, selectedDate, setSelectedDate } = useCalendarContext();

	const SelectedDaysItems = useMemo(() => {
		setLoading(true);
		console.log("calendar", calendar);

		const filteredCalendar = calendar.filter((event) => {
			const eventdate = new Date(event.time);

			return (
				eventdate.getDate() === selectedDate.getDate() &&
				eventdate.getMonth() === selectedDate.getMonth() &&
				eventdate.getFullYear() === selectedDate.getFullYear()
			);
		});
		console.log("SelectedDate", selectedDate);
		console.log("Filtered Calendar", filteredCalendar);

		setLoading(false);
		return filteredCalendar;
	}, [calendar, selectedDate]);
	const datesWithEventsAndStyle = useMemo(() => {
		let uniqueDates: Date[] = [];
		const dates = calendar.map((event) => {
			let date = new Date(event.time);
			date.setHours(0, 0, 0, 0);
			return date;
		});
		for (const date of dates) {
			if (!uniqueDates.some((d) => d.getTime() === date.getTime())) {
				uniqueDates.push(date);
			}
		}
		return uniqueDates.map((date) => {
			return {
				date: date,
				textStyle: styles.busyDatesText,
			};
		});
	}, [calendar]);

	return (
		<View style={styles.container}>
			<CalendarPicker
				textStyle={{ fontFamily: "ebgaramond" }}
				onDateChange={(dayData) => {
					setSelectedDate(dayData);
				}}
				todayBackgroundColor=""
				customDatesStyles={datesWithEventsAndStyle}
				todayTextStyle={{}}
			/>
			{loading ? (
				<View style={styles.spinnerContainer}>
					<ActivityIndicator animating={true} size="large" />
				</View>
			) : SelectedDaysItems.length > 0 ? (
				<FlatList
					style={styles.flatList}
					data={SelectedDaysItems}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("EventDetails", {
										CalendarEventId: item.id,
									})
								}
							>
								<AgendaItem removeEvent={removeEvent} event={item} />
							</TouchableOpacity>
						);
					}}
					contentContainerStyle={styles.listContent}
				/>
			) : (
				<View style={styles.noEventsContainer}>
					<MyText style={styles.noEventsText}>No Events For This Date</MyText>
				</View>
			)}
		</View>
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
	spinnerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	busyDatesText: {
		color: "#15008f",
		fontWeight: "bold",
	},
});

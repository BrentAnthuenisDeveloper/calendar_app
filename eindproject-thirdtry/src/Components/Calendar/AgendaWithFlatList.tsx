import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import React, { useMemo, useState } from "react";
import { CalendarEvent, CalendarStackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";
import { FlatList } from "react-native";
import AgendaItem from "./AgendaItem";
import MyText from "../MyText";
import { ActivityIndicator } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";

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

	const currentDateString = useMemo(
		() => currentDate.toISOString(),
		[currentDate]
	);

	const SelectedDaysItems = useMemo(() => {
		setLoading(true);
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
		setLoading(false);
		return filteredCalendar;
	}, [calendar, selectedDate]);

	return (
		<CalendarProvider
			date={currentDateString}
			style={styles.container}
			theme={{
				textDayFontFamily: "ebgaramond",
				textMonthFontFamily: "ebgaramond",
				textDayHeaderFontFamily: "ebgaramond",
			}}
		>
			<CalendarPicker
				textStyle={{ fontFamily: "ebgaramond" }}
				onDateChange={(dayData) => {
					setSelectedDate(dayData);
				}}
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
									navigation.navigate("TaskDetails", {
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
	spinnerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

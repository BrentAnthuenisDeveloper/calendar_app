import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import MyList from "../Components/MyList";
import MyText from "../Components/MyText";
import { CalendarEvent, StackNavProps } from "../Navigation/types";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCalendarContext } from "../Context/CalendarContext";
import DayView from "../Components/CalendarTypes/DayView";
import WeekView from "../Components/CalendarTypes/WeekView";
import MonthView from "../Components/CalendarTypes/MonthView";

const CalendarScreen = () => {
	const navigation = useNavigation<StackNavProps<"Calendar">["navigation"]>();
	const Calendar = useCalendarContext();
	return (
		<View style={styles.container}>
			{Calendar.calendarType == "day"}&&
			<DayView
				calendar={Calendar.events}
				removeEvent={Calendar.removeEvent}
				navigation={navigation}
			/>
			{Calendar.calendarType == "week"}&&
			<WeekView calendar={Calendar.events} />
			{Calendar.calendarType == "month"}&&
			<MonthView calendar={Calendar.events} />
		</View>
	);
};

export default CalendarScreen;

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
});

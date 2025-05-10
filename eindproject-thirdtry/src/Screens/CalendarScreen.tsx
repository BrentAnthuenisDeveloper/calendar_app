import { StyleSheet, View } from "react-native";
import React from "react";
import { CalendarStackNavProps } from "../Navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useCalendarContext } from "../Context/CalendarContext";
import AgendaWithFlatList from "../Components/Calendar/AgendaWithFlatList";

const CalendarScreen = () => {
	const navigation =
		useNavigation<CalendarStackNavProps<"Calendar">["navigation"]>();
	const { events, removeEvent } = useCalendarContext();
	return (
		<View style={styles.container}>
			<AgendaWithFlatList
				calendar={events}
				removeEvent={removeEvent}
				navigation={navigation}
			/>
		</View>
	);
};

export default CalendarScreen;

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	body: {},
});

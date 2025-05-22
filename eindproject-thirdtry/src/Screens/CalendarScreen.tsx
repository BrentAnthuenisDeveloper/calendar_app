import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { CalendarStackNavProps } from "../Navigation/types";
import { useNavigation } from "@react-navigation/native";
import AgendaWithFlatList from "../Components/Calendar/AgendaWithFlatList";
import { useAppSelector } from "../hooks/redux";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, removeEvent } from "../Redux/events/eventSlice";

const CalendarScreen = () => {
	const navigation =
		useNavigation<CalendarStackNavProps<"Calendar">["navigation"]>();
	//const { events, removeEvent } = useCalendarContext();
	const events = useAppSelector((state) => state.events);
	
	const dispatch = useDispatch();
	const removeEventLocal = (id: string) => {
		dispatch(removeEvent(id));
	};
	return (
		<View style={styles.container}>
			<AgendaWithFlatList
				calendar={events}
				removeEvent={removeEventLocal}
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

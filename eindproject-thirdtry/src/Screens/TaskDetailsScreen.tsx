import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { StackNavProps } from "../Navigation/types";
import { useCalendarContext } from "../Context/CalendarContext";

const TaskDetails = () => {
	const {
		params: { CalendarEventId },
	} = useRoute<StackNavProps<"TaskDetails">["route"]>();
	const { findEvent } = useCalendarContext();
	const CalendarEvent = findEvent(CalendarEventId);
	return CalendarEvent ? (
		<View>
			<Text>details for task: {CalendarEvent.title}</Text>
			<Text>{CalendarEvent.description}</Text>
		</View>
	) : (
		<View>
			<Text>Task not found</Text>
		</View>
	);
};

export default TaskDetails;

const styles = StyleSheet.create({});

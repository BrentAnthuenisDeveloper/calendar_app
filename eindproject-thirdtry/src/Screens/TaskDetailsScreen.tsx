import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { StackNavProps } from "../Navigation/types";

const TaskDetails = () => {
	const {
		params: { CalendarEvent },
	} = useRoute<StackNavProps<"TaskDetails">["route"]>();
	return (
		<View>
			<Text>details for task: {CalendarEvent.title}</Text>
			<Text>{CalendarEvent.description}</Text>
		</View>
	);
};

export default TaskDetails;

const styles = StyleSheet.create({});

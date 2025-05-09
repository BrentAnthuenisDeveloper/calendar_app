import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CalendarEvent } from "../../Navigation/types";
import MyText from "../MyText";

interface WeekViewProps {
	calendar: CalendarEvent[];
}
const WeekView = ({ calendar }: WeekViewProps) => {
	return (
		<View>
			<MyText>WeekView</MyText>
		</View>
	);
};

export default WeekView;

const styles = StyleSheet.create({});

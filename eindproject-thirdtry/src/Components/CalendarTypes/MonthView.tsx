import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CalendarEvent } from "../../Navigation/types";

interface MonthViewProps {
	calendar: CalendarEvent[];
}
const MonthView = ({ calendar }: MonthViewProps) => {
	return (
		<View>
			<Text>MonthView</Text>
		</View>
	);
};

export default MonthView;

const styles = StyleSheet.create({});

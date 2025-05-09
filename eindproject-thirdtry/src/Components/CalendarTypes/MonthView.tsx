import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CalendarEvent } from "../../Navigation/types";
import MyText from "../MyText";

interface MonthViewProps {
	calendar: CalendarEvent[];
}
const MonthView = ({ calendar }: MonthViewProps) => {
	return (
		<View>
			<MyText>MonthView</MyText>
		</View>
	);
};

export default MonthView;

const styles = StyleSheet.create({});

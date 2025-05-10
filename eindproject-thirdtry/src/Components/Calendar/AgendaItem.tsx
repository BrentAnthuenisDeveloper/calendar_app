import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CalendarEvent } from "../../Navigation/types";
import MyText from "../MyText";

interface AgendaItemProps {
	event: CalendarEvent;
}
const AgendaItem = ({ event }: AgendaItemProps) => {
	return (
		<View>
			<MyText>{event.title}</MyText>
		</View>
	);
};

export default AgendaItem;

const styles = StyleSheet.create({});

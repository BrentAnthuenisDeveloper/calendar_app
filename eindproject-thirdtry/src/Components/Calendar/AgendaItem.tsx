import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CalendarEvent } from "../../Navigation/types";
import MyText from "../MyText";
import { List } from "react-native-paper";

interface AgendaItemProps {
	event: CalendarEvent;
	removeEvent: (id: string) => void;
}
const AgendaItem = ({ event,removeEvent }: AgendaItemProps) => {
	return (
		<View>
			<List.Item style={{}} title={event.title} description={event.description} left={props => <List.Icon {...props} icon="calendar" />} titleStyle={{fontFamily:"ebgaramond"}} descriptionStyle={{fontFamily:"ebgaramond"}}/>
		</View>
	);
};

export default AgendaItem;

const styles = StyleSheet.create({});

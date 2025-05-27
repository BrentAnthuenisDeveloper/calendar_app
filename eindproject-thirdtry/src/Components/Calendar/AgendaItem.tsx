import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MyText from "../MyText";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CalendarEvent } from "@/Calendar-env";

interface AgendaItemProps {
	event: CalendarEvent;
	removeEvent: (id: string) => void;
}
const AgendaItem = ({ event, removeEvent }: AgendaItemProps) => {
	return (
		<View>
			<List.Item
				style={{}}
				title={event.title}
				description={event.description}
				left={(props) => <List.Icon {...props} icon="calendar" />}
				titleStyle={{ fontFamily: "ebgaramond" }}
				descriptionStyle={{ fontFamily: "ebgaramond" }}
				right={(props) => (
					<TouchableOpacity>
						<MaterialCommunityIcons
							name="delete"
							size={24}
							color="black"
							onPress={() => removeEvent(event.id)}
						/>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default AgendaItem;

const styles = StyleSheet.create({});

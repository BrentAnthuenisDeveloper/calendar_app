import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StackNavProps } from "../../Navigation/types";
import CalendarEvent from "../../Types/CalendarEvent";
import MyText from "../MyText";

export interface DayViewProps {
	calendar: CalendarEvent[];
	removeEvent: (id: string) => void;
	navigation: StackNavProps<"Calendar">["navigation"];
}
const DayView = ({ calendar, navigation, removeEvent }: DayViewProps) => {
	return (
		<FlatList
			data={calendar}
			renderItem={({ item }) => (
				<View style={styles.listItem}>
					<TouchableOpacity
						style={styles.titleWrapper}
						onPress={() => {
							navigation.navigate("TaskDetails", { CalendarEvent: item });
						}}
					>
						<MyText>{item.title}</MyText>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => {
							removeEvent(item.id);
						}}
					>
						<MaterialCommunityIcons name="delete" />
					</TouchableOpacity>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },

	listItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},

	titleWrapper: {
		flex: 1,
	},

	deleteButton: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		backgroundColor: "#ffe5e5",
		borderRadius: 6,
	},
});

export default DayView;

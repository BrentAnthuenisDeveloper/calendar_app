import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../Screens/StartScreen";
import CalendarScreen from "../Screens/CalendarScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { StackNavigationParamList, StackNavProps } from "./types";
import TaskDetailsScreen from "../Screens/TaskDetailsScreen";
import { useNavigation } from "@react-navigation/core";
import NewTaskScreen from "../Screens/NewTaskScreen";

const stack = createStackNavigator<StackNavigationParamList>();
const StackNavigator = () => {
	const navigation = useNavigation<StackNavProps<"Calendar">["navigation"]>();
	return (
		<stack.Navigator
			screenOptions={{
				headerTitleStyle: { fontFamily: "uncial", fontSize: 30 },
			}}
		>
			<stack.Screen
				name="Calendar"
				component={CalendarScreen}
				options={({ navigation }) => ({
					headerRight: (props) => (
						<Button
							title="add"
							onPress={() => {
								navigation.navigate("AddEvent");
							}}
						/>
					),
				})}
			/>
			<stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
			<stack.Screen name="AddEvent" component={NewTaskScreen} />
		</stack.Navigator>
	);
};

export default StackNavigator;

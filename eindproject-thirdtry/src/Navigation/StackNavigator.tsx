import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../Screens/StartScreen";
import CalendarScreen from "../Screens/CalendarScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { StackNavigationParamList, StackNavProps } from "./types";
import TaskDetailsScreen from "../Screens/TaskDetailsScreen";
import { useNavigation } from "@react-navigation/core";
import NewTaskScreen from "../Screens/NewTaskScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useCalendarContext } from "../Context/CalendarContext";
import HeaderRight from "../Components/HeaderRight";
("react-native-element-dropdown");

const stack = createStackNavigator<StackNavigationParamList>();
const StackNavigator = () => {
	return (
		<stack.Navigator
			screenOptions={{
				headerTitleStyle: { fontFamily: "uncial", fontSize: 30 },
			}}
		>
			<stack.Screen
				name="Calendar"
				component={CalendarScreen}
				options={() => ({
					headerRight: () => <HeaderRight />,
				})}
			/>
			<stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
			<stack.Screen name="AddEvent" component={NewTaskScreen} />
		</stack.Navigator>
	);
};

export default StackNavigator;

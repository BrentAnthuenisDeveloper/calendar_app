import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabNavigationParamList } from "./types";
import { startScreenTransition } from "react-native-reanimated";
import StartScreen from "../Screens/StartScreen";
import CalendarScreen from "../Screens/CalendarScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import CalendarStackNavigator from "./CalendarStackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginStackNavigator from "./LoginStackNavigator";

const tabnav = createBottomTabNavigator<TabNavigationParamList>();

const DrawerNavigator = () => {
	return (
		<tabnav.Navigator
			screenOptions={{
				headerTitleStyle: { fontFamily: "uncial", fontSize: 30 },
			}}
		>
			<tabnav.Screen
				name="Home"
				component={LoginStackNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
					headerShown: false,
				}}
			/>
			<tabnav.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="calendar" color={color} size={size} />
					),
				}}
				name="CalendarStack"
				component={CalendarStackNavigator}
			/>
			<tabnav.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="toolbox" color={color} size={size} />
					),
				}}
			/>
		</tabnav.Navigator>
	);
};

export default DrawerNavigator;

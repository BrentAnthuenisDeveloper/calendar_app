import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../Screens/CalendarScreen";
import { CalandarStackNavigationParamList } from "./types";
import TaskDetailsScreen from "../Screens/TaskDetailsScreen";
import NewTaskScreen from "../Screens/NewTaskScreen";
import HeaderRight from "../Components/Calendar/HeaderRight";
import CreateEventScreen from "../Screens/CreateEventScreen";
("react-native-element-dropdown");

const stack = createStackNavigator<CalandarStackNavigationParamList>();
const CalendarStackNavigator = () => {
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
			<stack.Screen name="AddEvent" component={CreateEventScreen} />
		</stack.Navigator>
	);
};

export default CalendarStackNavigator;

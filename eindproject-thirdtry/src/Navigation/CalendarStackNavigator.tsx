import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../Screens/CalendarScreen";
import { CalendarStackNavigationParamList } from "./types";
import TaskDetailsScreen from "../Screens/TaskDetailsScreen";
import NewTaskScreen from "../Screens/NewTaskScreen";
import HeaderRightCalendar from "../Components/Calendar/HeaderRightCalendar";
import CreateEventScreen from "../Screens/CreateEventScreen";
("react-native-element-dropdown");

const stack = createStackNavigator<CalendarStackNavigationParamList>();
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
					headerRight: () => <HeaderRightCalendar />,
				})}
			/>
			<stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
			<stack.Screen name="AddEvent" component={CreateEventScreen} />
		</stack.Navigator>
	);
};

export default CalendarStackNavigator;

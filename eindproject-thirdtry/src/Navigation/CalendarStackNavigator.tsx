import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../Screens/Calendar/CalendarScreen";
import { CalendarStackNavigationParamList } from "./types";
import TaskDetailsScreen from "../Screens/Calendar/EventDetailsScreen";
import HeaderRightCalendar from "../Components/Calendar/HeaderRightCalendar";
import CreateEventScreen from "../Screens/Calendar/CreateEventScreen";
import UpdateEventScreen from "../Screens/Calendar/UpdateEventScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import HeaderRightEventDetails from "../Components/Calendar/HeaderRightEventDetails";

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
			<stack.Screen name="EventDetails" component={TaskDetailsScreen} />
			<stack.Screen name="AddEvent" component={CreateEventScreen} />
			<stack.Screen name="UpdateEvent" component={UpdateEventScreen} />
		</stack.Navigator>
	);
};

export default CalendarStackNavigator;

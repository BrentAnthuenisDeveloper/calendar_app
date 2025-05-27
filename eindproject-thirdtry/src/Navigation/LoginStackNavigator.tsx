import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginStackNavigationParamList } from "./types";
import StartScreen from "../Screens/StartScreen";
import LoginScreen from "../Screens/Login/LoginScreen";
import RegisterScreen from "../Screens/Login/RegisterScreen";
import HeaderRightCalendar from "../Components/Calendar/HeaderRightCalendar";
import { TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import HeaderRightLogin from "../Components/Login/HeaderRightLogin";
("react-native-element-dropdown");

const stack = createStackNavigator<LoginStackNavigationParamList>();
const LoginStackNavigator = () => {
	return (
		<stack.Navigator
			screenOptions={{
				headerTitleStyle: { fontFamily: "uncial", fontSize: 30 },
			}}
		>
			<stack.Screen
				name="Home"
				component={StartScreen}
				options={{
					headerRight: () => <HeaderRightLogin />,
				}}
			/>
			<stack.Screen name="Login" component={LoginScreen} />
			<stack.Screen name="Register" component={RegisterScreen} />
		</stack.Navigator>
	);
};

export default LoginStackNavigator;

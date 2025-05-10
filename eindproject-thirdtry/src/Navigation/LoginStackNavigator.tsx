import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
	LoginStackNavigationParamList,
} from "./types";
import StartScreen from "../Screens/StartScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
("react-native-element-dropdown");

const stack = createStackNavigator<LoginStackNavigationParamList>();
const LoginStackNavigator = () => {
	return (
		<stack.Navigator
			screenOptions={{
				headerTitleStyle: { fontFamily: "uncial", fontSize: 30 },
			}}
		>
			<stack.Screen name="Home" component={StartScreen} />
			<stack.Screen name="Login" component={LoginScreen} />
			<stack.Screen name="Register" component={RegisterScreen} />
		</stack.Navigator>
	);
};

export default LoginStackNavigator;

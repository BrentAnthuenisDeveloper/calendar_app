import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as splashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/Navigation/TabNavigator";
import { CalendarProvider } from "./src/Context/CalendarContext";

splashScreen.preventAutoHideAsync();

export default function App() {
	const [isFontLoaded, fontError] = useFonts({
		ebgaramond: require("./assets/Fonts/EBGaramond-Regular.ttf"),
		ebgaramondBold: require("./assets/Fonts/EBGaramond-Bold.ttf"),
		uncial: require("./assets/Fonts/UncialAntiqua-Regular.ttf"),
	});

	useEffect(() => {
		if (isFontLoaded) {
			splashScreen.hideAsync();
		} else if (fontError) {
			console.error("Font loading error:", fontError);
		}
	}, [isFontLoaded, fontError]);

	if (!isFontLoaded && !fontError) {
		return null;
	}
	return (
		<CalendarProvider>
			<NavigationContainer>
				<DrawerNavigator />
			</NavigationContainer>
		</CalendarProvider>
	);
}

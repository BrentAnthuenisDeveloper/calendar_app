import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as splashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import GlobalTabNavigator from "./src/Navigation/TabNavigator";
import { CalendarProvider } from "./src/Context/CalendarContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "./src/Redux/store";

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

	if (isFontLoaded) {
		console.log("font loaded");
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistedStore}>
					<CalendarProvider>
						<NavigationContainer>
							<GlobalTabNavigator />
						</NavigationContainer>
					</CalendarProvider>
				</PersistGate>
			</Provider>
		);
	} else {
		console.log("font couldn't be loaded");
		return null;
	}
}

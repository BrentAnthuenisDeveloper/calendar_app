import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyText from "../Components/MyText";

const StartScreen = () => {
	return (
		<View style={styles.container}>
			<MyText>Welcome to this calendar app</MyText>
			<MyText>Click on the calendar icon to get started</MyText>
		</View>
	);
};

export default StartScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

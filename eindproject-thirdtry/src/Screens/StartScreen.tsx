import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MyText from "../Components/MyText";
import { onAuthStateChanged } from "firebase/auth";
import { Unsubscribe } from "redux";
import { auth } from "../firebase/firebaseConfig";

const StartScreen = () => {
	console.log("StartScreen");
	const [userName, SetUserName] = useState("");
	useEffect(() => {
		const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				SetUserName(user.displayName || user.email?.split("@")[0] || "user");
			} else {
				SetUserName("");
			}
		});
		return () => unsubscribe();
	}, []);
	return (
		<View style={styles.container}>
			<MyText style={styles.title}>
				Welcome {userName} to this calendar app
			</MyText>
			<MyText style={styles.subtitle}>
				Here you can create and track events in a calendar
			</MyText>
			<MyText style={styles.note}>
				If you are logged in, your calendar is saved to your account
			</MyText>
		</View>
	);
};

export default StartScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
		backgroundColor: "#fdfdfd",
	},

	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 12,
		textAlign: "center",
		fontFamily: "ebgaramond",
	},

	subtitle: {
		fontSize: 16,
		marginBottom: 10,
		textAlign: "center",
		color: "#444",
		fontFamily: "ebgaramond",
	},

	note: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		fontFamily: "ebgaramond",
	},
});

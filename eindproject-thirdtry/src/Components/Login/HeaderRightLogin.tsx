import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginStackNavProps } from "../../Navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";

const HeaderRightLogin = () => {
	const navigation = useNavigation<LoginStackNavProps<"Home">["navigation"]>();
	

	return (
		<View style={styles.headerRightContainer}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("Login");
				}}
			>
				<MaterialCommunityIcons name="account" size={30} color={"crimson"} />
			</TouchableOpacity>
		</View>
	);
};

export default HeaderRightLogin;

const styles = StyleSheet.create({
	headerRightContainer: {
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 5,
		gap: 10,
		alignItems: "center",
	},
});

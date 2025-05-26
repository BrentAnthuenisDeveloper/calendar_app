import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { Text, TextProps, MD3Theme } from "react-native-paper";

const MyPaperText = (
	props: TextProps<MD3Theme> & Required<PropsWithChildren>
) => {
	return (
		<View>
			<Text {...props} style={[props.style, { fontFamily: "ebgaramond" }]}>
				{props.children}
			</Text>
		</View>
	);
};

export default MyPaperText;

const styles = StyleSheet.create({});

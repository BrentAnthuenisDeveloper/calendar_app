import { StyleSheet, Text, TextProps, View } from "react-native";
import React, { PropsWithChildren } from "react";

const MyText = (props: TextProps & Required<PropsWithChildren>) => {
	return (
		<View>
			<Text {...props} style={[{ fontFamily: "ebgaramond" }, props.style]}>
				{props.children}
			</Text>
		</View>
	);
};

export default MyText;

const styles = StyleSheet.create({});

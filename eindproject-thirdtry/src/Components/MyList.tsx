import { FlatListProps, StyleSheet, Text, View } from "react-native";
import React, { PropsWithRef } from "react";
import { FlatList } from "react-native-gesture-handler";

interface MyListProps {
	title: String;
	data: string[];
}

const MyList = (props: FlatListProps<any>) => {
	return (
		<View>
			<FlatList {...props}/>
		</View>
	);
};

export default MyList;

const styles = StyleSheet.create({
	List: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
	},
});

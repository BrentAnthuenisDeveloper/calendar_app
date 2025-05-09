import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useCalendarContext } from "../Context/CalendarContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavProps } from "../Navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderRight = () => {
	const { calendarType, SetCalendarType } = useCalendarContext();
	const navigation = useNavigation<StackNavProps<"Calendar">["navigation"]>();
	//properties for dropdown
	const [items, setItems] = useState([
		{ label: "Day", value: "day" },
		{ label: "Week", value: "week" },
		{ label: "Month", value: "month" },
	]);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(calendarType);

	const dropdownfontSize = 12;

	// Sync context when dropdown value changes
	useEffect(() => {
		if (value) {
			SetCalendarType(value);
		}
	}, [value]);
	return (
		<View
			style={{
				flexDirection: "row",
				paddingHorizontal: 10,
				paddingVertical: 5,
				gap: 10,
				alignItems: "center",
			}}
		>
			{/* <View style={{ zIndex: 1000 }}>
				<DropDownPicker
					multiple={false}
					items={items}
					open={open}
					value={value}
					setItems={setItems}
					setOpen={setOpen}
					setValue={setValue}
					style={{
						width: 90,
						borderRadius: 4,
						paddingVertical: 2, // less internal spacing
						padding: 4,
					}}
					dropDownContainerStyle={{
						width: 90,
						borderRadius: 4,
					}}
					textStyle={{
						fontSize: dropdownfontSize, // 👈 Font size inside the closed picker
					}}
					labelStyle={{
						fontSize: dropdownfontSize, // 👈 Font size for dropdown options
					}}
					arrowIconStyle={{
						width: dropdownfontSize, // 👈 icon width
						height: dropdownfontSize, // 👈 icon height
					}}
					arrowIconContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
						paddingRight: 4,
					}}
				/>
			</View> */}
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("AddEvent");
				}}
			>
				<MaterialCommunityIcons
					name="calendar-plus"
					size={30}
					color={"green"}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default HeaderRight;

const styles = StyleSheet.create({});

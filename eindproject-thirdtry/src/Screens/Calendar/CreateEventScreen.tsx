import { Button, StyleSheet, View, Text, Platform } from "react-native";
import React, { use, useState } from "react";
import { Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useCalendarContext } from "../../Context/CalendarContext";
import { CalendarEvent, CalendarStackNavProps } from "../../Navigation/types";
import { useDispatch } from "react-redux";
import { addEvent } from "../../Redux/events/eventSlice";
import MyText from "../../Components/MyText";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { format } from "date-fns";

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string(),
	date: Yup.string()
		.matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
		.required("Date is required"),
	time: Yup.string().matches(
		/^([01]\d|2[0-3]):([0-5]\d)$/,
		"Time must be in HH:MM format"
	),
});

const CreateEventScreen = () => {
	const dispatch = useDispatch();
	const addEventLocal = (event: CalendarEvent) => dispatch(addEvent(event));
	const [alert, SetAlert] = useState("");
	const nav = useNavigation<CalendarStackNavProps<"AddEvent">["navigation"]>();
	const {
		values,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			title: "",
			description: "",
			date: format(new Date(), "dd/MM/yyyy"),
			time: "",
		},
		onSubmit: async (values) => {
			try {
				const [day, month, year] = values.date.split("/");
				const formattedDate = `${year}-${month}-${day}T${values.time || "00:00"}`;
				const time = new Date(formattedDate);
				console.log("js Date:", formattedDate);

				const firebaseTimestamp = Timestamp.fromDate(time);

				const newEvent = {
					title: values.title,
					description: values.description ?? "",
					time: firebaseTimestamp,
				};
				console.log("New Event:", newEvent);

				// Save to Firestore
				await addDoc(collection(db, "events"), newEvent);

				console.log("Event saved to Firestore 🎉");
				if (nav.canGoBack()) {
					nav.goBack();
				}
			} catch (error) {
				console.error("Error adding event: ", error);
				SetAlert("Failed to save event");
			}
		},
		validationSchema,
	});
	return (
		<View style={styles.container}>
			<View style={styles.formGroup}>
				<TextInput
					label="Title"
					style={styles.input}
					value={values.title}
					onChangeText={handleChange("title")}
					onBlur={handleBlur("title")}
					placeholder="Title"
					autoCorrect={false}
					error={!!errors.title}
				/>
				{errors.title ? (
					<MyText style={styles.errorText}>{errors.title}</MyText>
				) : null}
			</View>
			<View style={styles.formGroup}>
				<TextInput
					label="Date"
					style={styles.input}
					placeholder="dd/MM/yyyy"
					value={values.date}
					onBlur={handleBlur("date")}
					autoCapitalize="none"
					onChangeText={handleChange("date")}
					keyboardType="numeric"
					error={!!errors.date}
				/>
				{errors.date ? (
					<MyText style={styles.errorText}>{errors.date}</MyText>
				) : null}
			</View>
			<View style={styles.formGroup}>
				<TextInput
					label="Description"
					style={styles.input}
					placeholder="description"
					value={values.description}
					onBlur={handleBlur("description")}
					onChangeText={handleChange("description")}
					keyboardType="default"
					error={!!errors.description}
				/>
				{errors.description ? (
					<MyText style={styles.errorText}>{errors.description}</MyText>
				) : null}
			</View>

			<View style={styles.button}>
				<Button
					title="Create"
					onPress={() => {
						handleSubmit();
					}}
				/>
			</View>

			{alert ? <MyText style={styles.alertText}>{alert}</MyText> : null}
		</View>
	);
};

export default CreateEventScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
		justifyContent: "center",
	},
	formGroup: {
		marginBottom: 20,
	},
	input: {
		backgroundColor: "white",
		fontFamily: "ebgaramond",
	},
	errorText: {
		color: "#d32f2f",
		fontSize: 14,
		marginTop: 4,
	},
	button: {
		marginTop: 20,
	},
	alertText: {
		marginTop: 10,
		fontSize: 16,
		color: "#2e7d32",
		textAlign: "center",
	},
});

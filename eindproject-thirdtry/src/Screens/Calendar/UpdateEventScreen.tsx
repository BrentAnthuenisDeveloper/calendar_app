import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
	useRoute,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";
import { CalendarStackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";
import MyPaperText from "../../Components/MyPaperText";
import MyText from "../../Components/MyText";
import { useAppSelector } from "../../hooks/redux";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import CalendarEvent from "../../Types/CalendarEvent";
import { format, set } from "date-fns";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextInput } from "react-native-paper";

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
const UpdateEventScreen = () => {
	const {
		params: { CalendarEventId },
	} = useRoute<CalendarStackNavProps<"TaskDetails">["route"]>();
	// const { findEvent } = useCalendarContext();
	// const CalendarEvent = findEvent(CalendarEventId);
	const events = useAppSelector((state) => state.events);
	const [CalendarEvent, setCalendarEvent] = useState<CalendarEvent | null>(
		null
	);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			(async () => {
				try {
					const carDocRef = doc(db, "events", CalendarEventId);
					const docSnap = await getDoc(carDocRef);
					const event = { ...docSnap.data(), id: docSnap.id } as CalendarEvent;
					setCalendarEvent(event);
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [isFocused]);
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
			title: CalendarEvent?.title || "",
			description: CalendarEvent?.description || "",
			date: format(CalendarEvent?.time || new Date(), "dd/MM/yyyy"),
		},
		onSubmit: async (values) => {
			try {
				const [day, month, year] = values.date.split("/");
				const formattedDate = `${year}-${month}-${day}T${"00:00"}`;
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
				Alert.alert("Event updated successfully");
				nav.navigate("Calendar");
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
					labelStyle={{ fontFamily: "ebgaramond" }}
					onPress={() => {
						handleSubmit();
					}}
				>
					Update
				</Button>
			</View>

			{alert ? <MyText style={styles.alertText}>{alert}</MyText> : null}
		</View>
	);
};

export default UpdateEventScreen;

const styles = StyleSheet.create({
	textContainer: {
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 12,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	title: {
		marginBottom: 10,
	},
	description: {
		color: "#444",
	},
	notFound: {
		textAlign: "center",
		color: "#888",
		fontSize: 16,
	},
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

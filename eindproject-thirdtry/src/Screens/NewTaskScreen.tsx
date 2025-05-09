import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useCalendarContext } from "../Context/CalendarContext";
import { CalendarEvent } from "../Navigation/types";

const NewTaskScreen = () => {
	const { addEvent } = useCalendarContext();

	interface CalendarEventFormValues {
		title: string;
		description: string;
		dateInput: string; // "YYYY-MM-DD"
		timeInput: string; // "HH:MM"
	}

	// Form values with split date/time inputs
	interface CalendarEventFormValues {
		title: string;
		description: string;
		dateInput: string;
		timeInput: string;
	}

	// Validation schema
	const CalendarEventSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		description: Yup.string().required("Description is required"),
		dateInput: Yup.string()
			.matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
			.required("Date is required"),
		timeInput: Yup.string()
			.matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format")
			.required("Time is required"),
	});
	const initialValues: CalendarEventFormValues = {
		title: "",
		description: "",
		dateInput: "",
		timeInput: "",
	};

	const handleSubmit = (
		values: CalendarEventFormValues,
		actions: FormikHelpers<CalendarEventFormValues>
	) => {
		const { title, description, dateInput, timeInput } = values;
		const fullDateTime = `${dateInput}T${timeInput}`;

		const newEvent: CalendarEvent = {
			id: Date.now().toString(),
			title,
			description,
			time: fullDateTime,
		};
		addEvent(newEvent);
		console.log("Submitted Event:", newEvent);
		actions.resetForm();
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={CalendarEventSchema}
			onSubmit={handleSubmit}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
			}) => (
				<View style={styles.container}>
					<TextInput
						placeholder="Title"
						style={styles.input}
						onChangeText={handleChange("title")}
						onBlur={handleBlur("title")}
						value={values.title}
					/>
					{errors.title && touched.title && (
						<Text style={styles.error}>{errors.title}</Text>
					)}

					<TextInput
						placeholder="Description"
						style={styles.input}
						onChangeText={handleChange("description")}
						onBlur={handleBlur("description")}
						value={values.description}
					/>
					{errors.description && touched.description && (
						<Text style={styles.error}>{errors.description}</Text>
					)}

					<TextInput
						placeholder="Date (YYYY-MM-DD)"
						style={styles.input}
						onChangeText={handleChange("dateInput")}
						onBlur={handleBlur("dateInput")}
						value={values.dateInput}
					/>
					{errors.dateInput && touched.dateInput && (
						<Text style={styles.error}>{errors.dateInput}</Text>
					)}

					<TextInput
						placeholder="Time (HH:MM)"
						style={styles.input}
						onChangeText={handleChange("timeInput")}
						onBlur={handleBlur("timeInput")}
						value={values.timeInput}
					/>
					{errors.timeInput && touched.timeInput && (
						<Text style={styles.error}>{errors.timeInput}</Text>
					)}

					<Button onPress={() => handleSubmit()} title="Create Event" />
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 12,
		marginBottom: 10,
		borderRadius: 8,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
});

export default NewTaskScreen;

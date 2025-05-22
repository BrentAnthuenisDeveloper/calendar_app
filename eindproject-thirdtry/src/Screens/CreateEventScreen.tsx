import {
	Button,
	StyleSheet,
	TextInput,
	View,
	Text,
	Platform,
} from "react-native";
import React, { use, useState } from "react";
import { Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useCalendarContext } from "../Context/CalendarContext";
import { CalendarEvent, CalendarStackNavProps } from "../Navigation/types";
import { useDispatch } from "react-redux";
import { addEvent } from "../Redux/events/eventSlice";
import MyText from "../Components/MyText";
import { useNavigation } from "@react-navigation/native";

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
			date: "",
			time: "",
		},
		onSubmit: async (values) => {
			console.log("formvalues", values);
			try {
				const [day, month, year] = values.date.split("/");

				const formattedDate = `${year}-${month}-${day}T${values.time || "00:00"}`;
				console.log("formattedDate", formattedDate);
				const newEvent = {
					id: Date.now().toString(),
					title: values.title,
					description: values.description ?? "",
					time: new Date(formattedDate),
					endTime: new Date(formattedDate),
				};
				console.log("newEvent", newEvent);
				addEventLocal(newEvent);
				SetAlert("Event created successfully");
			} catch (error) {
				console.log(error);
				SetAlert("Error creating event");
			}
		},
		validationSchema,
	});
	return (
		<View>
			<View>
				<TextInput
					style={{ fontFamily: "ebgaramond" }}
					value={values.title}
					onChangeText={handleChange("title")}
					onBlur={handleBlur("title")}
					placeholder="Title"
					autoCorrect={false}
				/>
				{errors.title ? <MyText>{errors.title}</MyText> : null}
				<TextInput
					style={{ fontFamily: "ebgaramond" }}
					placeholder="dd/MM/yyyy"
					value={values.date}
					onBlur={handleBlur("date")}
					autoCapitalize="none"
					onChangeText={handleChange("date")}
					keyboardType="numeric"
				/>
				{errors.date ? <MyText>{errors.date}</MyText> : null}
				<Button
					title="create"
					onPress={() => {
						console.log("submitting");
						handleSubmit();
						console.log("errors", errors);
					}}
				></Button>
			</View>
			<MyText>{alert}</MyText>
		</View>
	);
};

export default CreateEventScreen;

const styles = StyleSheet.create({});

import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { TextInput, Button } from "react-native-paper";
import MyPaperText from "../../Components/MyPaperText";

const validationSchema = Yup.object().shape({
	name: Yup.string(),
	email: Yup.string().email("Geen geldig email.").required(),
	password: Yup.string().required(),
});

const RegisterScreen = () => {
	const {
		values,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			console.log("creating user", values);
			try {
				const user = await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);
				await updateProfile(user.user, {
					displayName: values.name,
				});
				console.log("User created:", user.user);
				console.log("User logged in:", auth.currentUser);
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema,
	});

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				contentStyle={{ fontFamily: "ebgaramond" }}
				value={values.name}
				onChangeText={handleChange("name")}
				onBlur={handleBlur("name")}
				placeholder="Naam"
				autoCapitalize="words"
				autoCorrect={false}
				returnKeyType="next"
				autoComplete={Platform.OS === "ios" ? "name" : "name"}
				error={!!errors.name}
			/>
			{errors.name ? (
				<MyPaperText style={styles.errorText}>{errors.name}</MyPaperText>
			) : null}

			<TextInput
				style={styles.input}
				contentStyle={{ fontFamily: "ebgaramond" }}
				value={values.email}
				onChangeText={handleChange("email")}
				onBlur={handleBlur("email")}
				placeholder="Email"
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="email-address"
				returnKeyType="next"
				autoComplete={Platform.OS === "ios" ? "email" : "email"}
				error={!!errors.email}
			/>
			{errors.email ? (
				<MyPaperText style={styles.errorText}>{errors.email}</MyPaperText>
			) : null}

			<TextInput
				style={styles.input}
				contentStyle={{ fontFamily: "ebgaramond" }}
				placeholder="Wachtwoord"
				secureTextEntry
				autoCapitalize="none"
				autoComplete="password"
				value={values.password}
				onBlur={handleBlur("password")}
				onChangeText={(text) => {
					setFieldValue("password", text);
				}}
				error={!!errors.password}
			/>
			{errors.password ? (
				<MyPaperText style={styles.errorText}>{errors.password}</MyPaperText>
			) : null}

			<Button
				mode="contained-tonal"
				onPress={() => handleSubmit()}
				labelStyle={{ fontFamily: "ebgaramond", fontSize: 16 }}
				style={styles.registerButton}
			>
				Registreren
			</Button>
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#fff",
	},

	input: {
		marginBottom: 12,
	},

	errorText: {
		color: "red",
		marginBottom: 8,
		marginLeft: 4,
		fontSize: 13,
		fontFamily: "ebgaramond",
	},

	registerButton: {
		marginTop: 20,
		paddingVertical: 6,
	},
});

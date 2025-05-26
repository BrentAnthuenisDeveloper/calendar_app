import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LoginStackNavProps } from "../Navigation/types";
import { TextInput, Button } from "react-native-paper";
import MyPaperText from "../Components/MyPaperText";

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Geen geldig email.").required(),
	password: Yup.string().required(),
});

const LoginScreen = () => {
	const navigation = useNavigation<LoginStackNavProps<"Login">["navigation"]>();
	const {
		values,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			console.log(values);
			try {
				const user = await signInWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);
				navigation.navigate("Home");
				console.log("loggedinuser", user.user);
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
				value={values.email}
				onChangeText={handleChange("email")}
				onBlur={handleBlur("email")}
				placeholder="Email"
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="email-address"
				returnKeyType="next"
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
				autoComplete="password"
				value={values.password}
				onBlur={handleBlur("password")}
				onChangeText={(text) => setFieldValue("password", text)}
				error={!!errors.password}
			/>
			{errors.password ? (
				<MyPaperText style={styles.errorText}>{errors.password}</MyPaperText>
			) : null}

			<Button
				mode="contained-tonal"
				onPress={() => handleSubmit()}
				style={styles.loginButton}
				labelStyle={{ fontFamily: "ebgaramond", fontSize: 16 }}
			>
				Login
			</Button>

			<View>
				<MyPaperText style={styles.registerText}>
					Geen account? Registreer{" "}
					<Text
						style={styles.registerLink}
						onPress={() => navigation.navigate("Register")}
					>
						hier
					</Text>
				</MyPaperText>
			</View>
		</View>
	);
};

export default LoginScreen;

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
	},
	loginButton: {
		marginTop: 16,
	},
	registerText: {
		marginTop: 24,
		textAlign: "center",
		color: "#666",
	},
	registerLink: {
		color: "#007bff",
		textDecorationLine: "underline",
		fontFamily: "ebgaramond",
	},
});

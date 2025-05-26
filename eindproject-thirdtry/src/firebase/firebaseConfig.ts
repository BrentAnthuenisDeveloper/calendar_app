import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
	initializeAuth,
	getReactNativePersistence,
	getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBAeLBH1M6BHckmwAQaoQUCYNVLxdWWRKw",
	authDomain: "calendar-6afaa.firebaseapp.com",
	projectId: "calendar-6afaa",
	storageBucket: "calendar-6afaa.firebasestorage.app",
	messagingSenderId: "85862639089",
	appId: "1:85862639089:web:f699b89444b3f86cacd050",
	measurementId: "G-K3N5ECEZBY",
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { CalendarStackNavProps } from "../../Navigation/types";
import { useCalendarContext } from "../../Context/CalendarContext";
import MyPaperText from "../../Components/MyPaperText";
import MyText from "../../Components/MyText";
import { useAppSelector } from "../../hooks/redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import CalendarEvent from "../../Types/CalendarEvent";
import { set } from "date-fns";

const EventDetialsScreen = () => {
	const {
		params: { CalendarEventId },
	} = useRoute<CalendarStackNavProps<"EventDetails">["route"]>();
	// const { findEvent } = useCalendarContext();
	// const CalendarEvent = findEvent(CalendarEventId);
	const events = useAppSelector((state) => state.events);
	const [CalendarEvent, setCalendarEvent] = useState<CalendarEvent | null>(
		null
	);

	useEffect(() => {
		(async () => {
			try {
				const carDocRef = doc(db, "events", CalendarEventId);
				const docSnap = await getDoc(carDocRef);
				const data = docSnap.data();
				const event = {
					...data,
					time: data?.time?.toDate(), // Convert Firestore Timestamp to JS Date
					id: docSnap.id,
				} as CalendarEvent;
				setCalendarEvent(event);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [CalendarEventId]);
	return CalendarEvent ? (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<MyPaperText variant="headlineMedium" style={styles.title}>
					{CalendarEvent.title}
				</MyPaperText>
				<MyPaperText variant="bodyMedium" style={styles.description}>
					{CalendarEvent.description}
				</MyPaperText>
			</View>
		</View>
	) : (
		<View style={styles.container}>
			<MyText style={styles.notFound}>event not found</MyText>
		</View>
	);
};

export default EventDetialsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f9f9f9",
		justifyContent: "center",
	},
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
});

import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarStackNavProps } from "../../Navigation/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AgendaWithFlatList from "../../Components/Calendar/AgendaWithFlatList";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../../Redux/events/eventSlice";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	Unsubscribe,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CalendarEvent } from "@/Calendar-env";

const CalendarScreen = () => {
	const navigation =
		useNavigation<CalendarStackNavProps<"Calendar">["navigation"]>();
	//const { events, removeEvent } = useCalendarContext();
	// const events = useAppSelector((state) => state.events);
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	useEffect(() => {
		let unsubscribe: Unsubscribe;

		(async () => {
			try {
				const q = query(
					collection(db, "events"),
					// where("isElectric", "==", false),
					orderBy("title", "asc")
				);
				unsubscribe = onSnapshot(q, (qs) => {
					console.log("number of docs:", qs.docs.length);

					const parsedEvents = qs.docs.map((ds) => {
						console.log("snapshot:", ds.data);

						const data = ds.data();
						const event = {
							...data,
							time: data.time?.toDate(), // Convert Firestore Timestamp to JS Date
							id: ds.id,
						};
						return event as CalendarEvent;
					});
					setEvents(parsedEvents);
				});
			} catch (error) {
				console.log(error);
			}
		})();
		console.log("loaded firestore events", events);
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);
	const removeEventDb = async (id: string) => {
		try {
			const eventRef = doc(db, "events", id);
			await deleteDoc(eventRef);
			console.log("Event removed from Firestore");
		} catch (error) {
			console.error("Error removing event:", error);
		}
	};
	return (
		<AgendaWithFlatList
			calendar={events}
			removeEvent={removeEventDb}
			navigation={navigation}
		/>
	);
};

export default CalendarScreen;

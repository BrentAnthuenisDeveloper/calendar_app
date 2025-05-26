import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarStackNavProps } from "../Navigation/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AgendaWithFlatList from "../Components/Calendar/AgendaWithFlatList";
import { useAppSelector } from "../hooks/redux";
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../Redux/events/eventSlice";
import { collection, onSnapshot, orderBy, query, Unsubscribe } from "firebase/firestore";
import CalendarEvent from "../Types/CalendarEvent";
import { db } from "../firebase/firebaseConfig";

const CalendarScreen = () => {
	const navigation =
		useNavigation<CalendarStackNavProps<"Calendar">["navigation"]>();
	const isFocused = useIsFocused();
	//const { events, removeEvent } = useCalendarContext();
	// const events = useAppSelector((state) => state.events);
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	useEffect(() => {
    let unsubscribe: Unsubscribe;
	
    if (isFocused) {
      (async () => {
        try {

          const q = query(
            collection(db, "Events"),
            // where("isElectric", "==", false),
            orderBy("title", "asc")
          );
          unsubscribe = onSnapshot(q, (qs) => {
            setEvents(qs.docs.map((ds) => ({ ...ds.data(), id: ds.id } as CalendarEvent)));
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isFocused]);
	
	const dispatch = useDispatch();
	const removeEventLocal = (id: string) => {
		dispatch(removeEvent(id));
	};
	return (
		<View style={styles.container}>
			<AgendaWithFlatList
				calendar={events}
				removeEvent={removeEventLocal}
				navigation={navigation}
			/>
		</View>
	);
};

export default CalendarScreen;

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	body: {},
});

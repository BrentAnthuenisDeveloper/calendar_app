import { DrawerScreenProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";

export interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	date: string; // Stored as "YYYY-MM-DDTHH:MM"
}

export type TabNavigationParamList = {
	Home: undefined;
	CalendarStack: undefined;
	Settings: undefined;
};
export type StackNavigationParamList = {
	Calendar: undefined;
	TaskDetails: { CalendarEvent: CalendarEvent };
	AddEvent: undefined;
};

export type StackNavProps<T extends keyof StackNavigationParamList> =
	StackScreenProps<StackNavigationParamList, T>;

export type DrawerNavProps<T extends keyof TabNavigationParamList> =
	DrawerScreenProps<TabNavigationParamList, T>;

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends StackNavigationParamList,
				TabNavigationParamList {}
	}
}

import { DrawerScreenProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";

export interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	time: Date;
	endTime: Date;
}

export type TabNavigationParamList = {
	HomeStack: undefined;
	CalendarStack: undefined;
	Settings: undefined;
};
export type CalendarStackNavigationParamList = {
	Calendar: undefined;
	TaskDetails: { CalendarEventId: string };
	AddEvent: undefined;
};
export type LoginStackNavigationParamList = {
	Home: undefined;
	Login: undefined;
	Register: undefined;
};

export type CalendarStackNavProps<
	T extends keyof CalendarStackNavigationParamList,
> = StackScreenProps<CalendarStackNavigationParamList, T>;

export type DrawerNavProps<T extends keyof TabNavigationParamList> =
	DrawerScreenProps<TabNavigationParamList, T>;

export type LoginStackNavProps<T extends keyof LoginStackNavigationParamList> =
	DrawerScreenProps<LoginStackNavigationParamList, T>;

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends CalendarStackNavigationParamList,
				TabNavigationParamList {}
	}
}

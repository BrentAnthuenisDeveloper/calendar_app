interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	time: Date;
	endTime: Date;
}
interface Calendar {
	id: string;
	AccountId: string;
	Events: CalendarEvent[];
}
interface Account {
	id: string;
	displayName: string;
	email: string;
}
export { CalendarEvent, Calendar };

interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	time: string; // Stored as "YYYY-MM-DDTHH:MM"
	endTime?: string;
}
export default CalendarEvent;

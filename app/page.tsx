import Image from "next/image";
import CalendarView from "./_components/calendar";
import { events as rawEvents } from "@/utils/data";
import moment from "moment-timezone";

const processEvents = (events: any[]) => {
  return events.map(event => {
    const reservationArray = event.reservation.split(",");
    const startHour = parseInt(reservationArray[0].split(" ")[0]);
    const endHour = parseInt(reservationArray[reservationArray.length - 1].split(" ")[0]);

    // Use moment-timezone to set the time in the Philippines timezone (Asia/Manila)
    const timezone = 'Asia/Manila';
    const localStartTime = moment.tz(event.start, timezone).set({ hour: startHour, minute: 0, second: 0 });
    const localEndTime = moment.tz(event.start, timezone).set({ hour: endHour, minute: 0, second: 0 });

    // Format times as local time strings
    const startTimeFormatted = localStartTime.format('h:mm A');
    const endTimeFormatted = localEndTime.format('h:mm A');

    // Update the title to include reservation time
    const updatedTitle = `${startTimeFormatted} ${event.title}`;

    return {
      ...event,
      title: updatedTitle, // Updated title with reservation time
    };
  });
};

export default function Home() {
  const events = processEvents(rawEvents);

  return (
    <div className="lg:container">
      <CalendarView calendarEvents={events} />
    </div>
  );
}

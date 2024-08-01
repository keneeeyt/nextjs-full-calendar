import Image from "next/image";
import CalendarView from "./_components/calendar";


export default function Home() {
  const events: any[] = [];
  return (
    <div>
      <CalendarView   calendarEvents={events}  />
    </div>
  );
}

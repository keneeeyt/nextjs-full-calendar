"use client";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { Button } from "@/components/ui/button";
import MoreEvents from "./more-events-sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  title: string;
  start: string;
  color: string;
  reservation: string;
  name: string;
  phone: string;
  no_of_schedule: string;
}

interface CalendarViewProps {
  calendarEvents: Event[];
  // addNewEvent: (date?: Date) => void;
  // openDayDetail: (detail: { filteredEvents: Event[]; title: string }) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ calendarEvents }) => {
  const today = moment().startOf("day");
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    moment().startOf("month")
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [currMonth, setCurrMonth] = useState(() =>
    moment(today).format("MMM-yyyy")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [moreEvents, setMoreEvents] = useState<any[]>([]);
  const [moreEventsTitle, setMoreEventsTitle] = useState("");

  useEffect(() => {
    setEvents(calendarEvents);
  }, [calendarEvents]);

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf("week");
    let end = moment(firstDayOfMonth).endOf("month").endOf("week");
    let days = [];
    let day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  };

  const getEventsForCurrentDate = (date: Date) => {
    let filteredEvents = events.filter((e) =>
      moment(date).isSame(moment(e.start), "day")
    );
    if (filteredEvents.length > 2) {
      let originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 2);
      filteredEvents.push({
        title: `${originalLength - 2} more`,
        color: "MORE",
        start: "",
        reservation: "",
        name: "",
        phone: "",
        no_of_schedule: "",
      });
    }
    return filteredEvents;
  };

  const openAllEventsDetail = (date: Date, theme: string) => {
    if (theme !== "MORE") return;
    let filteredEvents = events
      .filter((e) => moment(date).isSame(moment(e.start), "day"))
      .map((e) => ({ ...e }));
    setMoreEventsTitle(moment(date).format("D MMM YYYY"));
    setMoreEvents(filteredEvents);
    getMoreEvents(filteredEvents);
  };

  const getMoreEvents = (data: any) => {
    if (data) {
      setIsOpen(true);
    }
  };

  const onCloseMoreEvents = () => {
    setIsOpen(false);
    setMoreEvents([]);
  };

  const isToday = (date: Date) => {
    return moment(date).isSame(moment(), "day");
  };

  const isDifferentMonth = (date: Date) => {
    return moment(date).month() !== moment(firstDayOfMonth).month();
  };

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth)
      .add(-1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfPrevMonth);
    setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
  };

  const getCurrentMonth = () => {
    const firstDayOfCurrMonth = moment().startOf("month");
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = moment(firstDayOfMonth)
      .add(1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfNextMonth);
    setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
  };

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex justify-normal gap-2 sm:gap-4">
          <p className="font-semibold text-xl w-48">
            {moment(firstDayOfMonth).format("MMMM yyyy")}
          </p>

          <Button variant="secondary" onClick={getPrevMonth}>
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <Button variant="secondary" onClick={getCurrentMonth}>
            Current Month
          </Button>
          <Button variant="secondary" onClick={getNextMonth}>
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="my-4 divider" />
      <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
        {weekdays.map((day, key) => (
          <div className="text-xs capitalize" key={key}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-1 place-items-center">
        {allDaysInMonth().map((day, idx) => (
          <div
            key={idx}
            className={`${
              colStartClasses[moment(day).day()]
            } border border-solid w-full h-28`}
          >
            <p
              className={`inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${
                isToday(day) &&
                "bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"
              } ${
                isDifferentMonth(day) && "text-slate-400 dark:text-slate-600"
              }`}
              // onClick={() => addNewEvent(day)}
            >
              {moment(day).format("D")}
            </p>
            {getEventsForCurrentDate(day).map((e, k) => {
              let splitTime;
              if (e.reservation) {
                splitTime = e.reservation.split(",");
              }

              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p
                        key={k}
                        onClick={() => openAllEventsDetail(day, e.color)}
                        style={{ backgroundColor: e.color }}
                        className={`text-xs px-2 mt-1 truncate rounded-sm cursor-pointer`}
                      >
                        {e.title}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div
                       
                        className={`grid mt-3 card  rounded-box p-3 rounded-md`}
                      >
                        <div className="font-bold">{e.title}</div>
                        <div>
                          <p className="px-4 text-xs text-gray-700">{`${
                            splitTime && splitTime[0]
                          } - ${
                            splitTime && splitTime[splitTime.length - 1]
                          }`}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2 items-center mt-2">
                            <span className="text-xs font-medium">
                              Reserved by:
                            </span>{" "}
                            <p className="text-xs">{e.name}</p>
                          </div>
                          <div className="flex space-x-2 items-center mt-2">
                            <span className="text-xs font-medium">
                              Contact:
                            </span>{" "}
                            <p className="text-xs">{e.phone}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-700 font-semibold">
                            {e.no_of_schedule} people
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        ))}
      </div>
      <MoreEvents
        open={isOpen}
        onClose={onCloseMoreEvents}
        moreEvents={moreEvents}
        moreEventsTitle={moreEventsTitle}
      />
    </div>
  );
};

export default CalendarView;

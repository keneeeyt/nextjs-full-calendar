import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface MoreEventsProps {
  open: boolean;
  onClose: () => void;
  moreEvents: any[];
  moreEventsTitle: string;
}
const MoreEvents: React.FC<MoreEventsProps> = ({
  open,
  onClose,
  moreEvents,
  moreEventsTitle,
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{moreEventsTitle}</SheetTitle>
          <SheetDescription>
            This are the events for the selected date.
          </SheetDescription>
        </SheetHeader>
        {moreEvents.map((event, index) => {
          let splitTime;
          if (event.reservation) {
            splitTime = event.reservation.split(",");
          }
          return (
            <div
              key={index}
              style={{ backgroundColor: event.color }}
              className={`grid mt-3 card  rounded-box p-3 rounded-md`}
            >
              <div>{event.title}</div>
              <div>
                <p className="px-4 text-xs text-gray-700">{`${
                  splitTime && splitTime[0]
                } - ${splitTime && splitTime[splitTime.length - 1]}`}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center mt-2">
                  <span className="text-xs font-medium">Reserved by:</span>{" "}
                  <p className="text-xs">{event.name}</p>
                </div>
                <div className="flex space-x-2 items-center mt-2">
                  <span className="text-xs font-medium">Contact:</span>{" "}
                  <p className="text-xs">{event.phone}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-700 font-semibold">
                  {event.no_of_schedule} people
                </p>
              </div>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export default MoreEvents;

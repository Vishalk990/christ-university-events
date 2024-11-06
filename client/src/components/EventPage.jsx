import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import universityEventsData from "@/utils/universityEventsData";
import { logo1 } from "@/assets";
import BottomNavbar from "./BottomNavbar";
import {
  useFetchSheetData,
  useCurrentTime,
  useEventProgress,
  useBackgroundColor,
  useTodayEvents,
} from "../hooks/hooks";

const EventPage = () => {
  const colors = [
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const sheetData = useFetchSheetData();
  const currentTime = useCurrentTime();
  const bgColor = useBackgroundColor(colors);
  const { todayEvents, currentEvent } = useTodayEvents(
    universityEventsData.events
  );
  // const { todayEvents, currentEvent } = useTodayEvents(sheetData);
  const progress = useEventProgress(currentEvent);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  console.log(todayEvents);

  return (
    <div className="bg-gray-100 h-screen w-screen p-3 flex flex-col md:flex-row">
      {/* Left side - Current/Next event */}
      <div className="w-full md:w-2/3 md:pr-4 mb-4 md:mb-0">
        {currentEvent ? (
          <div
            className={`${bgColor} text-white rounded-xl p-4 h-full flex flex-col transition-colors duration-1000 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="w-1/3 pr-4">
                <img
                  src={logo1}
                  alt="logo"
                  className="w-full object-contain rounded-lg"
                />
              </div>
              <div className="text-lg md:text-2xl font-bold pr-4">
                {formatCurrentTime(currentTime)}
              </div>
            </div>

            <div className="flex-grow flex justify-center items-center py-8 md:py-12">
              <div className="w-full md:w-4/5 flex flex-col space-y-6 md:space-y-8">
                <div className="text-3xl md:text-5xl font-bold">
                  {currentEvent.name}
                </div>
                <div className="space-y-4">
                  <div className="text-xl md:text-2xl font-semibold">
                    Guests:
                  </div>

                  <div className="text-lg md:text-xl">
                    {currentEvent.purpose}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full md:w-5/6">
                  <div className="flex justify-between text-sm md:text-base mb-2">
                    <span>{currentEvent.start_time}</span>
                    <span>{currentEvent.end_time}</span>
                  </div>
                  <div className="bg-white/30 rounded-full h-3">
                    <div
                      className="bg-green-400 h-3 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto text-xs md:text-sm text-center text-white/80">
              Done by Vishal Kalita(2347264), Concept, Designed and Mentored By
              Dr. Ashok Immanuel V, Dept. of Computer Science
            </div>
          </div>
        ) : (
          <div
            className={`${bgColor} text-white rounded-lg p-6 h-full flex flex-col justify-center items-center transition-colors duration-1000 ease-in-out`}
          >
            <div className="text-2xl md:text-4xl font-bold">
              No events scheduled
            </div>
            <div className="mt-auto text-xs md:text-sm text-white/80">
              Done by Vishal Kalita(2347264), Concept, Designed and Mentored By
              Dr. Ashok Immanuel V
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/3 flex flex-col">
        {/* Video section */}
        <div className="flex-1 mb-4">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <video
                src={
                  "https://christuniversity.in/uploads/banners/1024049760_2024-08-13_11-45-46.mp4"
                }
                className="w-full h-48 md:h-full object-cover rounded-xl"
                autoPlay
                loop
                muted
              />
            </CardContent>
          </Card>
        </div>

        {/* Today's Events section */}
        <div className="flex-1 mb-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-xl md:text-3xl font-semibold">
                  Today's Events
                </div>
                <Calendar size={24} className="md:w-8 md:h-8" />
              </div>
            </CardContent>
          </Card>
          <Card
            className="overflow-auto"
            style={{ maxHeight: "calc(100% - 5rem)" }}
          >
            <CardContent className="p-4">
              {todayEvents.length > 0 ? (
                todayEvents.map((event, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold text-sm md:text-base">
                      {event.purpose}
                    </div>
                    <div className="flex justify-between text-xs md:text-sm text-gray-500">
                      <div>
                        {event.start_time} - {event.end_time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 text-sm md:text-base">
                  No events scheduled for today
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navbar */}
        <BottomNavbar />
      </div>
    </div>
  );
};

export default EventPage;

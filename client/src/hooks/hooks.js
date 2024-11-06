import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:3000";

// Hook to fetch data from Google Sheets API
export const useFetchSheetData = () => {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    async function fetchSheetData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sheet-data`);
        const data = await response.json();
        setSheetData(data);
      } catch (error) {
        console.error('Error fetching sheet data:', error);
      }
    }

    fetchSheetData();
  }, []);

  return sheetData;
};

// Hook to update the current time every second
export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return currentTime;
};

// Hook to calculate and update progress for the current event
export const useEventProgress = (currentEvent) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentEvent) {
      const updateProgress = () => {
        const now = new Date();
        const start = new Date(`${currentEvent.event_date} ${currentEvent.start_time}`);
        const end = new Date(`${currentEvent.event_date} ${currentEvent.end_time}`);
        const totalDuration = end - start;
        const elapsed = now - start;
        setProgress(Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)));
      };

      updateProgress();
      const intervalId = setInterval(updateProgress, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentEvent]);

  return progress;
};

// Hook to cycle background color every 5 seconds
export const useBackgroundColor = (colors) => {
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [colors]);

  return bgColor;
};

// Hook to get today's events and find the current or next event
export const useTodayEvents = (events) => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = now.toLocaleDateString("en-US");

    // Filter events to include only today's events that have not ended yet
    const todaysEvents = events.filter(event => {
      const endTime = new Date(`${event.event_date} ${event.end_time}`);
      return event.event_date === today && endTime > now;
    });
    setTodayEvents(todaysEvents);

    // Find the current or next event that has not ended
    const currentOrNextEvent = todaysEvents.find(event => {
      const endTime = new Date(`${event.event_date} ${event.end_time}`);
      return endTime > now;
    });

    setCurrentEvent(currentOrNextEvent);
  }, [events]);

  return { todayEvents, currentEvent };
};


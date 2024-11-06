import { Card, CardContent } from "./ui/card";
import { Calendar, Home, Info } from "lucide-react";

const BottomNavbar = () => {
  return (
    <div className="h-16">
      <Card>
        <CardContent className="p-2">
          <div className="flex justify-around items-center h-full">
            <button className="flex flex-col items-center">
              <Calendar size={20} className="md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs mt-1">Schedule</span>
            </button>
            <button className="flex flex-col items-center">
              <Home size={20} className="md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center">
              <Info size={20} className="md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs mt-1">About</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BottomNavbar;

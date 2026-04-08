import { useState } from "react";
import { format} from "date-fns";
import Day from "./Day";
import Notes from "./Notes";
import "../styles/global.css";
import { generateCalendar, isSameDay } from "../utils/dateUtils";
import { addMonths, subMonths } from "date-fns";
import { isToday } from "date-fns";
export default function Calendar() {
  const specialDates: Record<string, string> = {
  "2026-01-01": "🎉",   // New Year
  "2026-01-26": "🇮🇳",   // Republic Day
  "2026-02-14": "❤️",   // Valentine’s Day
  "2026-03-08": "🌸",   // Women's Day
  "2026-03-21": "🌍",   // Earth Day (approx awareness)
  "2026-04-01": "😂",   // April Fool
  "2026-05-01": "👷",   // Labour Day
  "2026-06-05": "🌱",   // Environment Day
  "2026-07-07": "🎂",   // Example Birthday
  "2026-08-15": "🇮🇳",   // Independence Day
  "2026-08-29": "🏅",   // National Sports Day
  "2026-09-05": "📚",   // Teachers Day
  "2026-10-02": "🕊",   // Gandhi Jayanti
  "2026-10-31": "🎃",   // Halloween
  "2026-11-14": "👶",   // Children's Day
  "2026-12-25": "🎄",   // Christmas
  "2026-12-31": "🥳"    // New Year Eve
};
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const days = generateCalendar(currentDate);

  const handleClick = (day: Date) => {
  setSelectedDate(format(day, "yyyy-MM-dd"));

  if (!isRangeMode) {
    // Normal mode → just select single date
    setStartDate(day);
    setEndDate(null);
    return;
  }

  // Range mode logic
  if (!startDate) {
    setStartDate(day);
    return;
  }

  if (startDate && !endDate) {
    if (day < startDate) {
      setEndDate(startDate);
      setStartDate(day);
    } else {
      setEndDate(day);
    }
    return;
  }

  // Reset
  setStartDate(day);
  setEndDate(null);
};
const month = currentDate.getMonth();
const handleToggleRange = () => {
  if (isRangeMode) {
    // Turning OFF → clear everything
    setStartDate(null);
    setEndDate(null);
  }
  setIsRangeMode(!isRangeMode);
};
const themeColors = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D",
  "#845EC2", "#00C9A7", "#FF9671", "#0081CF",
  "#C34A36", "#FF8066", "#D65DB1", "#2C73D2"
];

const themeColor = themeColors[month];
    
return (
  <div className="calendar-container">
<div className="edge-nav left" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
  ◀
</div>

<div className="edge-nav right" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
  ▶
</div>
    {/* HERO IMAGE */}
    <div className="hero">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="calendar"
      />
      <div className="overlay">
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
      </div>
    </div>
 <div className="weekdays">
      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
        <div key={d}>{d}</div>
      ))}
    </div>
    {/* CALENDAR GRID */}
    
    <div className="calendar">
      {days.map((day, i) => {

        let selected = false;
        let inRange = false;
const dateKey = format(day, "yyyy-MM-dd");
const emoji = specialDates[dateKey];
const today = isToday(day);
const weekIndex = Math.floor(i / 7);
const isStart =
  isRangeMode && startDate && isSameDay(day, startDate);

const isEnd =
  isRangeMode && endDate && isSameDay(day, endDate);
        if (startDate && endDate) {
          const start = startDate < endDate ? startDate : endDate;
          const end = startDate > endDate ? startDate : endDate;
          inRange = day >= start && day <= end;
        }

        if (startDate && isSameDay(day, startDate)) selected = true;
        if (endDate && isSameDay(day, endDate)) selected = true;

        return (
          <Day
            key={i}
            day={day}
            onClick={handleClick}
            isSelected={selected}
            isInRange={inRange}
              isToday={today}   // ✅ HERE
              isStart={isStart}     // ✅ ADD
  isEnd={isEnd}   
    emoji={emoji}   // ✅ ADD THIS


          />
          
        );
      })}
    </div>
<div className="range-toggle">
<button onClick={handleToggleRange}>
  {isRangeMode ? "Disable Range" : "Enable Range Selection"}
</button>
</div>
    {/* NOTES */}
    <Notes selectedDate={selectedDate} />

  </div>
);
}
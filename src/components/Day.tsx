import { format } from "date-fns";

type Props = {
  day: Date;
  onClick: (day: Date) => void;
  isSelected: boolean;
  isInRange: boolean;
  isToday?: boolean;   // ✅ ADD THIS
   isStart?: boolean;   // ✅ ADD
  isEnd?: boolean; 
  emoji?: string;
};

export default function Day({ day, onClick, isSelected, isInRange, isToday,isStart,isEnd,emoji }: Props) {

  return (
    <div
  className={`day 
    ${isSelected ? "selected" : ""} 
    ${isInRange ? "range" : ""}
    ${isToday ? "today" : ""}
  `}
  onClick={() => onClick(day)}
>
      {format(day, "d")}
       {isStart && <span className="tag start">S</span>}
  {isEnd && <span className="tag end">E</span>}
  {emoji && <div className="emoji">{emoji}</div>}
    </div>
  );
}
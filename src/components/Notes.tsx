import { useState, useEffect } from "react";

type Props = {
  selectedDate: string | null;
};

export default function Notes({ selectedDate }: Props) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!selectedDate) return;
    const saved = localStorage.getItem(selectedDate);
    setNote(saved || "");
  }, [selectedDate]);

  const handleSave = () => {
    if (selectedDate) {
      localStorage.setItem(selectedDate, note);
    }
  };

return (
  <div className="notes-card">
    
    <div className="notes-header">
      <h3>📝 Notes</h3>
      <span>
        {selectedDate ? selectedDate : "Select a date"}
      </span>
    </div>

    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Write your thoughts, reminders, or plans..."
    />

    <div className="notes-actions">
      <button className="save" onClick={handleSave}>
        Save
      </button>

      <button
        className="clear"
        onClick={() => {
          if (selectedDate) {
            localStorage.removeItem(selectedDate);
            setNote("");
          }
        }}
      >
        Clear
      </button>
    </div>

  </div>
);
}
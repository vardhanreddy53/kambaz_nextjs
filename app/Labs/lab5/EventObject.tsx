import { useState } from "react";
import React from "react";

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventCopy = {
      ...e,
      target: e.currentTarget.outerHTML,
    };
    const { view, ...eventWithoutView } = eventCopy as Record<string, unknown>;
    setEvent(eventWithoutView);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
  );
}
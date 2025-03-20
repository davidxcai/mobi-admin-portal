import { formatDate } from "../../utils/tableUtils";
import { useSelector } from "react-redux";

const headers = [
  "Event Name",
  "Event ID",
  "Attendance",
  "Location",
  "Date-Time Start",
  "Date-Time End",
  "Momo Coins",
];

// Renders table headers dynamically
const renderTableHeaders = (headers: string[]) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th key={header}>{header}</th>
      ))}
    </tr>
  </thead>
);

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard:", text);
      alert("Copied to clipboard!");
    })
    .catch((err) => console.error("Failed to copy text:", err));
};

const renderTableBody = (rows: any[]) => (
  <tbody>
    {rows.map((event, eventIndex) => (
      <tr key={eventIndex}>
        <td>{event.eventName}</td>
        <td
          onClick={() => copyToClipboard(event.eventId)}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {event.eventId}
        </td>
        <td>{event.attendance}</td>
        <td>{event.location}</td>
        <td>{formatDate(event.time.start)}</td>
        <td>{formatDate(event.time.end)}</td>
        <td>{event.momocoins}</td>
      </tr>
    ))}
  </tbody>
);

const currentSemesterAndYear = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (month >= 0 && month <= 5) {
    return `Spring ${year}`;
  } else if (month >= 6 && month <= 11) {
    return `Fall ${year}`;
  }
};

// Main table component
const EventTable = () => {
  const events = useSelector((state: any) => state.events?.data);

  console.log("events", events);

  if (!events || events.length === 0) {
    return <p>{`No events available for ${currentSemesterAndYear()}.`}</p>;
  }

  return (
    <table>
      {renderTableHeaders(headers)}
      {renderTableBody(events)}
    </table>
  );
};

export default EventTable;

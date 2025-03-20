import Badge from "react-bootstrap/Badge";
import { formatDate } from "../../utils/tableUtils";
import { useSelector } from "react-redux";

const headers = ["Name", "Event ID", "Check-in Time", "Momo Coins"];

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

const renderTableBody = (rows: any[]) => (
  <tbody>
    {rows.map((checkin, checkinIndex) => (
      <tr
        key={checkinIndex}
        // className={checkin?.newMember ? "table-success" : ""}
      >
        <td>
          {checkin.name?.firstName} {checkin.name?.lastName}{" "}
          {checkin?.newMember ? <Badge bg="info">New Member</Badge> : ""}
        </td>
        <td>{checkin.eventId}</td>
        <td>{formatDate(checkin.timestamp)}</td>
        <td>{checkin.momocoins}</td>
      </tr>
    ))}
  </tbody>
);

// Main table component
const CheckInTable = () => {
  const checkins = useSelector((state: any) => state.checkin?.data);
  const currentEvent = useSelector(
    (state: any) => state.events.currentEvent?.eventName
  );

  if (!currentEvent) {
    return <p>No current event set.</p>;
  }

  if (!checkins || checkins.length === 0) {
    return <p>{`No check-in data available for ${currentEvent}.`}</p>;
  }

  console.log("Checkins", checkins);

  return (
    <table>
      {renderTableHeaders(headers)}
      {renderTableBody(checkins)}
    </table>
  );
};

export default CheckInTable;

import Table from "react-bootstrap/Table";
import { flattenObject, formatHeader, formatDate } from "../utils/tableUtils";

interface DynamicTableProps {
  data: any[];
}

// Renders table headers dynamically
const renderTableHeaders = (headers: string[]) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th key={header}>{formatHeader(header)}</th>
      ))}
    </tr>
  </thead>
);

// Renders table body dynamically
const renderTableBody = (data: any[], headers: string[]) => (
  <tbody>
    {data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header) => (
          <td key={header}>
            {typeof row[header] === "string" &&
            row[header].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
              ? formatDate(row[header]) // Format date if detected
              : (row[header] ?? "N/A")}{" "}
            {/* Handle undefined values */}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

// Main table component
const DynamicTable = ({ data }: DynamicTableProps) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const flattenedData = data.map((item) => flattenObject(item)); // Flatten objects
  const headers = Object.keys(flattenedData[0]); // Extract headers dynamically

  return (
    <Table striped bordered hover>
      {renderTableHeaders(headers)}
      {renderTableBody(flattenedData, headers)}
    </Table>
  );
};

export default DynamicTable;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const DATA = [
  {
    name: "Los Electricos",
    location: "Suipacha 300",
    rating: "5",
    opening_time: "6 PM",
    closing_time: "11 PM",
    menu: "www.google.com", // TODO: Trigger an edge function that download the menu and scrape the data, then update a new column named menu_data
  },
];

const COLUMNS = ["Name", "Location", "Rating", "Working Hours", "Menu"];

export function TopTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((colName, i) => (
            <TableHead
              key={colName}
              className={cn({
                "w-[200px]": i === 0,
                "text-right": i === COLUMNS.length - 1,
              })}
            >
              {colName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {DATA.map((business) => (
          <TableRow key={business.name}>
            <TableCell className="font-medium">{business.name}</TableCell>
            <TableCell>{business.location}</TableCell>
            <TableCell>{business.rating}</TableCell>
            <TableCell>
              {business.opening_time} - {business.closing_time}
            </TableCell>
            <TableCell className="text-right">{business.menu}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

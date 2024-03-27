import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Database } from "@/types/global";

const COLUMNS = ["Name", "Location", "Rating", "Working Hours", "Menu"];

interface TopTableProps {
  data: Database["public"]["Tables"]["food_places"]["Row"][];
}

export function TopTable({ data }: TopTableProps) {
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
        {data.map((business) => (
          <TableRow key={business.name}>
            <TableCell className="font-medium">{business.name}</TableCell>
            <TableCell>{business.location}</TableCell>
            <TableCell>{business.score ?? 0}</TableCell>
            <TableCell>
              {business.opening_time} - {business.closing_time}
            </TableCell>
            <TableCell className="text-right">{business.menu ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

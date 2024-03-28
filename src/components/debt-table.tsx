import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const COLUMNS = ["Nombre", "Deuda", "Pagado"];

const ROWS = [
  { name: "Juan", debt: 900, paid: true },
  { name: "Pedro", debt: 900, paid: true },
  { name: "Diego", debt: 700, paid: false },
];

export const DebtTable = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-bold">Deudas de la semana anterior</div>
      <div className="overflow-hidden rounded border shadow">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((colName, i) => (
                <TableHead
                  key={colName}
                  className={cn("bg-slate-200 text-black", {
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
            {ROWS.map((p) => (
              <TableRow key={p.name}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>${p.debt}</TableCell>
                <TableCell className="text-right">
                  {p.paid ? "SI" : "NO"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Falta Pagar:</TableCell>
              <TableCell className="text-right">$700.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Deuda Total:</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

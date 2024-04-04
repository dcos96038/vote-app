import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils/globals";
import { Database } from "@/types/supabase";

const COLUMNS = ["Nombre", "Ubicación", "Horarios", "Menú"];

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
							className={cn("bg-slate-700/50", {
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
				{data.length > 0 ? (
					data.map((business) => (
						<TableRow key={business.name}>
							<TableCell className="font-medium">{business.name}</TableCell>
							<TableCell>{business.location}</TableCell>
							<TableCell>
								{business.opening_time} - {business.closing_time}
							</TableCell>
							<TableCell className="text-right">
								{business.menu ?? "-"}
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={COLUMNS.length} className="text-center">
							No hay locales disponibles
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

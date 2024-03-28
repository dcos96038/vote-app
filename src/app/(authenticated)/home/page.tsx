import { DebtTable } from "@/components/debt-table";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex-1">
        <div className="text-4xl font-bold">Voterino App</div>
        <div className="text-lg text-muted-foreground">
          Vota y propone lugares para comer culiao!
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
          <div className="text-xl font-bold">Lugar de esta semana:</div>
          <div className="text-end text-lg text-muted-foreground">
            Los Electricos - Suipacha 300
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
          <div className="text-xl font-bold">Putuación:</div>
          {/* <div className="text-end text-3xl font-medium">4.5/5</div> */}
          <div className="text-lg text-muted-foreground">
            Este lugar todavía no tiene votos
          </div>
        </div>
      </div>

      <DebtTable />
    </div>
  );
}

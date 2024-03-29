import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ProposePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <h1 className="text-center text-4xl font-bold">Crear una propuesta</h1>
      <Input placeholder="Nombre del local" type="text" />
      <Input placeholder="Ubicación" type="text" />
      <Input placeholder="Link del menú" type="text" />
      <div className="flex gap-8">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="opening">Horario de apertura</label>
          <input
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background"
            type="time"
            id="opening"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="closing">Horario de cierre</label>
          <input
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background"
            type="time"
            id="closing"
          />
        </div>
      </div>
      <Button>Proponer!</Button>
    </div>
  );
}

export default ProposePage;

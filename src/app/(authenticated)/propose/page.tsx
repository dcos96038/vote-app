"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { createFoodPlaceProposal } from "@/actions/food-places";
import { Input } from "@/components/ui/input";

import { SubmitButton } from "./submit-button";

const initialState: {
  message: string | null;
  success: boolean;
} = {
  message: null,
  success: false,
};

function ProposePage() {
  const [state, formAction] = useFormState(
    createFoodPlaceProposal,
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="mx-auto flex max-w-2xl flex-col gap-8">
      <h1 className="text-center text-4xl font-bold">Proponé un lugar</h1>
      <Input required name="name" placeholder="Nombre del local" type="text" />
      <Input required name="location" placeholder="Ubicación" type="text" />
      <Input name="menu-link" placeholder="Link del menú" type="text" />
      <div className="flex gap-8">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="opening">Horario de apertura</label>
          <input
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background"
            type="time"
            id="opening"
            name="opening-time"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="closing">Horario de cierre</label>
          <input
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm ring-offset-background"
            type="time"
            id="closing"
            name="closing-time"
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

export default ProposePage;

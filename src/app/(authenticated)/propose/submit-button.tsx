"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const formStatus = useFormStatus();

  return (
    <Button
      disabled={formStatus.pending}
      aria-disabled={formStatus.pending}
      type="submit"
      className="flex items-center justify-center gap-2 leading-none"
    >
      Proponer!
      {formStatus.pending ? <Spinner /> : null}
    </Button>
  );
};

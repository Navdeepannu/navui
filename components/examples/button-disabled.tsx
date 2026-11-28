"use client";

import { useId } from "react";
import { Button } from "@/registry/components/button";

export default function ButtonDisabled() {
  const hintId = useId();

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-2">
      <Button disabled aria-describedby={hintId}>Add member</Button>
      <p id={hintId} className="text-sm text-muted-foreground">
        Enter an email address to enable invitations.
      </p>
    </div>
  );
}

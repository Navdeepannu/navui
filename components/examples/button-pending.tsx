"use client";

import { useState } from "react";
import { LoaderCircleIcon, SaveIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

export default function ButtonPending() {
  const [message, setMessage] = useState("");

  async function save() {
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMessage("Draft saved.");
  }

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-2">
      <Button onClick={save} pendingAnnouncement="Saving draft">
        {({ pending }) => (
          <>
            {pending ? (
              <LoaderCircleIcon className="motion-safe:animate-spin" aria-hidden="true" />
            ) : (
              <SaveIcon aria-hidden="true" />
            )}
            Save draft
          </>
        )}
      </Button>
      <p role="status" className="min-h-5 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

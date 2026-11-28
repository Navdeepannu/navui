"use client";

import { useRef, useState } from "react";
import { LoaderCircleIcon, RotateCcwIcon, SaveIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

export default function ButtonAsync() {
  const attempts = useRef(0);
  const [feedback, setFeedback] = useState("");

  async function saveChanges() {
    setFeedback("");
    const attempt = ++attempts.current;
    await new Promise((resolve) => setTimeout(resolve, 1400));

    if (attempt === 1) {
      setFeedback("Connection lost. Select Save changes to retry.");
      throw new Error("Connection lost");
    }

    setFeedback("Changes saved.");
  }

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-2">
      <Button onClick={saveChanges} pendingAnnouncement="Saving changes">
        {({ pending, error }) => (
          <>
            {pending ? (
              <LoaderCircleIcon className="motion-safe:animate-spin" aria-hidden="true" />
            ) : error ? (
              <RotateCcwIcon aria-hidden="true" />
            ) : (
              <SaveIcon aria-hidden="true" />
            )}
            Save changes
          </>
        )}
      </Button>
      <p role="status" className="min-h-5 text-sm leading-5 text-muted-foreground">
        {feedback}
      </p>
    </div>
  );
}

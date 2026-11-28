"use client";

import { useState } from "react";
import { Button } from "@/registry/components/button";
import { Field, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function ButtonForm() {
  const [feedback, setFeedback] = useState("");

  return (
    <form
      aria-label="Rename project"
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const project = new FormData(event.currentTarget).get("project");
        if (typeof project === "string") setFeedback(`Project name updated to “${project}”.`);
      }}
      onReset={() => setFeedback("")}
    >
      <Field name="project">
        <FieldLabel>Project name</FieldLabel>
        <Input defaultValue="Launch dashboard" required />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save changes</Button>
        <Button type="reset" variant="outline">Reset name</Button>
      </div>
      <p role="status" className="min-h-5 wrap-anywhere text-sm text-muted-foreground">
        {feedback}
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/registry/components/button";
import { Field, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function InputAction() {
  const [projectName, setProjectName] = useState("Launch dashboard");

  return (
    <form
      aria-label="Rename project"
      className="grid w-full max-w-sm gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const name = new FormData(event.currentTarget).get("project");
        if (typeof name === "string") setProjectName(name);
      }}
    >
      <Field name="project">
        <FieldLabel>Project name</FieldLabel>
        <div className="flex items-start gap-2">
          <Input defaultValue="Launch dashboard" required />
          <Button type="submit">Rename</Button>
        </div>
      </Field>
      <p role="status" className="text-sm text-muted-foreground">
        Current name: {projectName}
      </p>
    </form>
  );
}

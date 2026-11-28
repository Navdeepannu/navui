"use client";

import { Field, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function RequiredField() {
  return (
    <Field name="workspace" className="w-full max-w-sm">
      <FieldLabel>
        Workspace name
        <span aria-hidden="true" className="ms-1 text-muted-foreground">(required)</span>
      </FieldLabel>
      <Input required placeholder="e.g. Northstar Studio" />
    </Field>
  );
}

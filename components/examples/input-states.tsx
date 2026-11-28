"use client";

import { Field, FieldGroup, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function InputStates() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field disabled>
        <FieldLabel>Organization (disabled)</FieldLabel>
        <Input defaultValue="Northstar Studio" />
      </Field>
      <Field>
        <FieldLabel>Workspace ID (read-only)</FieldLabel>
        <Input readOnly value="workspace-108" />
      </Field>
    </FieldGroup>
  );
}

"use client";

import { Field, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function LabelledInput() {
  return (
    <Field name="displayName" className="w-full max-w-sm">
      <FieldLabel>Display name</FieldLabel>
      <Input autoComplete="nickname" placeholder="Alex Morgan" />
    </Field>
  );
}

"use client";

import { Field, FieldGroup, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function InputTypes() {
  return (
    <FieldGroup className="w-full max-w-sm sm:grid sm:max-w-lg sm:grid-cols-2">
      <Field name="email">
        <FieldLabel>Email address</FieldLabel>
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
      </Field>
      <Field name="site">
        <FieldLabel>Website</FieldLabel>
        <Input type="url" autoComplete="url" placeholder="https://example.com" />
      </Field>
      <Field name="phone">
        <FieldLabel>Phone number</FieldLabel>
        <Input type="tel" autoComplete="tel" placeholder="+1 555 0100" />
      </Field>
      <Field name="seats">
        <FieldLabel>Seats</FieldLabel>
        <Input type="number" min={1} max={50} defaultValue="3" />
      </Field>
    </FieldGroup>
  );
}

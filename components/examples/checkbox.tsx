"use client";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Field,
  FieldLabel,
} from "@/registry/components/field";
export default function Example() {
  return (
    <Field className="flex-row items-center gap-3 p-6">
      <Checkbox />
      <FieldLabel>Deployment notifications</FieldLabel>
    </Field>
  );
}

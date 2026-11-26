"use client";
import { Switch } from "@/registry/components/switch";
import {
  Field,
  FieldLabel,
} from "@/registry/components/field";
export default function Example() {
  return (
    <Field className="flex-row items-center gap-3 p-6">
      <Switch />
      <FieldLabel>Preview deployments</FieldLabel>
    </Field>
  );
}

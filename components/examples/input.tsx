"use client";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/registry/components/field";
import { Input } from "@/registry/components/input";
export default function Example() {
  return (
    <Field className="w-full max-w-sm p-6" name="input-email">
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>Used for project updates.</FieldDescription>
    </Field>
  );
}

"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/registry/components/field";
import { Input } from "@/registry/components/input";
export default function FieldPreview() {
  return (
    <Field className="w-full max-w-sm" name="contact">
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" autoComplete="email" placeholder="you@example.com" />
      <FieldDescription>We’ll send project updates to this address.</FieldDescription>
    </Field>
  );
}

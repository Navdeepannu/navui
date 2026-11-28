"use client";

import { Button } from "@/registry/components/button";
import { Field, FieldError, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

export default function FieldValidation() {
  return (
    <form
      aria-label="Validate a contact email"
      className="grid w-full max-w-sm gap-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field name="contactEmail">
        <FieldLabel>Contact email</FieldLabel>
        <Input type="email" required defaultValue="alex@" />
        <FieldError match="valueMissing">Enter a contact email.</FieldError>
        <FieldError match="typeMismatch">Enter a complete email address.</FieldError>
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Validate</Button>
        <Button type="reset" variant="outline">Reset</Button>
      </div>
    </form>
  );
}

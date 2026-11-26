"use client";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/registry/components/field";
import { Input } from "@/registry/components/input";
import { Button } from "@/registry/components/button";
export default function Example() {
  return (
    <form
      className="w-full max-w-sm p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <FieldGroup>
        <Field name="email">
          <FieldLabel>Contact email (required)</FieldLabel>
          <Input type="email" required placeholder="you@example.com" />
          <FieldDescription>
            Enter an address for deployment reports.
          </FieldDescription>
          <FieldError match="valueMissing">Enter a contact email.</FieldError>
          <FieldError match="typeMismatch">
            Use an address like you@example.com.
          </FieldError>
        </Field>
        <Field>
          <FieldLabel>Workspace ID</FieldLabel>
          <Input readOnly value="workspace-108" />
          <FieldDescription>This identifier is read only.</FieldDescription>
        </Field>
        <Field disabled>
          <FieldLabel>Organization name</FieldLabel>
          <Input defaultValue="NavUI community" />
          <FieldDescription>Managed by your organization.</FieldDescription>
        </Field>
        <div className="flex gap-3">
          <Button type="submit">Validate</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

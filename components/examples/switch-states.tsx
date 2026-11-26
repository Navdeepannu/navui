"use client";
import { Switch } from "@/registry/components/switch";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/registry/components/field";
import { Button } from "@/registry/components/button";
export default function Example() {
  return (
    <form
      className="w-full max-w-sm p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <FieldGroup>
        <Field name="preference" className="flex-row items-start gap-3">
          <Switch className="mt-0.5" required value="enabled" />
          <div className="flex flex-col gap-1">
            <FieldLabel>Preview deployments (required)</FieldLabel>
            <FieldDescription>
              Enable this preference before continuing with the example.
            </FieldDescription>
            <FieldError match="valueMissing">
              Enable this preference to continue.
            </FieldError>
          </div>
        </Field>
        <Field disabled className="flex-row items-center gap-3">
          <Switch defaultChecked />
          <FieldLabel>Organization policy (managed)</FieldLabel>
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

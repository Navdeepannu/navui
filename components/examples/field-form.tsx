"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/components/button";
import {
  Field, FieldDescription, FieldError, FieldGroup, FieldLabel,
} from "@/registry/components/field";
import { Input } from "@/registry/components/input";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectItemIndicator,
  SelectTrigger, SelectValue,
} from "@/registry/components/select";

const frequencies = ["Weekly", "Monthly"];

export default function ReportSettingsForm() {
  const [feedback, setFeedback] = useState("");

  return (
    <form
      aria-label="Report settings"
      className="w-full max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { project, email, frequency } = Object.fromEntries(data);
        setFeedback(`${frequency} reports for “${project}” are set to go to ${email} in this preview.`);
      }}
      onReset={() => setFeedback("")}
    >
      <FieldGroup>
        <Field name="project">
          <FieldLabel>Project name</FieldLabel>
          <Input required defaultValue="Launch dashboard" />
          <FieldError match="valueMissing">Enter a project name.</FieldError>
        </Field>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]">
          <Field name="email">
            <FieldLabel>Report email</FieldLabel>
            <Input type="email" autoComplete="email" required placeholder="you@example.com" />
            <FieldDescription>Activity reports go to this address.</FieldDescription>
            <FieldError match="valueMissing">Enter a report email.</FieldError>
            <FieldError match="typeMismatch">Enter a complete email address.</FieldError>
          </Field>
          <Field name="frequency">
            <FieldLabel>Frequency</FieldLabel>
            <Select items={frequencies} defaultValue="Weekly">
              <SelectTrigger>
                <SelectValue />
                <ChevronDownIcon aria-hidden="true" />
              </SelectTrigger>
              <SelectContent sideOffset={4}>
                <SelectGroup>
                  {frequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                      <SelectItemIndicator><CheckIcon aria-hidden="true" /></SelectItemIndicator>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save settings</Button>
          <Button type="reset" variant="outline">Reset</Button>
        </div>
        <p role="status" className="min-h-5 wrap-anywhere text-sm text-muted-foreground">
          {feedback}
        </p>
      </FieldGroup>
    </form>
  );
}

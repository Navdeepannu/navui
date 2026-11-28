"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
} from "@/registry/components/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/registry/components/field";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/components/button";
const options = [
  {
    value: "team",
    label: "Design and engineering workspace with a long descriptive name",
  },
  {
    value: "managed",
    label: "Managed workspace (unavailable)",
    disabled: true,
  },
  ...Array.from({ length: 18 }, (_, i) => ({
    value: `project-${i + 1}`,
    label: `Project ${i + 1}`,
  })),
];
const formats = ["CSV", "JSON", "PDF"];

export default function Example() {
  return (
    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field name="workspace">
          <FieldLabel>Workspace</FieldLabel>
          <Select items={options} defaultValue={null}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a workspace" />
              <ChevronDownIcon aria-hidden="true" />
            </SelectTrigger>
            <SelectContent sideOffset={4}>
              <SelectGroup>
                {options.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={"disabled" in item && item.disabled}
                  >
                    {item.label}
                    <SelectItemIndicator>
                      <CheckIcon aria-hidden="true" />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>Managed workspaces are unavailable for export.</FieldDescription>
        </Field>
        <Field name="formats">
          <FieldLabel>Report formats</FieldLabel>
          <Select multiple items={formats} defaultValue={["CSV"]}>
            <SelectTrigger>
              <SelectValue placeholder="Choose formats" />
              <ChevronDownIcon aria-hidden="true" />
            </SelectTrigger>
            <SelectContent sideOffset={4}>
              <SelectGroup>
                {formats.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                    <SelectItemIndicator>
                      <CheckIcon aria-hidden="true" />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>Choose one or more formats for your export.</FieldDescription>
        </Field>
        <Button type="reset" variant="outline" className="self-start">
          Reset selections
        </Button>
      </FieldGroup>
    </form>
  );
}

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
export default function Example() {
  return (
    <form className="w-full max-w-sm p-6">
      <Field className="mb-6">
        <FieldLabel>Workspace</FieldLabel>
        <Select items={options} name="workspace" defaultValue={null}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a workspace" />
            <ChevronDownIcon aria-hidden="true" />
          </SelectTrigger>
          <SelectContent sideOffset={6}>
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
        <FieldDescription>
          Long options wrap. Arrow navigation skips the managed workspace.
        </FieldDescription>
      </Field>
      <Field className="mb-6">
        <FieldLabel>Report formats</FieldLabel>
        <Select
          multiple
          name="formats"
          items={["CSV", "JSON", "PDF"]}
          defaultValue={["CSV"]}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose formats" />
            <ChevronDownIcon aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["CSV", "JSON", "PDF"].map((value) => (
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
        <FieldDescription>
          Multiple selections submit separate values under one name.
        </FieldDescription>
      </Field>
      <Button type="reset" variant="outline">
        Reset selections
      </Button>
    </form>
  );
}

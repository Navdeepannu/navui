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
} from "@/registry/components/field";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
const regions = ["Canada", "Europe", "United States"];
export default function Example() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Region</FieldLabel>
      <Select items={regions} defaultValue="Canada">
        <SelectTrigger>
          <SelectValue />
          <ChevronDownIcon aria-hidden="true" />
        </SelectTrigger>
        <SelectContent sideOffset={6}>
          <SelectGroup>
            {regions.map((value) => (
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
    </Field>
  );
}

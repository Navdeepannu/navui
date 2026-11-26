"use client";

import { useState } from "react";
import { Button } from "@ui-sdk/react/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@ui-sdk/react/field";
import { Input } from "@ui-sdk/react/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";
import { Switch, SwitchThumb } from "@ui-sdk/react/switch";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

const regions = ["Canada", "Europe", "United States"];
const initialValues = {
  projectName: "My project",
  region: "Canada",
  previewDeployments: false,
};

export default function ProjectSettingsPage() {
  const [projectName, setProjectName] = useState(initialValues.projectName);
  const [region, setRegion] = useState<string | null>(initialValues.region);
  const [previewDeployments, setPreviewDeployments] = useState(
    initialValues.previewDeployments,
  );

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-8 px-5 py-24 text-foreground sm:px-6 sm:py-28">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Project settings
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Update your project preferences. Changes stay in this session.
        </p>
      </header>

      <form
        aria-label="Project settings"
        className="flex flex-col gap-6"
        onSubmit={(event) => event.preventDefault()}
        onReset={(event) => {
          event.preventDefault();
          setProjectName(initialValues.projectName);
          setRegion(initialValues.region);
          setPreviewDeployments(initialValues.previewDeployments);
        }}
      >
        <FieldGroup className="flex flex-col gap-6">
          <Field name="projectName" className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium">Project name</FieldLabel>
            <Input
              value={projectName}
              onValueChange={setProjectName}
              className="h-11 w-full min-w-0 rounded-md border border-muted-foreground bg-background px-3 text-base shadow-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm"
            />
          </Field>

          <Field name="region" className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium">Region</FieldLabel>
            <Select items={regions} value={region} onValueChange={setRegion}>
              <SelectTrigger className="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-muted-foreground bg-background px-3 text-sm shadow-xs outline-none hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <SelectValue />
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
              </SelectTrigger>
              <SelectContent
                sideOffset={6}
                className="max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
              >
                {regions.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="flex min-h-11 cursor-default items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium"
                  >
                    {item}
                    <SelectItemIndicator>
                      <CheckIcon aria-hidden="true" className="size-4" />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field
            name="previewDeployments"
            className="flex items-center justify-between gap-5"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <FieldLabel className="text-sm font-medium">
                Preview deployments
              </FieldLabel>
              <FieldDescription className="text-sm leading-6 text-muted-foreground">
                Enable previews for project changes.
              </FieldDescription>
            </div>
            <Switch
              checked={previewDeployments}
              onCheckedChange={setPreviewDeployments}
              className="group relative inline-flex h-11 w-12 shrink-0 items-center rounded-md outline-none before:absolute before:h-6 before:w-12 before:rounded-full before:bg-muted-foreground before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:before:bg-primary"
            >
              <SwitchThumb className="relative pointer-events-none ms-1 block size-4 rounded-full bg-background motion-safe:transition-transform group-data-checked:translate-x-6 rtl:group-data-checked:-translate-x-6" />
            </Switch>
          </Field>
        </FieldGroup>

        <Button
          type="reset"
          className="inline-flex min-h-11 items-center justify-center self-start rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-xs outline-none hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:bg-muted"
        >
          Reset
        </Button>
      </form>

      <section
        aria-labelledby="current-values-heading"
        className="flex flex-col gap-4 border-t border-border pt-6"
      >
        <h2 id="current-values-heading" className="text-sm font-semibold">
          Current values
        </h2>
        <dl className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-[1fr_1fr]">
          <dt className="text-muted-foreground">Project name</dt>
          <dd className="min-w-0 wrap-anywhere sm:text-end">
            {projectName || "—"}
          </dd>
          <dt className="text-muted-foreground">Region</dt>
          <dd className="sm:text-end">{region ?? "None selected"}</dd>
          <dt className="text-muted-foreground">Preview deployments</dt>
          <dd className="sm:text-end">{previewDeployments ? "On" : "Off"}</dd>
        </dl>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/registry/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/components/field";
import { Input } from "@/registry/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { Checkbox } from "@/registry/components/checkbox";
import { Switch } from "@/registry/components/switch";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

const regions = ["Canada", "Europe", "United States"];
const initial = {
  projectName: "My project",
  region: "Canada",
  previewDeployments: false,
  notifications: true,
};

export default function ProjectSettingsPage() {
  const [projectName, setProjectName] = useState(initial.projectName);
  const [region, setRegion] = useState<string | null>(initial.region);
  const [previewDeployments, setPreviewDeployments] = useState(
    initial.previewDeployments,
  );
  const [notifications, setNotifications] = useState(initial.notifications);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<[string, string][] | null>(null);
  const [feedback, setFeedback] = useState("");
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-8 px-5 py-24 text-foreground sm:px-6 sm:py-28">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Project settings
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Try the NavUI form collection. Changes stay in this session.
        </p>
      </header>
      <form
        aria-label="Project settings"
        className="flex flex-col gap-6"
        onInvalidCapture={(event) => {
          if (event.target === event.currentTarget.querySelector(":invalid")) {
            (event.target as HTMLElement)
              .closest('[data-slot="field"]')
              ?.scrollIntoView({ block: "center" });
          }
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (!projectName.trim()) {
            setError(
              "Enter a project name with at least one non-space character.",
            );
            setFeedback("Check the project name.");
            event.currentTarget
              .querySelector<HTMLInputElement>('input[name="projectName"]')
              ?.focus();
            return;
          }
          setError("");
          setSubmitted(
            Array.from(new FormData(event.currentTarget), ([key, value]) => [
              key,
              String(value),
            ]),
          );
          setFeedback("Settings submitted locally. No data was sent.");
        }}
        onReset={() => {
          setProjectName(initial.projectName);
          setRegion(initial.region);
          setPreviewDeployments(initial.previewDeployments);
          setNotifications(initial.notifications);
          setError("");
          setSubmitted(null);
          setFeedback(
            "Initial values restored. Submit again to inspect their FormData.",
          );
        }}
      >
        <FieldGroup>
          <Field name="projectName" invalid={error ? true : undefined}>
            <FieldLabel>
              Project name <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              required
              value={projectName}
              onValueChange={(value) => {
                setProjectName(value);
                setError("");
              }}
              autoComplete="off"
            />
            <FieldDescription>
              A short name your team will recognize.
            </FieldDescription>
            <FieldError match="valueMissing">Enter a project name.</FieldError>
            {error && <FieldError match>{error}</FieldError>}
          </Field>
          <Field name="region">
            <FieldLabel>
              Region <span aria-hidden="true">*</span>
            </FieldLabel>
            <Select
              items={regions}
              required
              value={region}
              onValueChange={setRegion}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a region" />
                <ChevronDownIcon aria-hidden="true" />
              </SelectTrigger>
              <SelectContent sideOffset={6}>
                <SelectGroup>
                  {regions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                      <SelectItemIndicator>
                        <CheckIcon aria-hidden="true" />
                      </SelectItemIndicator>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>
              Choose where your project is hosted.
            </FieldDescription>
            <FieldError match="valueMissing">Choose a region.</FieldError>
          </Field>
          <Field
            name="previewDeployments"
            className="flex-row items-center justify-between gap-5"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <FieldLabel>Preview deployments</FieldLabel>
              <FieldDescription>
                Enable previews for project changes.
              </FieldDescription>
            </div>
            <Switch
              value="enabled"
              checked={previewDeployments}
              onCheckedChange={setPreviewDeployments}
            />
          </Field>
          <Field name="notifications" className="flex-row items-start gap-3">
            <Checkbox
              className="mt-0.5"
              value="enabled"
              checked={notifications}
              onCheckedChange={(next) => setNotifications(next === true)}
            />
            <div className="flex min-w-0 flex-col gap-1">
              <FieldLabel>Deployment notifications</FieldLabel>
              <FieldDescription>
                Include this preference when submitting settings.
              </FieldDescription>
            </div>
          </Field>
        </FieldGroup>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save settings</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
        <p role="status" className="text-sm text-muted-foreground">
          {feedback}
        </p>
      </form>
      <section
        aria-labelledby="current-values-heading"
        className="flex flex-col gap-3 border-t pt-6"
      >
        <h2 id="current-values-heading" className="text-sm font-semibold">
          Current React state
        </h2>
        <pre className="whitespace-pre-wrap wrap-anywhere rounded-md bg-muted p-4 text-xs leading-6">
          {JSON.stringify(
            { projectName, region, previewDeployments, notifications },
            null,
            2,
          )}
        </pre>
      </section>
      <section
        aria-labelledby="submitted-values-heading"
        className="flex flex-col gap-3 border-t pt-6"
      >
        <h2 id="submitted-values-heading" className="text-sm font-semibold">
          Submitted FormData
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Unchecked controls are omitted by native form rules. Reset clears the
          last submission.
        </p>
        <pre className="whitespace-pre-wrap wrap-anywhere rounded-md bg-muted p-4 text-xs leading-6">
          {submitted ? JSON.stringify(submitted, null, 2) : "Not submitted"}
        </pre>
      </section>
    </main>
  );
}

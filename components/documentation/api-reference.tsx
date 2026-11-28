import type { ComponentCatalogEntry } from "@/registry/types";
import { getComponentDocumentationPolicy } from "./component-documentation-policy";
import { requiredProps } from "./component-content";

type ApiProp = ComponentCatalogEntry["api"][number];

function PropsTable({
  title,
  props,
  required,
}: {
  title: string;
  props: readonly ApiProp[];
  required: readonly string[];
}) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${title} properties`}
      className="min-w-0 outline-none focus-visible:outline-2 focus-visible:outline-ring"
    >
      <table className="w-full table-fixed text-start text-sm leading-5">
        <caption className="sr-only">{title} properties</caption>
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[34%]" />
          <col className="w-[19%]" />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            {["Prop", "Type", "Default", "Description"].map((label) => (
              <th
                key={label}
                scope="col"
                className="px-1.5 py-2 text-start font-medium first:ps-0 last:pe-0 sm:px-3"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.prop} className="border-b align-top">
              <th scope="row" className="py-3 pe-1.5 text-start font-normal sm:pe-3">
                <code className="font-mono text-xs wrap-anywhere">
                  {prop.prop}
                </code>
                {required.includes(prop.prop) && (
                  <span className="mt-1 block text-[11px] font-medium text-muted-foreground">
                    Required
                  </span>
                )}
              </th>
              <td className="px-1.5 py-3 sm:px-3">
                <code className="font-mono text-xs wrap-anywhere text-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="px-1.5 py-3 sm:px-3">
                <code className="font-mono text-xs wrap-anywhere text-muted-foreground">
                  {prop.default === "-" ? "—" : prop.default}
                </code>
              </td>
              <td className="py-3 ps-1.5 wrap-anywhere text-muted-foreground sm:ps-3">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApiReference({ item }: { item: ComponentCatalogEntry }) {
  const policy = getComponentDocumentationPolicy(item);
  const props = item.api.filter((prop) => {
    if (policy.ownership !== "custom")
      return policy.includeProps?.includes(prop.prop) ?? false;
    return !policy.excludeProps?.includes(prop.prop);
  });
  const groups = props.some((prop) => /^[A-Z]/.test(prop.prop))
    ? [
        { title: "Component parts", props: props.filter((prop) => /^[A-Z]/.test(prop.prop)) },
        { title: "Properties", props: props.filter((prop) => !/^[A-Z]/.test(prop.prop)) },
      ].filter((group) => group.props.length > 0)
    : props.length > 0
      ? [{ title: item.title, props }]
      : [];

  if (!policy.summary && groups.length === 0) return null;

  return (
    <section
      aria-labelledby="props-heading"
      className="flex min-w-0 flex-col gap-4"
    >
      <h2 id="props-heading" className="text-xl font-semibold tracking-tight">
        API reference
      </h2>
      <p className="text-sm leading-6 text-muted-foreground">
        {policy.summary}{" "}
        {policy.uiSdkUrl && (
          <>
            See the{" "}
            <a
              href={policy.uiSdkUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4"
            >
              UI SDK {policy.uiSdkLabel ?? item.title} documentation
            </a>
            {" "}for the complete inherited API.
          </>
        )}
      </p>
      {groups.map((group) => (
        <div key={group.title} className="flex min-w-0 flex-col gap-3">
          {groups.length > 1 && (
            <h3 className="font-mono text-sm font-medium">{group.title}</h3>
          )}
          <PropsTable
            title={group.title}
            props={group.props}
            required={requiredProps[item.slug] ?? []}
          />
        </div>
      ))}
    </section>
  );
}

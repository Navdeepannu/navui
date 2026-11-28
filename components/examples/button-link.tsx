import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

export default function ButtonLink() {
  return (
    <Button
      variant="link"
      render={<a href="https://ui-sdk.dev/docs/react/components/button" />}
    >
      Read the UI SDK docs <ArrowUpRightIcon aria-hidden="true" />
    </Button>
  );
}

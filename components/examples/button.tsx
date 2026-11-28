import { PlusIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

export default function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>
        <PlusIcon aria-hidden="true" /> Add member
      </Button>
      <Button variant="outline">Manage access</Button>
    </div>
  );
}

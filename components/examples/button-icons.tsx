import { DownloadIcon, SearchIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

export default function ButtonIcons() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-medium">Reports</p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Search reports">
          <SearchIcon aria-hidden="true" />
        </Button>
        <Button>
          <DownloadIcon aria-hidden="true" /> Export CSV
        </Button>
      </div>
    </div>
  );
}

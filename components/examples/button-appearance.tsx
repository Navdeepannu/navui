import { Button } from "@/registry/components/button";

export default function ButtonAppearance() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <p className="text-sm font-medium">Publish article</p>
        <div className="flex flex-wrap gap-2">
          <Button>Publish</Button>
          <Button variant="secondary">Save draft</Button>
          <Button variant="outline">Preview</Button>
        </div>
      </div>
      <div className="grid gap-2 border-t border-border pt-4">
        <p className="text-sm font-medium">Discard draft</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete draft</Button>
        </div>
      </div>
    </div>
  );
}

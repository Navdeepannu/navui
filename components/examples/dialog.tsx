"use client";
import {
  Dialog,
  DialogTrigger,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/registry/components/dialog";
export default function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger className="min-h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        Review project
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent className="flex flex-col gap-4">
        <DialogTitle>Project details</DialogTitle>
        <DialogDescription>
          Review the project before continuing. This example stays local.
        </DialogDescription>
        <p className="text-sm leading-6">
          Keyboard focus stays inside the dialog. Escape or either action
          returns focus to the trigger.
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <DialogClose className="min-h-10 rounded-md border border-input px-4 text-sm outline-none focus-visible:outline-2 focus-visible:outline-ring">
            Cancel
          </DialogClose>
          <DialogClose className="min-h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground outline-none focus-visible:outline-2 focus-visible:outline-ring">
            Done
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

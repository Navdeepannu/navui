"use client";

// Copyright (c) 2026 Navdeep Singh. MIT license; see LICENSE.
import * as React from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "cn";
import {
  Dialog,
  DialogTrigger,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";

const CardContext = React.createContext<string | null>(null);
function useCardId() {
  const id = React.useContext(CardContext);
  if (!id) throw new Error("ExpandableCard parts need an ExpandableCard root.");
  return id;
}
function ExpandableCard({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) {
  const id = React.useId();
  return (
    <CardContext.Provider value={id}>
      <Dialog {...props}>
        <LayoutGroup id={id}>{children}</LayoutGroup>
      </Dialog>
    </CardContext.Provider>
  );
}
function ExpandableCardTrigger({
  className,
  render,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const id = useCardId();
  const reduce = useReducedMotion();
  return (
    <DialogTrigger
      {...props}
      render={
        render ?? (
          <motion.button
            layoutId={reduce ? undefined : `${id}-card`}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          />
        )
      }
      className={(state) =>
        cn(
          "group/expandable-card block w-full max-w-80 overflow-hidden rounded-xl border border-border bg-background text-start text-foreground shadow-sm outline-none hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
function ExpandableCardMedia({
  className,
  ...props
}: React.ComponentProps<typeof motion.span>) {
  const id = useCardId();
  const reduce = useReducedMotion();
  return (
    <motion.span
      {...props}
      layoutId={reduce ? undefined : `${id}-media`}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={cn("block overflow-hidden", className)}
    />
  );
}
export type ExpandableCardContentProps = React.ComponentProps<
  typeof DialogContent
> & {
  showCloseButton?: boolean;
  closeLabel?: string;
  overlayClassName?: string;
};
function ExpandableCardContent({
  children,
  className,
  render,
  showCloseButton = true,
  closeLabel = "Close",
  overlayClassName,
  ...props
}: ExpandableCardContentProps) {
  const id = useCardId();
  const reduce = useReducedMotion();
  return (
    <>
      <DialogBackdrop className={overlayClassName} />
      <DialogContent
        {...props}
        render={
          render ?? (
            <motion.div
              layoutId={reduce ? undefined : `${id}-card`}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            />
          )
        }
        className={(state) =>
          cn(
            "max-w-3xl p-0",
            typeof className === "function" ? className(state) : className,
          )
        }
      >
        {(state) => (
          <>
            {typeof children === "function" ? children(state) : children}
            {showCloseButton && (
              <DialogClose
                aria-label={closeLabel}
                className="absolute end-4 top-4 grid size-10 place-items-center rounded-full border bg-background text-foreground shadow-sm outline-none hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <XIcon aria-hidden="true" className="size-4" />
              </DialogClose>
            )}
          </>
        )}
      </DialogContent>
    </>
  );
}
const ExpandableCardClose = DialogClose;

function ExpandableCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="expandable-card-header"
      className={cn("flex flex-col gap-3 p-6", className)}
      {...props}
    />
  );
}

function ExpandableCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      data-slot="expandable-card-title"
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ExpandableCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      data-slot="expandable-card-description"
      className={cn(
        "max-w-2xl text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ExpandableCardBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="expandable-card-body"
      className={cn("px-6 pb-6", className)}
      {...props}
    />
  );
}

function ExpandableCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="expandable-card-footer"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardClose,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableCardMedia,
  ExpandableCardTitle,
  ExpandableCardTrigger,
};

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "cn";

export function ScrollNavigation({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const nativeTimeline = CSS.supports("animation-timeline", "scroll()");
    function update() {
      if (!element) return;
      // Native timelines can retain their last mask after resizing away overflow.
      element.dataset.overflow = String(
        element.scrollHeight > element.clientHeight + 1,
      );
      if (nativeTimeline) return;
      const remaining =
        element.scrollHeight - element.clientHeight - element.scrollTop;
      element.style.setProperty(
        "--scroll-fade-t",
        element.scrollTop > 1 ? "16px" : "0px",
      );
      element.style.setProperty(
        "--scroll-fade-b",
        remaining > 1 ? "16px" : "0px",
      );
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (content.current) observer.observe(content.current);
    if (!nativeTimeline)
      element.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <div
      ref={viewport}
      data-library-scroll=""
      className={cn(
        "library-scroll scroll-fade scroll-fade-4 min-h-0 overflow-y-auto overscroll-contain px-5 py-12 [--scroll-fade-reveal:24px]",
        className,
      )}
    >
      <div ref={content}>{children}</div>
    </div>
  );
}

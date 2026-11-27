"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RailNav, type RailNavItem } from "@/registry/components/rail-nav";

type Heading = {
  id: string;
  title: string;
  depth: number;
  element: HTMLElement;
};

function getScrollRoot(content: HTMLElement): HTMLElement | null {
  for (
    let parent = content.parentElement;
    parent;
    parent = parent.parentElement
  ) {
    const { overflowY } = getComputedStyle(parent);
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }
  }

  return null;
}

function cssPixels(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function OnThisPage({ contentId }: { contentId: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  const [visibleValues, setVisibleValues] = useState<string[]>([]);
  const pendingTargetRef = useRef<HTMLElement | null>(null);
  const settledTargetRef = useRef<HTMLElement | null>(null);

  const updateActive = useCallback((next: string) => {
    setActive((current) => (current === next ? current : next));
  }, []);

  useEffect(() => {
    const content = document.getElementById(contentId);
    if (!content) return;
    const contentRoot = content;

    let elements: HTMLElement[] = [];
    let headingsChanged = true;
    let updateFrame = 0;
    let motionFrame = 0;
    const pendingTarget = pendingTargetRef;
    let hadScroll = false;
    let stableFrames = 0;
    let previousPosition = 0;
    const root = getScrollRoot(content);
    const resizeObserver = new ResizeObserver(() => scheduleUpdate());

    function position() {
      return root ? root.scrollTop : window.scrollY;
    }

    function scrollLimit() {
      return root
        ? Math.max(0, root.scrollHeight - root.clientHeight)
        : Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          );
    }

    function activationLine(element: HTMLElement) {
      const scrollContainer = root ?? document.documentElement;
      const containerStyles = getComputedStyle(scrollContainer);
      const headingStyles = getComputedStyle(element);
      const offset =
        cssPixels(containerStyles.scrollPaddingBlockStart) +
        cssPixels(headingStyles.scrollMarginBlockStart);
      const rootTop = root
        ? root.getBoundingClientRect().top + root.clientTop
        : 0;
      return rootTop + (offset || 96);
    }

    function isTargetSettled(target: HTMLElement) {
      const line = activationLine(target);
      const top = target.getBoundingClientRect().top;
      const atBottom = scrollLimit() > 1 && position() >= scrollLimit() - 1;
      return top <= line + 1 || (atBottom && top > line);
    }

    function releaseNavigation() {
      const target = pendingTarget.current;
      if (target) {
        const targetTop = target.getBoundingClientRect().top;
        const bottomClamped =
          position() >= scrollLimit() - 1 && scrollLimit() > 1;
        settledTargetRef.current =
          bottomClamped && targetTop > activationLine(target) ? target : null;
      }
      pendingTarget.current = null;
      hadScroll = false;
      stableFrames = 0;
      if (motionFrame) cancelAnimationFrame(motionFrame);
      motionFrame = 0;
      scheduleUpdate();
    }

    function checkScrollEnd() {
      motionFrame = 0;
      if (!pendingTarget.current || !hadScroll) return;
      const currentPosition = position();
      if (Math.abs(currentPosition - previousPosition) < 0.5) stableFrames += 1;
      else stableFrames = 0;
      previousPosition = currentPosition;
      if (stableFrames >= 3) {
        releaseNavigation();
        return;
      }
      motionFrame = requestAnimationFrame(checkScrollEnd);
    }

    function handleScroll() {
      if (!pendingTarget.current) settledTargetRef.current = null;
      if (pendingTarget.current) {
        hadScroll = true;
        previousPosition = position();
        stableFrames = 0;
        if (!motionFrame) motionFrame = requestAnimationFrame(checkScrollEnd);
      }
      scheduleUpdate();
    }

    function navigateToHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = elements.find((element) => element.id === id);
      if (!target) {
        pendingTarget.current = null;
        settledTargetRef.current = null;
        scheduleUpdate();
        return;
      }
      if (pendingTarget.current !== target) {
        hadScroll = false;
        stableFrames = 0;
        if (motionFrame) cancelAnimationFrame(motionFrame);
        motionFrame = 0;
      }
      settledTargetRef.current = null;
      pendingTarget.current = target;
      updateActive(target.id);
      requestAnimationFrame(() => {
        if (
          pendingTarget.current === target &&
          isTargetSettled(target) &&
          !hadScroll
        )
          releaseNavigation();
      });
    }

    function updateHeadings() {
      headingsChanged = false;
      const nextElements = Array.from(
        contentRoot.querySelectorAll<HTMLElement>(
          "h2[id],h3[id],h4[id],h5[id],h6[id]",
        ),
      );
      elements = nextElements;
      nextElements.forEach((element) => resizeObserver.observe(element));
      setHeadings((current) => {
        const next = nextElements.map((element) => ({
          id: element.id,
          title: element.textContent?.trim() ?? "",
          depth: Math.max(0, Number(element.tagName.slice(1)) - 2),
          element,
        }));
        return current.length === next.length &&
          current.every(
            (heading, index) =>
              heading.id === next[index]?.id &&
              heading.title === next[index]?.title &&
              heading.depth === next[index]?.depth,
          )
          ? current
          : next;
      });
    }

    function update() {
      updateFrame = 0;
      if (headingsChanged) updateHeadings();
      const viewportTop = root
        ? Math.max(
            activationLine(elements[0] ?? contentRoot),
            root.getBoundingClientRect().top,
          )
        : elements[0]
          ? activationLine(elements[0])
          : 96;
      const viewportBottom = root
        ? Math.min(window.innerHeight, root.getBoundingClientRect().bottom)
        : window.innerHeight;
      const contentBottom = contentRoot.getBoundingClientRect().bottom;
      const nextVisible = elements.flatMap((element, index) => {
        const top = element.getBoundingClientRect().top;
        const next = elements[index + 1];
        const bottom = next ? next.getBoundingClientRect().top : contentBottom;
        return top < viewportBottom && bottom > viewportTop
          ? [`#${encodeURIComponent(element.id)}`]
          : [];
      });
      setVisibleValues((current) =>
        current.length === nextVisible.length &&
        current.every((value, index) => value === nextVisible[index])
          ? current
          : nextVisible,
      );
      if (pendingTarget.current) {
        updateActive(pendingTarget.current.id);
        return;
      }
      if (settledTargetRef.current) {
        updateActive(settledTargetRef.current.id);
        return;
      }

      let current = elements[0]?.id ?? "";
      const line = elements[0] ? activationLine(elements[0]) : 96;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) current = element.id;
      }
      updateActive(current);
    }

    function scheduleUpdate() {
      if (!updateFrame) updateFrame = requestAnimationFrame(update);
    }

    function interruptNavigation() {
      if (pendingTarget.current) {
        pendingTarget.current = null;
        settledTargetRef.current = null;
        hadScroll = false;
        if (motionFrame) cancelAnimationFrame(motionFrame);
        motionFrame = 0;
        scheduleUpdate();
      } else if (settledTargetRef.current) {
        settledTargetRef.current = null;
        scheduleUpdate();
      }
    }

    const mutations = new MutationObserver(() => {
      headingsChanged = true;
      scheduleUpdate();
    });
    mutations.observe(contentRoot, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["id"],
    });
    resizeObserver.observe(contentRoot);
    const scrollTarget: Window | HTMLElement = root ?? window;
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    scrollTarget.addEventListener("scrollend", releaseNavigation);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", navigateToHash);
    window.addEventListener("popstate", navigateToHash);
    window.addEventListener("wheel", interruptNavigation, { passive: true });
    window.addEventListener("touchstart", interruptNavigation, {
      passive: true,
    });
    window.addEventListener("pointerdown", interruptNavigation, {
      passive: true,
    });
    window.addEventListener("keydown", interruptNavigation);

    scheduleUpdate();
    if (window.location.hash) requestAnimationFrame(navigateToHash);

    return () => {
      if (updateFrame) cancelAnimationFrame(updateFrame);
      if (motionFrame) cancelAnimationFrame(motionFrame);
      resizeObserver.disconnect();
      mutations.disconnect();
      scrollTarget.removeEventListener("scroll", handleScroll);
      scrollTarget.removeEventListener("scrollend", releaseNavigation);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", navigateToHash);
      window.removeEventListener("popstate", navigateToHash);
      window.removeEventListener("wheel", interruptNavigation);
      window.removeEventListener("touchstart", interruptNavigation);
      window.removeEventListener("pointerdown", interruptNavigation);
      window.removeEventListener("keydown", interruptNavigation);
    };
  }, [contentId, updateActive]);

  if (headings.length < 2) return null;

  const items: RailNavItem[] = headings.map((heading) => ({
    label: heading.title,
    href: `#${encodeURIComponent(heading.id)}`,
    depth: heading.depth,
    onClick: (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      settledTargetRef.current = null;
      pendingTargetRef.current = heading.element;
      updateActive(heading.id);
    },
  }));

  return (
    <RailNav
      data-toc=""
      items={items}
      value={active ? `#${encodeURIComponent(active)}` : ""}
      visibleValues={visibleValues}
      trackActive={false}
      label="On this page"
      touchToggle
      className="sticky top-[40%] hidden max-h-[calc(100dvh-8rem)] min-w-0 self-start overflow-visible pb-4 md:block"
    />
  );
}

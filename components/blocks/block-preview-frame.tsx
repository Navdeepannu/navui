"use client";

import { useEffect, useRef, useState } from "react";

import {
  BLOCK_PREVIEW_CHROME_PX,
  BLOCK_PREVIEW_MIN_HEIGHT_PX,
  clampBlockPreviewHeight,
  isBlockPreviewHeightPayload,
} from "@/components/blocks/block-preview-height";

export type BlockPreviewWidth = "full" | 768 | 390;

type BlockPreviewFrameProps = {
  blockId: string;
  previewPath: string;
  reloadKey: number;
  title: string;
  width: BlockPreviewWidth;
  minimumHeight?: number;
};

export function BlockPreviewFrame({
  blockId,
  previewPath,
  reloadKey,
  title,
  width,
  minimumHeight = BLOCK_PREVIEW_MIN_HEIGHT_PX,
}: BlockPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(minimumHeight);

  function measureLoadedPreview() {
    const previewRoot = iframeRef.current?.contentDocument?.querySelector(
      "[data-block-preview-root]",
    );
    const contentHeight =
      previewRoot?.scrollHeight ??
      iframeRef.current?.contentDocument?.documentElement.scrollHeight;

    if (contentHeight && contentHeight > 0) {
      setFrameHeight(clampBlockPreviewHeight(contentHeight, minimumHeight));
    }
  }

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isBlockPreviewHeightPayload(event.data)) return;
      if (event.data.blockId !== blockId) return;

      setFrameHeight(clampBlockPreviewHeight(event.data.height, minimumHeight));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [blockId, minimumHeight]);

  const frameWidth = width === "full" ? "100%" : `min(100%, ${width}px)`;
  const iframeHeight = Math.max(frameHeight - BLOCK_PREVIEW_CHROME_PX, 1);

  return (
    <div
      className="mx-auto max-w-full overflow-hidden rounded-xl ring-1 ring-border/70 transition-[width,height] duration-200 ease-out motion-reduce:transition-none"
      style={{ width: frameWidth, height: frameHeight }}
    >
      <iframe
        ref={iframeRef}
        key={`${blockId}-${reloadKey}`}
        src={previewPath}
        title={`${title} preview`}
        loading="lazy"
        className="block w-full rounded-lg border-0 bg-background"
        style={{ height: iframeHeight }}
        onLoad={measureLoadedPreview}
      />
    </div>
  );
}

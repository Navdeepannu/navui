"use client";

import { useEffect } from "react";

import { BLOCK_PREVIEW_HEIGHT_MESSAGE } from "@/components/blocks/block-preview-height";

type BlockPreviewResizeReporterProps = {
  blockId: string;
};

export function BlockPreviewResizeReporter({
  blockId,
}: BlockPreviewResizeReporterProps) {
  useEffect(() => {
    if (window.self === window.top) return;

    const previewRoot = document.querySelector<HTMLElement>(
      "[data-block-preview-root]",
    );

    const reportHeight = () => {
      const height = Math.ceil(
        previewRoot?.scrollHeight ?? document.documentElement.scrollHeight,
      );

      if (height <= 0) return;

      window.parent.postMessage(
        { type: BLOCK_PREVIEW_HEIGHT_MESSAGE, blockId, height },
        window.location.origin,
      );
    };

    reportHeight();

    const resizeObserver = new ResizeObserver(reportHeight);
    if (previewRoot) resizeObserver.observe(previewRoot);
    resizeObserver.observe(document.documentElement);

    const mutationObserver = new MutationObserver(reportHeight);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("load", reportHeight);
    window.addEventListener("resize", reportHeight);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("load", reportHeight);
      window.removeEventListener("resize", reportHeight);
    };
  }, [blockId]);

  return null;
}

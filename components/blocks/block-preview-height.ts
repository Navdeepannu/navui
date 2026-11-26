export const BLOCK_PREVIEW_HEIGHT_MESSAGE = "navui-block-preview-height";
export const BLOCK_PREVIEW_CHROME_PX = 10;
export const BLOCK_PREVIEW_MIN_HEIGHT_PX = 560;

export type BlockPreviewHeightPayload = {
  type: typeof BLOCK_PREVIEW_HEIGHT_MESSAGE;
  blockId: string;
  height: number;
};

export function clampBlockPreviewHeight(contentHeight: number) {
  return Math.max(
    Math.ceil(contentHeight) + BLOCK_PREVIEW_CHROME_PX,
    BLOCK_PREVIEW_MIN_HEIGHT_PX,
  );
}

export function isBlockPreviewHeightPayload(
  data: unknown,
): data is BlockPreviewHeightPayload {
  if (!data || typeof data !== "object") return false;

  const payload = data as Partial<BlockPreviewHeightPayload>;

  return (
    payload.type === BLOCK_PREVIEW_HEIGHT_MESSAGE &&
    typeof payload.blockId === "string" &&
    typeof payload.height === "number" &&
    Number.isFinite(payload.height) &&
    payload.height > 0
  );
}

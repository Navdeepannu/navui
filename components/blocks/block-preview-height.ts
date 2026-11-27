export const BLOCK_PREVIEW_HEIGHT_MESSAGE = "navui-block-preview-height";
export const BLOCK_PREVIEW_CHROME_PX = 10;
export const BLOCK_PREVIEW_MIN_HEIGHT_PX = 680;

export type BlockPreviewHeightPayload = {
  type: typeof BLOCK_PREVIEW_HEIGHT_MESSAGE;
  blockId: string;
  height: number;
};

export function clampBlockPreviewHeight(
  contentHeight: number,
  minimumHeight = BLOCK_PREVIEW_MIN_HEIGHT_PX,
) {
  return Math.max(
    Math.ceil(contentHeight) + BLOCK_PREVIEW_CHROME_PX,
    minimumHeight,
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

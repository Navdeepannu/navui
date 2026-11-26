"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type BlockPreviewBoundaryProps = {
  blockId: string;
  children: ReactNode;
};

type BlockPreviewBoundaryState = {
  error: Error | null;
};

export class BlockPreviewBoundary extends Component<
  BlockPreviewBoundaryProps,
  BlockPreviewBoundaryState
> {
  state: BlockPreviewBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BlockPreviewBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[block-preview:${this.props.blockId}]`,
      error,
      info.componentStack,
    );
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="mx-auto flex min-h-80 max-w-lg items-center px-6 py-16 text-sm text-muted-foreground">
        <div>
          <p className="font-medium text-foreground">Preview failed to render</p>
          <p className="mt-2">
            Block <code className="text-foreground">{this.props.blockId}</code>{" "}
            threw an error inside its isolated preview.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted/40 p-3 text-xs text-foreground/80">
            {this.state.error.message}
          </pre>
        </div>
      </div>
    );
  }
}

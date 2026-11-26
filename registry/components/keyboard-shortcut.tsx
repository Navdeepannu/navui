"use client";

// Copyright (c) 2026 Navdeep Singh. MIT license; see LICENSE.

import { useEffect, useRef, useState, type ReactNode } from "react";

import { matchesShortcut } from "@ui-sdk/core";

import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "cn";

export type KeyboardShortcutKey = {
  key: string;
  label?: ReactNode;
};

export type KeyboardShortcutProps = {
  keys: readonly KeyboardShortcutKey[];
  sound?: string;
  soundVolume?: number;
  onTrigger?: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  allowInEditable?: boolean;
  disabled?: boolean;
  className?: string;
  keyClassName?: string;
  pressedKeyClassName?: string;
  "aria-label"?: string;
};

const defaultKeyClassName =
  "transition-shadow duration-75 motion-reduce:transition-none";

const defaultPressedKeyClassName =
  "ring-1 ring-ring ring-offset-1 ring-offset-background";

function normalizeKey(key: string) {
  return key.toLowerCase();
}

export function KeyboardShortcut({
  keys,
  sound,
  soundVolume = 0.5,
  onTrigger,
  preventDefault = true,
  disabled = false,
  allowInEditable = false,
  className,
  keyClassName,
  pressedKeyClassName,
  "aria-label": ariaLabel,
}: KeyboardShortcutProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const pressedKeysRef = useRef<Set<string>>(new Set());
  const hasTriggeredRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!sound) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(sound);
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [sound]);

  useEffect(() => {
    if (disabled) return;

    const shortcutKeys = keys.map(({ key }) => normalizeKey(key));

    const playKeySound = () => {
      if (!audioRef.current) return;

      const audio = audioRef.current.cloneNode() as HTMLAudioElement;
      audio.volume = Math.min(1, Math.max(0, soundVolume));
      void audio.play().catch(() => {});
    };

    const modifiers: Record<
      string,
      keyof Pick<KeyboardEvent, "ctrlKey" | "metaKey" | "altKey" | "shiftKey">
    > = {
      control: "ctrlKey",
      meta: "metaKey",
      alt: "altKey",
      shift: "shiftKey",
    };
    const shortcut = shortcutKeys
      .map((key) => (key === "control" ? "ctrl" : key === " " ? "space" : key))
      .join("+");
    const ignored = (event: KeyboardEvent) =>
      event.isComposing ||
      event.keyCode === 229 ||
      event.defaultPrevented ||
      (!allowInEditable &&
        event
          .composedPath()
          .some(
            (node) =>
              node instanceof HTMLElement &&
              node.matches(
                'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
              ),
          ));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || ignored(event)) return;
      const currentKey = normalizeKey(event.key);
      const next = new Set(
        shortcutKeys.filter((key) =>
          modifiers[key] ? event[modifiers[key]] : key === currentKey,
        ),
      );
      pressedKeysRef.current = next;
      setPressedKeys(next);
      if (shortcutKeys.includes(currentKey)) playKeySound();
      if (
        keys.length &&
        matchesShortcut(event, shortcut) &&
        !hasTriggeredRef.current
      ) {
        if (preventDefault) event.preventDefault();
        hasTriggeredRef.current = true;
        onTrigger?.(event);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const next = new Set(
        [...pressedKeysRef.current].filter(
          (key) =>
            key !== normalizeKey(event.key) &&
            (!modifiers[key] || event[modifiers[key]]),
        ),
      );
      pressedKeysRef.current = next;
      setPressedKeys(next);
      hasTriggeredRef.current = false;
    };

    const resetPressedKeys = () => {
      pressedKeysRef.current = new Set();
      setPressedKeys(new Set());
      hasTriggeredRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", resetPressedKeys);

    return () => {
      resetPressedKeys();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", resetPressedKeys);
    };
  }, [disabled, keys, onTrigger, preventDefault, soundVolume, allowInEditable]);

  const accessibleLabel =
    ariaLabel ?? `Keyboard shortcut: ${keys.map(({ key }) => key).join(" + ")}`;

  return (
    <KbdGroup
      aria-label={accessibleLabel}
      aria-keyshortcuts={keys.map(({ key }) => key).join("+")}
      className={className}
    >
      {keys.map(({ key, label }, index) => {
        const normalizedKey = normalizeKey(key);
        const isPressed = !disabled && pressedKeys.has(normalizedKey);

        return (
          <Kbd
            key={`${normalizedKey}-${index}`}
            data-key={key}
            data-pressed={!disabled && isPressed}
            className={cn(
              defaultKeyClassName,
              keyClassName,
              isPressed && defaultPressedKeyClassName,
              isPressed && pressedKeyClassName,
            )}
          >
            {label ?? key}
          </Kbd>
        );
      })}
    </KbdGroup>
  );
}

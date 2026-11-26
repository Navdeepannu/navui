'use client'

// Copyright (c) 2026 Navdeep Singh. MIT license; see LICENSE.

import * as React from 'react'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@ui-sdk/react/toolbar'
import { motion, useReducedMotion } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { cn } from 'cn'

const segmentVariants = {
  default: 'bg-foreground text-background shadow-foreground/20',
  blue: 'bg-blue-600 text-white shadow-blue-600/25',
  purple: 'bg-violet-600 text-white shadow-violet-600/25',
  green: 'bg-emerald-600 text-white shadow-emerald-600/25',
  pink: 'bg-pink-600 text-white shadow-pink-600/25',
  teal: 'bg-teal-600 text-white shadow-teal-600/25',
  orange: 'bg-orange-500 text-white shadow-orange-500/25',
  red: 'bg-red-600 text-white shadow-red-600/25',
  yellow: 'bg-yellow-400 text-zinc-950 shadow-yellow-400/25',
} as const

type SegmentSpotlightVariant = keyof typeof segmentVariants
type SegmentSpotlightActivationMode = 'hover' | 'click'

type SegmentSpotlightContextValue = {
  activeValue: string | null
  activeTargets: ReadonlySet<string>
  activationMode: SegmentSpotlightActivationMode
  prefersReducedMotion: boolean
  setActiveValue: (value: string | null) => void
  registerTrigger: (value: string, targets: string[]) => () => void
}

const SegmentSpotlightContext = React.createContext<SegmentSpotlightContextValue | null>(null)

function useSegmentSpotlight() {
  const context = React.useContext(SegmentSpotlightContext)

  if (!context) {
    throw new Error('SegmentSpotlight components must be used within <SegmentSpotlight>.')
  }

  return context
}

type SegmentSpotlightProps = Omit<React.ComponentProps<'div'>, 'defaultValue'> & {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  activationMode?: SegmentSpotlightActivationMode
}

function SegmentSpotlight({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  activationMode = 'hover',
  className,
  children,
  ...props
}: SegmentSpotlightProps) {
  const prefersReducedMotion = useReducedMotion()
  const [targetsByValue, setTargetsByValue] = React.useState<Map<string, string[]>>(new Map())
  const [activeValue = null, setActiveValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const registerTrigger = React.useCallback((value: string, targets: string[]) => {
    setTargetsByValue((current) => {
      const next = new Map(current)
      next.set(value, targets)
      return next
    })

    return () => {
      setTargetsByValue((current) => {
        const next = new Map(current)
        next.delete(value)
        return next
      })
    }
  }, [])

  const activeTargets = React.useMemo(
    () => new Set(activeValue ? (targetsByValue.get(activeValue) ?? []) : []),
    [activeValue, targetsByValue],
  )

  return (
    <SegmentSpotlightContext.Provider
      value={{
        activeValue,
        activeTargets,
        activationMode,
        prefersReducedMotion: Boolean(prefersReducedMotion),
        setActiveValue,
        registerTrigger,
      }}
    >
      <div
        data-slot="segment-spotlight"
        data-state={activeValue ? 'active' : 'idle'}
        className={cn('relative w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SegmentSpotlightContext.Provider>
  )
}

function SegmentSpotlightViewport({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-viewport"
      className={cn('relative min-h-135 overflow-hidden bg-background', className)}
      {...props}
    />
  )
}

function SegmentSpotlightGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-grid"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:40px_40px] opacity-60',
        className,
      )}
      {...props}
    />
  )
}

type SegmentSpotlightSegmentProps = Omit<React.ComponentProps<typeof motion.div>, 'children'> & {
  value: string
  variant?: SegmentSpotlightVariant
  children?: React.ReactNode
}

function SegmentSpotlightSegment({
  value,
  variant = 'default',
  className,
  children,
  initial,
  animate,
  transition,
  ...props
}: SegmentSpotlightSegmentProps) {
  const context = useSegmentSpotlight()
  const hasActiveValue = context.activeValue !== null
  const isActive = hasActiveValue && context.activeTargets.has(value)
  const isMuted = hasActiveValue && !isActive

  return (
    <motion.div
      data-slot="segment-spotlight-segment"
      data-state={isActive ? 'active' : isMuted ? 'muted' : 'idle'}
      initial={
        initial ??
        (context.prefersReducedMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' })
      }
      animate={
        animate ?? {
          opacity: isMuted ? 0.65 : 1,
          y: !context.prefersReducedMotion && isActive ? -4 : 0,
          scale: !context.prefersReducedMotion && isActive ? 1.06 : 1,
          filter: !context.prefersReducedMotion && isMuted ? 'blur(2px)' : 'blur(0px)',
        }
      }
      transition={
        transition ?? {
          duration: context.prefersReducedMotion ? 0 : 0.38,
          ease: [0.16, 1, 0.3, 1],
        }
      }
      className={cn(
        'absolute z-10 rounded-lg px-3 py-1.5 text-sm font-medium shadow-xl ring-1 ring-black/5 will-change-transform dark:ring-white/10',
        segmentVariants[variant],
        isActive && 'z-20',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function SegmentSpotlightToolbar({ className, onPointerLeave, onBlur, ...props }: React.ComponentProps<typeof Toolbar>) {
  const context = useSegmentSpotlight();
  return <Toolbar {...props}
    onPointerLeave={(event) => { onPointerLeave?.(event); if (!event.defaultPrevented && context.activationMode === 'hover') context.setActiveValue(null); }}
    onBlur={(event) => { onBlur?.(event); if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) context.setActiveValue(null); }}
    className={(state) => cn('flex items-center gap-1 rounded-full bg-foreground p-2 text-background shadow-lg', typeof className === 'function' ? className(state) : className)} />;
}

type SegmentSpotlightTriggerProps = React.ComponentProps<typeof ToolbarButton> & { value: string; targets?: string[] };
function SegmentSpotlightTrigger({ value, targets, className, onPointerEnter, onFocus, onClick, ...props }: SegmentSpotlightTriggerProps) {
  const context = useSegmentSpotlight();
  const targetValues = React.useMemo(() => targets ?? [value], [targets, value]);
  const register = context.registerTrigger;
  React.useLayoutEffect(() => register(value, targetValues), [register, value, targetValues]);
  const active = context.activeValue === value;
  return <ToolbarButton {...props} aria-pressed={active}
    onPointerEnter={(event) => { onPointerEnter?.(event); if (!event.defaultPrevented && context.activationMode === 'hover' && event.pointerType === 'mouse') context.setActiveValue(value); }}
    onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented && context.activationMode === 'hover') context.setActiveValue(value); }}
    onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.setActiveValue(context.activationMode === 'click' && active ? null : value); }}
    className={(state) => cn('relative grid size-10 shrink-0 place-items-center rounded-full border border-transparent text-background outline-none hover:border-background/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background aria-pressed:border-background aria-pressed:bg-background/15 data-disabled:opacity-50 [&_svg]:size-5', typeof className === 'function' ? className(state) : className)} />;
}
function SegmentSpotlightSeparator({ className, ...props }: React.ComponentProps<typeof ToolbarSeparator>) {
  return <ToolbarSeparator {...props} className={(state) => cn('mx-1 h-6 w-px shrink-0 bg-background/30', typeof className === 'function' ? className(state) : className)} />;
}

function SegmentSpotlightContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-content"
      className={cn('absolute inset-x-0 bottom-0 z-20 px-6 pt-24 pb-10', className)}
      {...props}
    />
  )
}

export {
  SegmentSpotlight,
  SegmentSpotlightContent,
  SegmentSpotlightGrid,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
  type SegmentSpotlightActivationMode,
  type SegmentSpotlightProps,
  type SegmentSpotlightVariant,
}

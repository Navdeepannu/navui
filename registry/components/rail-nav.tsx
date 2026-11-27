'use client'

// Copyright (c) 2026 Navdeep Singh. MIT license; see LICENSE.

import * as React from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from 'cn'

export type RailNavItem = {
  label: React.ReactNode
  href: string
  /** Optional heading depth used to distinguish nested destinations. */
  depth?: number
  /** Optional selector to observe when it differs from href. */
  target?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

/** @deprecated Use RailNavItem instead. */
export type RailNavItems = RailNavItem

export type RailNavProps = Omit<React.ComponentProps<'aside'>, 'defaultValue'> & {
  items: readonly RailNavItem[]
  value?: string
  visibleValues?: readonly string[]
  defaultValue?: string
  onValueChange?: (value: string) => void
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  trackActive?: boolean
  observerOptions?: IntersectionObserverInit
  preventNavigation?: boolean
  /** Adds an explicit toggle for touch-first layouts. */
  touchToggle?: boolean
  label?: string
}

export function RailNav({
  items,
  value: valueProp,
  visibleValues,
  defaultValue,
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  trackActive = true,
  observerOptions,
  preventNavigation = false,
  touchToggle = false,
  label = 'On this page',
  className,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  ...props
}: RailNavProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeValue = '', setActiveValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? items[0]?.href ?? '',
    onChange: onValueChange,
  })

  const [expanded = false, setExpanded] = useControllableState({
    prop: expandedProp,
    defaultProp: defaultExpanded,
    onChange: onExpandedChange,
  })

  const [focusWithin, setFocusWithin] = React.useState(false)
  const pointerWithin = React.useRef(false)
  const navId = React.useId()
  const linksId = React.useId()

  React.useEffect(() => {
    if (!trackActive || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observedItems = items.flatMap((item) => {
      const selector = item.target ?? (item.href.startsWith('#') ? item.href : null)

      if (!selector) {
        return []
      }

      try {
        const element = document.querySelector(selector)

        return element
          ? [
              {
                element,
                value: item.href,
              },
            ]
          : []
      } catch {
        return []
      }
    })

    if (!observedItems.length) {
      return
    }

    const valueByElement = new Map(observedItems.map((item) => [item.element, item.value]))
    const intersections = new Map<Element, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => intersections.set(entry.target, entry))
        const visibleEntry = [...intersections.values()]
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top),
          )[0]

        const nextValue = visibleEntry ? valueByElement.get(visibleEntry.target) : undefined

        if (nextValue) {
          setActiveValue(nextValue)
        }
      },
      observerOptions ?? {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    observedItems.forEach(({ element }) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [items, observerOptions, setActiveValue, trackActive])

  function handleMouseEnter(event: React.MouseEvent<HTMLElement>) {
    pointerWithin.current = true
    onMouseEnter?.(event)

    if (!event.defaultPrevented) {
      setExpanded(true)
    }
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    pointerWithin.current = false
    onMouseLeave?.(event)

    if (!event.defaultPrevented && !focusWithin) {
      setExpanded(false)
    }
  }

  function handleFocusCapture(event: React.FocusEvent<HTMLElement>) {
    onFocusCapture?.(event)

    if (!event.defaultPrevented) {
      setFocusWithin(event.target instanceof HTMLElement && event.target.matches(':focus-visible'))
      setExpanded(true)
    }
  }

  function handleBlurCapture(event: React.FocusEvent<HTMLElement>) {
    onBlurCapture?.(event)

    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) {
      setFocusWithin(false)
      if (!pointerWithin.current) setExpanded(false)
    }
  }

  return (
    <aside
      data-slot="rail-nav"
      data-state={expanded ? 'expanded' : 'collapsed'}
      className={cn('block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      {...props}
    >
      <nav id={navId} aria-label={label} className="relative flex min-h-28 min-w-32 items-center justify-end">
        {touchToggle ? (
          <button
            type="button"
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`}
            aria-expanded={expanded}
            aria-controls={linksId}
            onClick={() => setExpanded(!expanded)}
            className="absolute top-0 right-0 z-20 flex size-11 items-center justify-center rounded-sm text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hidden"
          >
            <span aria-hidden="true" className="flex flex-col items-end gap-[5px]">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className={cn('block h-px rounded-full bg-current', index === 1 ? 'w-4' : 'w-3')} />
              ))}
            </span>
          </button>
        ) : null}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: expanded ? 0 : 1,
            x: expanded ? -5 : 0,
            filter: expanded ? 'blur(2px)' : 'blur(0px)',
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-1/2 right-0 flex -translate-y-1/2 flex-col items-end gap-[5px]"
        >
          {items.map((item) => {
            const isActive = activeValue === item.href
            const isVisible = visibleValues?.includes(item.href) ?? false

            return (
              <motion.span
                key={item.href}
                initial={false}
                animate={{ opacity: isActive ? 1 : isVisible ? 0.8 : 0.45, scaleX: isActive ? 1.08 : 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  'block h-px origin-right rounded-full',
                  item.depth === undefined
                    ? isActive ? 'w-[18px]' : 'w-[14px]'
                    : item.depth <= 0 ? 'w-[18px]' : item.depth === 1 ? 'w-[14px]' : item.depth === 2 ? 'w-[11px]' : 'w-[8px]',
                  isActive || isVisible ? 'bg-foreground' : 'bg-muted-foreground',
                )}
              />
            )
          })}
        </motion.div>

        <div
          id={linksId}
          className={cn(
            'absolute top-1/2 right-0 z-10 flex max-h-[min(70dvh,calc(100dvh-8rem))] min-w-max -translate-y-1/2 flex-col items-end gap-2 overflow-y-auto overscroll-contain py-2 transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-none',
            expanded
              ? 'opacity-100 blur-0'
              : 'pointer-events-none opacity-0 blur-[3px]',
            touchToggle && expanded && 'pt-12',
            focusWithin && 'duration-0 delay-0 blur-0',
          )}
        >
          {items.map((item, index) => {
            const isActive = activeValue === item.href
            const isVisible = visibleValues?.includes(item.href) ?? false

            return (
              <motion.a
                key={item.href}
                href={item.href}
                initial={false}
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : 8 }}
                transition={{
                  duration: shouldReduceMotion || focusWithin ? 0 : 0.22,
                  delay: shouldReduceMotion || focusWithin ? 0 : expanded ? Math.min(index * 0.018, 0.12) : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  ...(item.depth ? { marginInlineEnd: `${Math.min(item.depth, 4) * 8}px` } : {}),
                }}
                data-depth={item.depth}
                data-visible={isVisible || undefined}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  item.onClick?.(event)

                  if (event.defaultPrevented) return
                  if (preventNavigation) event.preventDefault()

                  if (preventNavigation || !event.defaultPrevented) {
                    setActiveValue(item.href)
                  }
                }}
                className={cn(
                  'text-right text-sm leading-5 font-medium tracking-tight text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:text-foreground',
                  isVisible && 'text-foreground/80',
                  item.className,
                )}
              >
                {item.label}
              </motion.a>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

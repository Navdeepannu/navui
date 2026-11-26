'use client'

import { Fragment } from 'react'
import {
  Accessibility,
  Activity,
  FileText,
  Flag,
  MessageCircle,
  Share2,
  Users,
  type LucideIcon,
} from 'lucide-react'

import {
  SegmentSpotlight,
  SegmentSpotlightGrid,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
  type SegmentSpotlightVariant,
} from '@/registry/components/segment-spotlight'

const segments: Array<{
  value: string
  label: string
  variant: SegmentSpotlightVariant
  className: string
}> = [
  {
    value: 'comments',
    label: 'Comments',
    variant: 'blue',
    className: 'left-[6%] top-[12%] -rotate-3 sm:left-[18%] sm:top-[20%]',
  },
  { value: 'cms', label: 'CMS Drafts', variant: 'purple', className: 'left-[50%] top-[8%] sm:left-[39%] sm:top-[17%]' },
  {
    value: 'accessibility',
    label: 'Accessibility',
    variant: 'green',
    className: 'right-[4%] top-[24%] rotate-1 sm:right-[28%] sm:top-[20%]',
  },
  { value: 'share', label: 'Share', variant: 'pink', className: 'left-[10%] top-[30%] rotate-6 sm:left-auto sm:right-[18%] sm:top-[24%]' },
  {
    value: 'flags',
    label: 'Feature Flags',
    variant: 'teal',
    className: 'left-[6%] top-[64%] rotate-2 sm:left-[22%] sm:top-[58%]',
  },
  {
    value: 'collaborators',
    label: 'Collaborators',
    variant: 'orange',
    className: 'right-[5%] top-[74%] -rotate-1 sm:right-auto sm:left-[47%] sm:top-[61%]',
  },
  {
    value: 'layout',
    label: 'Layout Shift',
    variant: 'red',
    className: 'left-[20%] top-[86%] -rotate-3 sm:left-auto sm:right-[23%] sm:top-[58%]',
  },
]

type SpotlightFocus = {
  value: string
  label: string
  icon: LucideIcon
  targets: string[]
  separator?: boolean
}

const focuses: SpotlightFocus[] = [
  { value: 'comments', label: 'Comments', icon: MessageCircle, targets: ['comments'] },
  { value: 'cms', label: 'CMS Drafts', icon: FileText, targets: ['cms'], separator: true },
  { value: 'flags', label: 'Feature Flags', icon: Flag, targets: ['flags'] },
  {
    value: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    targets: ['collaborators'],
    separator: true,
  },
  {
    value: 'accessibility',
    label: 'Accessibility',
    icon: Accessibility,
    targets: ['accessibility'],
  },
  { value: 'layout', label: 'Layout Shift', icon: Activity, targets: ['layout'] },
  { value: 'share', label: 'Share', icon: Share2, targets: ['share'] },
]

export default function SegmentSpotlightShowcase() {
  return (
    <div className="flex size-full items-center justify-center">
      <SegmentSpotlight className="mx-auto max-w-6xl">
        <SegmentSpotlightViewport className="min-h-80 sm:min-h-105">
          <SegmentSpotlightGrid />

          {segments.map((segment) => (
            <SegmentSpotlightSegment
              key={segment.value}
              value={segment.value}
              variant={segment.variant}
              className={`${segment.className} px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-sm`}
            >
              {segment.label}
            </SegmentSpotlightSegment>
          ))}

          <SegmentSpotlightToolbar
            aria-label="Highlight product capability"
            className="absolute top-[42%] left-1/2 z-30 max-w-[calc(100%-1rem)] -translate-x-1/2 gap-0 overflow-x-auto p-1.5 sm:gap-1 sm:p-2"
          >
            {focuses.map((focus) => {
              const Icon = focus.icon

              return (
                <Fragment key={focus.value}>
                  <SegmentSpotlightTrigger
                    value={focus.value}
                    targets={focus.targets}
                    aria-label={focus.label}
                    title={focus.label}
                    className="size-8 sm:size-10"
                  >
                    <Icon className="size-4 sm:size-5" aria-hidden />
                  </SegmentSpotlightTrigger>
                  {focus.separator ? <SegmentSpotlightSeparator /> : null}
                </Fragment>
              )
            })}
          </SegmentSpotlightToolbar>
        </SegmentSpotlightViewport>
      </SegmentSpotlight>
    </div>
  )
}

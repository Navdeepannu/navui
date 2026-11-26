import { Mail } from 'lucide-react'
import Link from 'next/link'
import type { SVGProps } from 'react'

import LogoMark from './footer-section-two-logo'

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45Z" />
    </svg>
  )
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.54 7.1c.01.21.01.43.01.64 0 6.5-4.95 14-14 14A13.9 13.9 0 0 1 0 19.53c.4.05.78.06 1.19.06a9.85 9.85 0 0 0 6.1-2.1 4.93 4.93 0 0 1-4.6-3.42c.3.05.61.08.93.08.45 0 .9-.06 1.32-.17A4.92 4.92 0 0 1 1 9.15v-.06a4.98 4.98 0 0 0 2.22.62A4.92 4.92 0 0 1 1.7 3.14a13.98 13.98 0 0 0 10.14 5.14 5.55 5.55 0 0 1-.12-1.12 4.92 4.92 0 0 1 8.52-3.37 9.68 9.68 0 0 0 3.12-1.19 4.9 4.9 0 0 1-2.16 2.71A9.86 9.86 0 0 0 24 4.56a10.58 10.58 0 0 1-2.46 2.54Z" />
    </svg>
  )
}

const links = [
  { title: 'Features', href: '#' },
  { title: 'Solutions', href: '#' },
  { title: 'Customers', href: '#' },
  { title: 'Pricing', href: '#' },
  { title: 'Help', href: '#' },
]

const socials = [
  {
    title: 'LinkedIn',
    href: '#',
    icon: LinkedInIcon,
  },
  {
    title: 'GitHub',
    href: '#',
    icon: GitHubIcon,
  },
  {
    title: 'Twitter',
    href: '#',
    icon: TwitterIcon,
  },
  {
    title: 'Email',
    href: '#',
    icon: Mail,
  },
]

export default function FooterSectionTwo() {
  return (
    <footer className="py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <LogoMark aria-hidden="true" className="size-6" />
              <span className="text-lg font-semibold text-foreground">Nav UI</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {links.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="text-sm font-normal text-neutral-600 transition-colors duration-200 hover:text-black dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-dashed border-neutral-200 py-6 sm:flex-row dark:border-neutral-800">
          <span className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} Nav UI, All rights reserved
          </span>
          <ul className="flex items-center gap-5">
            {socials.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    aria-label={item.title}
                    className="text-neutral-700 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}

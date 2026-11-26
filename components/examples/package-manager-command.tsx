'use client'

import { PackageManagerCommand } from '@/registry/components/package-manager-command'

const commands = {
  npm: 'npx shadcn@latest add @navui/tabs',
  pnpm: 'pnpm dlx shadcn@latest add @navui/tabs',
  yarn: 'yarn dlx shadcn@latest add @navui/tabs',
  bun: 'bunx --bun shadcn@latest add @navui/tabs',
}

export default function PackageManagerCommandShowcase() {
  return (
    <div className="flex w-full items-center justify-center px-4">
      <PackageManagerCommand
        commands={commands}
        defaultValue="bun"
        className="w-full max-w-xl sm:w-full"
      />
    </div>
  )
}

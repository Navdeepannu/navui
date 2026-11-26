import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <main>
      <section className="pt-40 xl:pt-48">
        <div className="mx-auto max-w-7xl px-8 md:px-4">
          <div className="grid items-end gap-4 md:grid-cols-2 md:gap-6">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Build better interfaces, faster.
            </h1>
            <div className="flex max-w-lg flex-col gap-4 md:mx-auto">
              <p className="text-sm text-balance text-muted-foreground md:text-base">
                A growing collection of polished React components and blocks
                built with shadcn/ui, Tailwind CSS, and modern frontend
                patterns.
              </p>

              <div className="flex items-center gap-2">
                <Button
                  className="rounded-full border-0 shadow-sm ring-1 ring-foreground/6.5"
                  variant="default"
                  nativeButton={false}
                  render={<Link href="/blocks" />}
                >
                  Browse Blocks
                </Button>
                <Button
                  className="w-fit rounded-full shadow-sm"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/components" />}
                >
                  View Components
                </Button>
              </div>
            </div>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-xl bg-muted px-4 pt-6 max-lg:-mx-4 md:px-6 lg:px-8 lg:pt-16">
            <div className="relative z-10 mx-auto flex aspect-3/2 max-w-5xl sm:aspect-video">
              <div className="w-2/3 pt-6 lg:pt-16">
                <div className="h-full rounded-t-2xl bg-card shadow-2xl ring ring-foreground/6.5">
                  <Image
                    src="/assets/teams-light.webp"
                    alt="Team block preview"
                    width={640}
                    height={516}
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <Image
                src="/assets/hero-light.png"
                alt="Hero block preview"
                width={2940}
                height={2874}
                className="relative -ml-12 h-full w-2/3 rounded-t-2xl bg-card object-cover object-top shadow-2xl ring ring-foreground/6.5 lg:-ml-56"
              />
            </div>

            <Image
              src="/assets/background.png"
              alt=""
              width={1672}
              loading="eager"
              height={941}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

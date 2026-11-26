import type { BlockCategoryId } from "@/registry/categories";
import type { BlockCatalogEntry, ComponentCatalogEntry, RegistryFile } from "@/registry/types";

type BaseBlockInput<Slug extends string> = {
  slug: Slug;
  title: string;
  description: string;
  category: BlockCategoryId;
  dependencies?: readonly string[];
  registryDependencies?: readonly string[];
  supportingFiles?: readonly string[];
};

function defineBaseBlock<const Slug extends string>(
  input: BaseBlockInput<Slug>,
) {
  const sourceRoot = `registry/blocks/base/${input.category}/${input.slug}`;
  const targetRoot = `components/blocks/base/${input.category}`;
  const files: [RegistryFile, ...RegistryFile[]] = [
    {
      source: `${sourceRoot}/${input.slug}.tsx`,
      target: `${targetRoot}/${input.slug}.tsx`,
      type: "registry:component",
    },
    ...(input.supportingFiles ?? []).map((filename) => ({
      source: `${sourceRoot}/${filename}`,
      target: `${targetRoot}/${filename}`,
      type: "registry:component" as const,
    })),
  ];

  return {
    id: `base/${input.slug}` as const,
    registryName: `base-${input.slug}` as const,
    designSystem: "base" as const,
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: input.category,
    status: "published" as const,
    registry: {
      type: "registry:block" as const,
      dependencies: input.dependencies ?? [],
      registryDependencies: input.registryDependencies ?? [],
      files,
    },
  } satisfies BlockCatalogEntry;
}

export const blockCatalog = [
  defineBaseBlock({
    slug: "blog-section-one",
    title: "Blog Section One",
    description:
      "A semantic blog archive grouped by year, with aligned dates, useful metadata, and accessible row links.",
    category: "blog",
    dependencies: ["cn", "lucide-react"],
  }),
  defineBaseBlock({
    slug: "contact-section-one",
    title: "Contact Section One",
    description:
      "A contact directory that routes visitors to sales, support, community, documentation, and developer resources.",
    category: "contact",
    dependencies: ["lucide-react"],
  }),
  defineBaseBlock({
    slug: "contact-section-two",
    title: "Contact Section Two",
    description:
      "A split contact section with a consultation summary and detailed project inquiry form.",
    category: "contact",
  }),
  defineBaseBlock({
    slug: "contact-section-three",
    title: "Contact Section Three",
    description:
      "A compact project contact form paired with a concise service introduction.",
    category: "contact",
  }),
  defineBaseBlock({
    slug: "contact-section-four",
    title: "Contact Section Four",
    description:
      "A focused project-inquiry form with contact details and a large editorial heading.",
    category: "contact",
    registryDependencies: ["button", "input", "label", "textarea"],
  }),
  defineBaseBlock({
    slug: "content-section-one",
    title: "Content Section One",
    description:
      "A restrained principles section with a clear introduction and a responsive set of supporting ideas.",
    category: "content",
    dependencies: ["motion"],
    supportingFiles: [
      "content-section-one-designed-for-focus-illustration.tsx",
      "content-section-one-fast-by-default-illustration.tsx",
      "content-section-one-flexible-at-scale-illustration.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "content-section-two",
    title: "Content Section Two",
    description:
      "An editorial product story with balanced copy, configurable local media, and optional caption metadata.",
    category: "content",
    dependencies: ["cn", "lucide-react"],
  }),
  defineBaseBlock({
    slug: "content-section-three",
    title: "Content Section Three",
    description:
      "A structured feature grid with one dominant narrative and two focused supporting ideas.",
    category: "content",
    dependencies: ["cn", "lucide-react", "motion"],
    supportingFiles: [
      "content-section-three-release-workflow-illustration.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "content-section-four",
    title: "Content Section Four",
    description:
      "A connected-publishing story with an animated revision metric, trend visualization, and output checklist.",
    category: "content",
    dependencies: ["cn", "lucide-react", "motion"],
    supportingFiles: [
      "content-section-four-revision-cycles-illustration.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "content-section-five",
    title: "Content Section Five",
    description:
      "A sticky editorial narrative with a normal mobile flow and a sequence of image-led content panels.",
    category: "content",
    dependencies: ["cn", "lucide-react"],
  }),
  defineBaseBlock({
    slug: "cta-section-one",
    title: "CTA Section One",
    description:
      "A polished call to action with primary and secondary links for clear next steps.",
    category: "cta",
    dependencies: ["cn", "lucide-react"],
    registryDependencies: ["button"],
  }),
  defineBaseBlock({
    slug: "cta-section-two",
    title: "CTA Section Two",
    description:
      "A split call to action with primary and secondary actions over a signal-line field.",
    category: "cta",
    dependencies: ["cn"],
    registryDependencies: ["button"],
  }),
  defineBaseBlock({
    slug: "cta-section-three",
    title: "CTA Section Three",
    description:
      "A centered product call to action over a restrained fading dot field.",
    category: "cta",
    dependencies: ["cn"],
    registryDependencies: ["button"],
  }),
  defineBaseBlock({
    slug: "faq-section-one",
    title: "FAQ Section One",
    description:
      "A two-column FAQ layout with accessible accordion answers and a support prompt.",
    category: "faqs",
    registryDependencies: ["accordion"],
  }),
  defineBaseBlock({
    slug: "faqs-section-two",
    title: "FAQs Section Two",
    description:
      "A centered FAQ section with accessible accordions and a follow-up contact link.",
    category: "faqs",
    registryDependencies: ["accordion"],
  }),
  defineBaseBlock({
    slug: "faq-section-three",
    title: "FAQ Section Three",
    description:
      "An editorial FAQ section with a large introduction and accessible accordion rows.",
    category: "faqs",
    registryDependencies: ["accordion"],
  }),
  defineBaseBlock({
    slug: "feature-section-two",
    title: "Feature Section Two",
    description:
      "An expandable workflow feature section with autoplay, reduced-motion handling, and three interactive illustrations.",
    category: "features",
    dependencies: ["cn", "motion"],
  }),
  defineBaseBlock({
    slug: "footer-section-one",
    title: "Footer Section One",
    description:
      "A multi-column product footer with social links and an email newsletter form.",
    category: "footer",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    supportingFiles: ["footer-section-one-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "footer-section-two",
    title: "Footer Section Two",
    description:
      "A compact navigation footer with product links, social actions, and legal copy.",
    category: "footer",
    dependencies: ["lucide-react"],
    supportingFiles: ["footer-section-two-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "forgot-password-one",
    title: "Forgot Password One",
    description:
      "A compact password-recovery card with email input, submit action, and return link.",
    category: "forgot-password",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label"],
  }),
  defineBaseBlock({
    slug: "forgot-password-two",
    title: "Forgot Password Two",
    description:
      "A centered password-recovery form with a prominent heading and return action.",
    category: "forgot-password",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label"],
  }),
  defineBaseBlock({
    slug: "forgot-password-three",
    title: "Forgot Password Three",
    description:
      "A left-aligned password-recovery form with concise guidance and navigation back.",
    category: "forgot-password",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label"],
  }),
  defineBaseBlock({
    slug: "header-one",
    title: "Header One",
    description:
      "A responsive marketing header with animated mobile navigation and account actions.",
    category: "header",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["button"],
    supportingFiles: ["header-one-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "header-two",
    title: "Header Two",
    description:
      "A responsive marketing header with a bordered shell and animated mobile menu.",
    category: "header",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["button"],
    supportingFiles: ["header-two-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "header-three",
    title: "Header Three",
    description:
      "A payment-product header with grouped navigation menus and a responsive mobile drawer.",
    category: "header",
    dependencies: ["cn", "lucide-react"],
    registryDependencies: ["button", "navigation-menu"],
  }),
  defineBaseBlock({
    slug: "header-four",
    title: "Header Four",
    description:
      "A responsive header with animated multi-level desktop and mobile navigation menus.",
    category: "header",
    dependencies: ["cn", "lucide-react", "motion"],
    registryDependencies: ["button", "navigation-menu"],
  }),
  defineBaseBlock({
    slug: "hero-section-one",
    title: "Hero Section One",
    description:
      "A dark product hero with badges, dual actions, and the matching responsive header.",
    category: "hero",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["badge", "button"],
    supportingFiles: [
      "hero-section-one-header.tsx",
      "hero-section-one-logo.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "hero-section-two",
    title: "Hero Section Two",
    description:
      "A motion-led hero with animated copy, grouped reveals, and its matching header.",
    category: "hero",
    dependencies: ["cn", "lucide-react", "motion"],
    registryDependencies: ["button"],
    supportingFiles: [
      "hero-section-two-animated-group.tsx",
      "hero-section-two-header.tsx",
      "hero-section-two-logo.tsx",
      "hero-section-two-text-effect.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "hero-section-three",
    title: "Hero Section Three",
    description:
      "An art-directed hero with shader-backed visuals and a focused primary action.",
    category: "hero",
    dependencies: ["lucide-react", "shaders"],
    registryDependencies: ["button"],
  }),
  defineBaseBlock({
    slug: "hero-section-four",
    title: "Hero Section Four",
    description:
      "A complete expense-workflow hero with responsive header, lead form, logo cloud, and supporting illustrations.",
    category: "hero",
    dependencies: ["cn", "lucide-react", "motion"],
    registryDependencies: ["button", "label", "navigation-menu"],
    supportingFiles: [
      "hero-section-four-header.tsx",
      "hero-section-four-illustration.tsx",
      "hero-section-four-logo-cloud.tsx",
    ],
  }),
  defineBaseBlock({
    slug: "logo-cloud-one",
    title: "Logo Cloud One",
    description:
      "A compact monochrome logo strip for customer or partner proof.",
    category: "logo-cloud",
  }),
  defineBaseBlock({
    slug: "logo-cloud-two",
    title: "Logo Cloud Two",
    description:
      "A compact partner logo strip using a mixed icon and wordmark collection.",
    category: "logo-cloud",
    dependencies: ["lucide-react"],
  }),
  defineBaseBlock({
    slug: "logo-cloud-three",
    title: "Logo Cloud Three",
    description:
      "A horizontally framed customer logo strip with restrained typography.",
    category: "logo-cloud",
  }),
  defineBaseBlock({
    slug: "logo-cloud-four",
    title: "Logo Cloud Four",
    description:
      "A large animated company grid with a prominent trust statement.",
    category: "logo-cloud",
    dependencies: ["cn", "motion"],
  }),
  defineBaseBlock({
    slug: "logo-cloud-five",
    title: "Logo Cloud Five",
    description:
      "A headline-led animated logo cloud with responsive brand cards.",
    category: "logo-cloud",
    dependencies: ["motion"],
  }),
  defineBaseBlock({
    slug: "pricing-section-one",
    title: "Pricing Section One",
    description:
      "A responsive three-tier pricing section with a monthly and yearly billing switcher.",
    category: "pricing",
    dependencies: ["cn", "lucide-react", "motion"],
    registryDependencies: ["badge", "button", "card"],
    supportingFiles: ["pricing-section-one-animated-number.tsx"],
  }),
  defineBaseBlock({
    slug: "sign-up-one",
    title: "Sign Up One",
    description:
      "A detailed account creation form with identity, password, consent, and sign-in actions.",
    category: "sign-up",
    dependencies: ["cn", "lucide-react"],
    registryDependencies: ["button", "input", "label"],
    supportingFiles: ["sign-up-one-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "sign-up-two",
    title: "Sign Up Two",
    description:
      "A split-screen account creation flow with social sign-in, product benefits, and an animated visual.",
    category: "sign-up",
    dependencies: ["cn", "lucide-react", "shaders"],
    registryDependencies: ["button", "input", "label"],
    supportingFiles: ["sign-up-two-logo.tsx"],
  }),
  defineBaseBlock({
    slug: "stats-section-one",
    title: "Stats Section One",
    description:
      "A business results section that combines measurable outcomes with a customer proof point.",
    category: "stats",
    dependencies: ["cn", "motion"],
  }),
  defineBaseBlock({
    slug: "teams-section-one",
    title: "Teams Section One",
    description:
      "A grouped leadership and team directory with social links and empty-state handling.",
    category: "teams",
  }),
  defineBaseBlock({
    slug: "teams-section-two",
    title: "Teams Section Two",
    description:
      "A simple responsive team grid with names, roles, and portrait imagery.",
    category: "teams",
  }),
  defineBaseBlock({
    slug: "teams-section-three",
    title: "Teams Section Three",
    description:
      "A centered team directory with portrait cards, roles, and profile links.",
    category: "teams",
  }),
  defineBaseBlock({
    slug: "teams-section-four",
    title: "Teams Section Four",
    description:
      "A global-team recruiting section with portrait cards and role badges.",
    category: "teams",
    registryDependencies: ["badge"],
  }),
  defineBaseBlock({
    slug: "teams-section-five",
    title: "Teams Section Five",
    description:
      "A dark editorial team grid with role badges and portrait-led member cards.",
    category: "teams",
    registryDependencies: ["badge"],
  }),
  defineBaseBlock({
    slug: "testimonial-section-one",
    title: "Testimonial Section One",
    description:
      "A customer-story hero with proof badges, a featured quote, and success-story action.",
    category: "testimonials",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button"],
  }),
] as const satisfies readonly BlockCatalogEntry[];

export type BlockId = (typeof blockCatalog)[number]["id"];

export const componentCatalog = [
  {
    "id": "components/animated-numbers",
    "registryName": "animated-numbers",
    "slug": "animated-numbers",
    "title": "Animated Numbers",
    "description": "An accessible number counter that animates into view with locale-aware formatting, prefixes, suffixes, decimals, delays, and reduced-motion support.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "animation",
      "motion",
      "numbers",
      "statistics",
      "accessibility"
    ],
    "usageExample": "import { AnimatedNumber } from '@/components/navui/animated-numbers'\n\nexport function Example() {\n  return (\n    <div className=\"flex gap-8 text-4xl font-semibold\">\n      <AnimatedNumber value={38} suffix=\"%\" />\n      <AnimatedNumber value={3.2} suffix=\"×\" decimalPlaces={1} />\n      <AnimatedNumber value={125000} prefix=\"$\" duration={1.4} />\n    </div>\n  )\n}",
    "api": [
      {
        "prop": "value",
        "type": "number",
        "default": "-",
        "description": "The final numeric value displayed when the animation completes."
      },
      {
        "prop": "from",
        "type": "number",
        "default": "0",
        "description": "The starting value used before the component enters the viewport."
      },
      {
        "prop": "prefix / suffix",
        "type": "string / string",
        "default": "\"\" / \"\"",
        "description": "Text rendered immediately before or after the formatted number."
      },
      {
        "prop": "decimalPlaces",
        "type": "number",
        "default": "0",
        "description": "The fixed minimum and maximum number of fraction digits."
      },
      {
        "prop": "duration / delay",
        "type": "number / number",
        "default": "1 / 0",
        "description": "Animation duration and start delay in seconds."
      },
      {
        "prop": "locale",
        "type": "string",
        "default": "\"en-US\"",
        "description": "Locale passed to Intl.NumberFormat for separators and decimal formatting."
      },
      {
        "prop": "...props",
        "type": "React.ComponentPropsWithoutRef<\"span\">",
        "default": "-",
        "description": "Native span attributes and className. Children are omitted because the formatted value is managed by the component."
      }
    ],
    "notes": [
      "The final formatted value is exposed to screen readers; intermediate animation frames are decorative. Respects reduced motion."
    ],
    "preview": "components/examples/animated-numbers.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/animated-numbers/animated-numbers.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "cn",
        "motion"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/animated-numbers.tsx",
          "target": "components/navui/animated-numbers.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/animated-tabs",
    "registryName": "animated-tabs",
    "slug": "animated-tabs",
    "title": "Animated Tabs",
    "description": "A tab component with a moving active pill and directional content transitions.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "motion",
      "animation",
      "tabs",
      "accessibility"
    ],
    "usageExample": "import {\n  AnimatedTabs,\n  AnimatedTabsContent,\n  AnimatedTabsList,\n  AnimatedTabsTrigger,\n  AnimatedTabsViewport,\n} from '@/components/navui/animated-tabs'\n\nexport function Example() {\n  return (\n    <AnimatedTabs defaultValue=\"overview\">\n      <AnimatedTabsList>\n        <AnimatedTabsTrigger value=\"overview\">Overview</AnimatedTabsTrigger>\n        <AnimatedTabsTrigger value=\"pricing\">Pricing</AnimatedTabsTrigger>\n      </AnimatedTabsList>\n\n      <AnimatedTabsViewport>\n        <AnimatedTabsContent value=\"overview\">Overview content</AnimatedTabsContent>\n        <AnimatedTabsContent value=\"pricing\">Pricing content</AnimatedTabsContent>\n      </AnimatedTabsViewport>\n    </AnimatedTabs>\n  )\n}",
    "api": [
      {
        "prop": "AnimatedTabs",
        "type": "React.ComponentProps<typeof Tabs>",
        "default": "-",
        "description": "Accessible root with the Radix Tabs controlled and uncontrolled state API, orientation, direction, and activationMode."
      },
      {
        "prop": "AnimatedTabsList",
        "type": "React.ComponentProps<typeof TabsList>",
        "default": "-",
        "description": "Scrollable tab list. Accepts native Radix list props and custom layout classes."
      },
      {
        "prop": "AnimatedTabsTrigger",
        "type": "React.ComponentProps<typeof TabsTrigger>",
        "default": "-",
        "description": "Tab trigger with the shared animated active indicator."
      },
      {
        "prop": "AnimatedTabsViewport",
        "type": "React.ComponentProps<\"div\">",
        "default": "-",
        "description": "Grid viewport that layers outgoing and incoming panels during transitions."
      },
      {
        "prop": "AnimatedTabsContent",
        "type": "React.ComponentProps<typeof TabsContent>",
        "default": "-",
        "description": "Accessible tab panel with directional enter and exit motion. Children can be any React content."
      }
    ],
    "notes": [
      "Retains Radix Tabs and Motion. Arrow keys move between tabs; inactive panels are inert during transitions. Respects reduced motion."
    ],
    "preview": "components/examples/animated-tabs.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/animated-tabs/animated-tabs.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@radix-ui/react-use-controllable-state",
        "cn",
        "motion",
        "radix-ui"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/animated-tabs.tsx",
          "target": "components/navui/animated-tabs.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/primitives/radix/tabs.tsx",
          "target": "components/navui/primitives/radix/tabs.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/contribution-graph",
    "registryName": "contribution-graph",
    "slug": "contribution-graph",
    "title": "Contribution Graph",
    "description": "A clean, accessible contribution calendar with built-in data normalization, keyboard navigation, day tooltips, and responsive latest-day visibility.",
    "category": "data-display",
    "status": "published",
    "tags": [
      "data display",
      "analytics",
      "github",
      "accessibility",
      "responsive"
    ],
    "usageExample": "import { ContributionGraph } from '@/components/navui/contribution-graph'\n\nexport function Example() {\n  return (\n    <ContributionGraph\n      aria-label=\"Project activity\"\n      data={{ days: [{ date: '2026-11-01', count: 3 }, { date: '2026-11-03', count: 7 }] }}\n    />\n  )\n}",
    "api": [
      {
        "prop": "data",
        "type": "ContributionGraphData",
        "default": "-",
        "description": "Daily { date, count } values. Intensity, total, and date range are calculated when omitted."
      },
      {
        "prop": "emptyMessage",
        "type": "string",
        "default": "Contextual fallback message",
        "description": "Message rendered when the daily data array is empty."
      },
      {
        "prop": "title / description",
        "type": "string / string",
        "default": "Contribution activity / -",
        "description": "Visible heading with optional supporting context."
      },
      {
        "prop": "showHeader",
        "type": "boolean",
        "default": "true",
        "description": "Hides the visible heading and total for compact embeds while preserving an accessible summary."
      },
      {
        "prop": "className / figure props",
        "type": "string / ComponentPropsWithoutRef<\"figure\">",
        "default": "-",
        "description": "Classes and native figure attributes, including aria-label, forwarded to the root."
      }
    ],
    "notes": [
      "Pass { date, count }; missing days and intensity are filled automatically.",
      "Use arrow keys, Home, and End to review individual days. Counts are named in text as well as shown by intensity. Empty data renders a fallback."
    ],
    "preview": "components/examples/contribution-graph.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/contribution-graph/contribution-graph.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/contribution-graph.tsx",
          "target": "components/navui/contribution-graph.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/expandable-card",
    "registryName": "expandable-card",
    "slug": "expandable-card",
    "title": "Expandable Card",
    "description": "A compound card-dialog component for composing a compact trigger and a fully custom expanded experience with shared-layout motion.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "motion",
      "animation",
      "card",
      "accessibility"
    ],
    "usageExample": "import {\n  ExpandableCard,\n  ExpandableCardBody,\n  ExpandableCardContent,\n  ExpandableCardDescription,\n  ExpandableCardHeader,\n  ExpandableCardTitle,\n  ExpandableCardTrigger,\n} from '@/components/navui/expandable-card'\n\nexport function Example() {\n  return (\n    <ExpandableCard>\n      <ExpandableCardTrigger>\n        <span className=\"block p-4\">\n          <span className=\"font-medium\">Smart automation</span>\n          <span className=\"mt-1 block text-sm text-muted-foreground\">View workflow details</span>\n        </span>\n      </ExpandableCardTrigger>\n\n      <ExpandableCardContent>\n        <ExpandableCardHeader>\n          <ExpandableCardTitle>Smart automation</ExpandableCardTitle>\n          <ExpandableCardDescription>\n            Automate repetitive tasks without limiting the expanded layout.\n          </ExpandableCardDescription>\n        </ExpandableCardHeader>\n        <ExpandableCardBody>Your charts, forms, links, or any React content.</ExpandableCardBody>\n      </ExpandableCardContent>\n    </ExpandableCard>\n  )\n}",
    "api": [
      {
        "prop": "ExpandableCard",
        "type": "React.ComponentProps<typeof Dialog.Root>",
        "default": "defaultOpen: false",
        "description": "Accessible controlled or uncontrolled root. Supports open, defaultOpen, onOpenChange, and modal behavior."
      },
      {
        "prop": "ExpandableCardTrigger",
        "type": "Motion button props",
        "default": "-",
        "description": "Collapsed card button. Accepts arbitrary preview content, native button props, Motion props, refs, and classes."
      },
      {
        "prop": "ExpandableCardContent",
        "type": "Dialog.Content props",
        "default": "showCloseButton: true",
        "description": "Accessible expanded dialog surface. Supports custom children, overlayClassName, closeLabel, transition, Dialog events, and optional contained rendering into a local portalContainer."
      },
      {
        "prop": "ExpandableCardMedia",
        "type": "Motion span props",
        "default": "-",
        "description": "Optional shared-layout media primitive. Use it in both trigger and content around any image, icon, or visual."
      },
      {
        "prop": "ExpandableCardHeader / Title / Description",
        "type": "Native and Dialog primitive props",
        "default": "-",
        "description": "Semantic dialog heading primitives with native prop and className passthrough."
      },
      {
        "prop": "ExpandableCardBody / Footer",
        "type": "React.ComponentProps<\"div\">",
        "default": "-",
        "description": "Unopinionated content regions for application-specific details and actions."
      },
      {
        "prop": "ExpandableCardClose",
        "type": "React.ComponentProps<typeof Dialog.Close>",
        "default": "-",
        "description": "Optional close primitive for custom action placement; supports asChild."
      }
    ],
    "notes": [
      "Retains Radix Dialog focus trapping, Escape dismissal, and focus return. Always include Title and Description; do not nest interactive elements inside the trigger."
    ],
    "preview": "components/examples/expandable-card.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/expandable-card/expandable-card.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@radix-ui/react-use-controllable-state",
        "class-variance-authority",
        "cn",
        "lucide-react",
        "motion",
        "radix-ui"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/expandable-card.tsx",
          "target": "components/navui/expandable-card.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/primitives/radix/button.tsx",
          "target": "components/navui/primitives/radix/button.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/keyboard-shortcut",
    "registryName": "keyboard-shortcut",
    "slug": "keyboard-shortcut",
    "title": "Keyboard Shortcut",
    "description": "A keyboard shortcut display that reacts to each pressed key, triggers a callback when the full chord is held, and optionally plays key sounds.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "keyboard",
      "shortcut",
      "command menu",
      "interaction",
      "accessibility"
    ],
    "usageExample": "'use client'\n\nimport { KeyboardShortcut } from '@/components/navui/keyboard-shortcut'\n\nconst commandKeys = [\n  { key: 'Meta', label: '⌘' },\n  { key: 'k', label: 'K' },\n]\n\nexport function NavbarShortcut({ onOpenCommand }: { onOpenCommand: () => void }) {\n  return (\n    <button onClick={onOpenCommand} className=\"flex items-center gap-3 rounded-lg border px-3 py-2\">\n      Open command menu\n      <KeyboardShortcut keys={commandKeys} onTrigger={onOpenCommand} />\n    </button>\n  )\n}\n\nexport function RaisedShortcut() {\n  return (\n    <KeyboardShortcut\n      keys={[\n        { key: 'Shift', label: '⇧' },\n        { key: 'p', label: 'P' },\n      ]}\n      sound=\"/sounds/key-press.mp3\"\n      keyClassName=\"size-10 rounded-md shadow-sm\"\n    />\n  )\n}",
    "api": [
      {
        "prop": "keys",
        "type": "readonly KeyboardShortcutKey[]",
        "default": "-",
        "description": "The event.key values to match, with optional React labels for the visible Kbd keys."
      },
      {
        "prop": "onTrigger",
        "type": "(event: KeyboardEvent) => void",
        "default": "-",
        "description": "Called once when every configured key is held; it can open a command menu or run any shortcut action."
      },
      {
        "prop": "sound / soundVolume",
        "type": "string / number",
        "default": "- / 0.5",
        "description": "Optional audio URL and volume from 0 to 1. The sound plays as each matching key is pressed."
      },
      {
        "prop": "preventDefault",
        "type": "boolean",
        "default": "true",
        "description": "Prevents the browser default only after the full shortcut is matched."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Stops listening for the shortcut while preserving its visual presentation."
      },
      {
        "prop": "className",
        "type": "string",
        "default": "-",
        "description": "Classes merged onto the Kbd group, such as a custom gap."
      },
      {
        "prop": "keyClassName / pressedKeyClassName",
        "type": "string / string",
        "default": "- / focus-ring treatment",
        "description": "Classes applied to every key and to its active state. Use keyClassName for size-10 or raised shadows."
      },
      {
        "prop": "aria-label",
        "type": "string",
        "default": "Generated from keys",
        "description": "Accessible name for the displayed shortcut group."
      }
    ],
    "notes": [
      "Global keyboard listener: choose chords that do not conflict with browser or assistive-technology shortcuts. Optional sound is opt-in and requires a browser-readable audio URL."
    ],
    "preview": "components/examples/keyboard-shortcut.tsx",
    "examples": [
      {
        "id": "with-sound",
        "title": "With sound",
        "description": "Optional key feedback using a local demonstration audio asset.",
        "source": "components/examples/keyboard-shortcut-with-sound.tsx"
      }
    ],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/keyboard-shortcut/keyboard-shortcut.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/keyboard-shortcut.tsx",
          "target": "components/navui/keyboard-shortcut.tsx",
          "type": "registry:ui"
        },
        {
          "source": "components/ui/kbd.tsx",
          "target": "components/ui/kbd.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/magnetic-button",
    "registryName": "magnetic-button",
    "slug": "magnetic-button",
    "title": "Magnetic Button",
    "description": "A shadcn-compatible button that subtly follows the cursor using spring-based motion.",
    "category": "buttons",
    "status": "published",
    "tags": [
      "interactive",
      "motion",
      "cursor",
      "animation"
    ],
    "usageExample": "import { MagneticButton } from '@/components/navui/magnetic-button'\n\nexport function Example() {\n  return (\n    <MagneticButton asChild movement={8} variant=\"outline\">\n      <a href=\"/docs\">View documentation</a>\n    </MagneticButton>\n  )\n}",
    "api": [
      {
        "prop": "movement",
        "type": "number",
        "default": "6",
        "description": "How far (in px) the button drifts toward the cursor on hover."
      },
      {
        "prop": "wrapperClassName",
        "type": "string",
        "default": "-",
        "description": "Classes applied to the animated wrapper without changing button styles."
      },
      {
        "prop": "springOptions",
        "type": "SpringOptions",
        "default": "{ stiffness: 180, damping: 10, mass: 0.5 }",
        "description": "Custom Motion spring configuration for cursor movement and settling."
      },
      {
        "prop": "...props",
        "type": "React.ComponentProps<typeof Button>",
        "default": "-",
        "description": "The complete shadcn Button API, including variant, size, asChild, refs, event handlers, disabled, and native button props."
      }
    ],
    "notes": [
      "Preserves native button semantics and Radix asChild composition. Pointer motion is disabled for touch and reduced-motion users."
    ],
    "preview": "components/examples/magnetic-button.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/magnetic-button/magnetic-button.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "class-variance-authority",
        "cn",
        "motion",
        "radix-ui"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/magnetic-button.tsx",
          "target": "components/navui/magnetic-button.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/primitives/radix/button.tsx",
          "target": "components/navui/primitives/radix/button.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/package-manager-command",
    "registryName": "package-manager-command",
    "slug": "package-manager-command",
    "title": "Package Manager Command",
    "description": "An accessible package-manager selector and copy command bar with controlled state and inline copy-status icons.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "installation",
      "clipboard",
      "docs",
      "accessibility"
    ],
    "usageExample": "import { PackageManagerCommand } from '@/components/navui/package-manager-command'\n\nconst commands = {\n  npm: 'npx shadcn@latest add @navui/animated-tabs',\n  pnpm: 'pnpm dlx shadcn@latest add @navui/animated-tabs',\n  yarn: 'yarn dlx shadcn@latest add @navui/animated-tabs',\n  bun: 'bunx --bun shadcn@latest add @navui/animated-tabs',\n}\n\nexport function Example() {\n  return <PackageManagerCommand commands={commands} defaultValue=\"bun\" />\n}",
    "api": [
      {
        "prop": "commands",
        "type": "Partial<Record<PackageManagerId, string>>",
        "default": "-",
        "description": "Commands keyed by package manager. Managers without a command are omitted from the selector."
      },
      {
        "prop": "value / defaultValue / onValueChange",
        "type": "PackageManagerId / PackageManagerId / (value) => void",
        "default": "npm",
        "description": "Controlled or uncontrolled package-manager selection."
      },
      {
        "prop": "align",
        "type": "\"start\" | \"center\" | \"end\"",
        "default": "\"end\"",
        "description": "Alignment of the package-manager menu relative to the command bar."
      },
      {
        "prop": "copyLabel / resetDelay",
        "type": "string / number",
        "default": "Contextual / 1600",
        "description": "Customizes the accessible copy label and how long the status icon remains visible."
      },
      {
        "prop": "onCopySuccess / onCopyError",
        "type": "(command: string, packageManager: PackageManagerId) => void / (error: Error) => void",
        "default": "-",
        "description": "Optional callbacks for analytics or application-level clipboard handling."
      },
      {
        "prop": "className / commandClassName",
        "type": "string / string",
        "default": "-",
        "description": "Classes for the root and the copy-command button."
      }
    ],
    "notes": [
      "The same implementation powers NavUI installation controls. Supports keyboard navigation, controlled state, partial command sets, and clipboard failure feedback. Clipboard access requires a secure context."
    ],
    "preview": "components/examples/package-manager-command.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/package-manager-command/package-manager-command.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@radix-ui/react-use-controllable-state",
        "class-variance-authority",
        "cn",
        "lucide-react",
        "radix-ui"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/package-manager-command.tsx",
          "target": "components/navui/package-manager-command.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/primitives/radix/button.tsx",
          "target": "components/navui/primitives/radix/button.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/primitives/radix/dropdown-menu.tsx",
          "target": "components/navui/primitives/radix/dropdown-menu.tsx",
          "type": "registry:ui",
          "shared": true
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/proximity-nav",
    "registryName": "proximity-nav",
    "slug": "proximity-nav",
    "title": "Proximity Nav",
    "description": "A route-aware sidebar navigation whose guide lines stretch toward the pointer, with controlled active state and a navigation-free preview mode.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "navigation",
      "docs",
      "motion",
      "accessibility"
    ],
    "usageExample": "import { ProximityNav } from '@/components/navui/proximity-nav'\n\nconst items = [\n  { title: 'Introduction', href: '/docs/introduction' },\n  { title: 'Installation', href: '/docs/installation' },\n  { title: 'Components', href: '/docs/components' },\n]\n\nexport function DocsSidebar() {\n  return <ProximityNav items={items} label=\"Documentation\" />\n}",
    "api": [
      {
        "prop": "items",
        "type": "readonly ProximityNavItem[]",
        "default": "-",
        "description": "Navigation entries containing a title and destination href."
      },
      {
        "prop": "activeHref",
        "type": "string",
        "default": "Current pathname",
        "description": "Controlled active destination. When omitted, route navigation follows the current pathname."
      },
      {
        "prop": "defaultActiveHref",
        "type": "string",
        "default": "First item href",
        "description": "Initial active destination for the navigation-free, uncontrolled preview mode."
      },
      {
        "prop": "preventNavigation",
        "type": "boolean",
        "default": "false",
        "description": "Prevents route changes and prefetching so clicks can demonstrate active state in an embedded preview."
      },
      {
        "prop": "onActiveHrefChange",
        "type": "(href: string) => void",
        "default": "-",
        "description": "Called when an item is selected, for controlled state, analytics, or custom navigation behavior."
      },
      {
        "prop": "label",
        "type": "string",
        "default": "\"Navigation\"",
        "description": "Accessible label for the nav landmark."
      },
      {
        "prop": "className",
        "type": "string",
        "default": "-",
        "description": "Classes merged onto the navigation container."
      }
    ],
    "notes": [
      "Next.js-specific: uses next/link and usePathname, so it requires the Next.js App Router. Pass activeHref for explicit selection or preventNavigation for demonstrations. Keyboard focus and reduced motion are supported."
    ],
    "preview": "components/examples/proximity-nav.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/proximity-nav/proximity-nav.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "cn",
        "motion",
        "next"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/proximity-nav.tsx",
          "target": "components/navui/proximity-nav.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/rail-nav",
    "registryName": "rail-nav",
    "slug": "rail-nav",
    "title": "Rail Nav",
    "description": "A compact motion rail that preserves its line-to-link reveal while supporting anchors, application routes, custom observer targets, and controlled state.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "navigation",
      "docs",
      "motion",
      "accessibility"
    ],
    "usageExample": "import { RailNav } from '@/components/navui/rail-nav'\n\nconst items = [\n  { label: 'Introduction', href: '#introduction' },\n  { label: 'Installation', href: '#installation' },\n  { label: 'Usage', href: '#usage' },\n]\n\nexport function Example() {\n  return (\n    <RailNav\n      items={items}\n      label=\"On this page\"\n      className=\"fixed top-28 right-8\"\n    />\n  )\n}",
    "api": [
      {
        "prop": "RailNav",
        "type": "React.ComponentProps<\"aside\"> & RailNavProps",
        "default": "trackActive: true; defaultExpanded: false",
        "description": "Responsive rail with native aside props, the original reveal motion, and controlled active/expanded state."
      },
      {
        "prop": "items",
        "type": "readonly RailNavItem[]",
        "default": "-",
        "description": "Navigation entries with React labels, any link href, optional tracking targets, classes, and click handlers."
      },
      {
        "prop": "value / defaultValue / onValueChange",
        "type": "string / string / (value: string) => void",
        "default": "First item href",
        "description": "Controlled or uncontrolled active navigation value for anchors and application routes."
      },
      {
        "prop": "expanded / defaultExpanded / onExpandedChange",
        "type": "boolean / boolean / (expanded: boolean) => void",
        "default": "false",
        "description": "Controlled or uncontrolled expansion without changing the original hover and focus animation."
      },
      {
        "prop": "trackActive / observerOptions",
        "type": "boolean / IntersectionObserverInit",
        "default": "true / tuned viewport margins",
        "description": "Optional section tracking with configurable IntersectionObserver behavior and per-item selectors."
      },
      {
        "prop": "preventNavigation",
        "type": "boolean",
        "default": "false",
        "description": "Keeps selection local for embedded previews while preserving controlled active state."
      }
    ],
    "notes": [
      "Hover or keyboard focus expands the rail. Native anchors, controlled selection, optional scroll tracking, and reduced motion are preserved. Responsive visibility is left to the consumer."
    ],
    "preview": "components/examples/rail-nav-compact.tsx",
    "examples": [
      {
        "id": "scroll-tracking",
        "title": "Scroll tracking",
        "description": "A longer document with native anchor links and observed sections.",
        "source": "components/examples/rail-nav.tsx"
      }
    ],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/rail-nav/rail-nav.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@radix-ui/react-use-controllable-state",
        "cn",
        "motion"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/rail-nav.tsx",
          "target": "components/navui/rail-nav.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  },
  {
    "id": "components/segment-spotlight",
    "registryName": "segment-spotlight",
    "slug": "segment-spotlight",
    "title": "Segment Spotlight",
    "description": "A composable spotlight canvas for connecting floating content with an interactive toolbar in product tours, filters, workflows, and feature sections.",
    "category": "interactive",
    "status": "published",
    "tags": [
      "interactive",
      "marketing",
      "animation",
      "motion",
      "accessibility"
    ],
    "usageExample": "import { Flag, MessageCircle } from 'lucide-react'\n\nimport {\n  SegmentSpotlight,\n  SegmentSpotlightSegment,\n  SegmentSpotlightSeparator,\n  SegmentSpotlightToolbar,\n  SegmentSpotlightTrigger,\n  SegmentSpotlightViewport,\n} from '@/components/navui/segment-spotlight'\n\nexport function Example() {\n  return (\n    <SegmentSpotlight>\n      <SegmentSpotlightViewport>\n        <SegmentSpotlightSegment value=\"comments\" variant=\"blue\" className=\"top-16 left-[15%]\">\n          Comments\n        </SegmentSpotlightSegment>\n        <SegmentSpotlightSegment value=\"flags\" variant=\"teal\" className=\"right-[15%] bottom-16\">\n          Feature flags\n        </SegmentSpotlightSegment>\n\n        <SegmentSpotlightToolbar aria-label=\"Highlight capability\" className=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2\">\n          <SegmentSpotlightTrigger value=\"comments\" aria-label=\"Comments\">\n            <MessageCircle />\n          </SegmentSpotlightTrigger>\n          <SegmentSpotlightSeparator />\n          <SegmentSpotlightTrigger value=\"flags\" aria-label=\"Feature flags\">\n            <Flag />\n          </SegmentSpotlightTrigger>\n        </SegmentSpotlightToolbar>\n      </SegmentSpotlightViewport>\n    </SegmentSpotlight>\n  )\n}",
    "api": [
      {
        "prop": "SegmentSpotlight",
        "type": "React.ComponentProps<\"div\">",
        "default": "value: null; activationMode: \"hover\"",
        "description": "Root state provider. Supports value, defaultValue, onValueChange, activationMode (hover or click), and native div props."
      },
      {
        "prop": "SegmentSpotlightViewport",
        "type": "React.ComponentProps<\"div\">",
        "default": "-",
        "description": "Positioning canvas for segments, controls, grids, and custom content."
      },
      {
        "prop": "SegmentSpotlightSegment",
        "type": "Motion div props & { value; variant? }",
        "default": "variant: \"default\"",
        "description": "An animated target. Children, position, color variant, and Motion animation props are fully customizable."
      },
      {
        "prop": "SegmentSpotlightToolbar",
        "type": "Motion div props",
        "default": "-",
        "description": "Accessible toolbar container that resets hover state when interaction leaves."
      },
      {
        "prop": "SegmentSpotlightTrigger",
        "type": "Button props & { value; targets?; asChild? }",
        "default": "targets: [value]",
        "description": "Arbitrary toolbar control. targets can highlight one or many segments; asChild supports custom controls."
      },
      {
        "prop": "SegmentSpotlightGrid / Separator / Content",
        "type": "Native element props",
        "default": "-",
        "description": "Optional layout primitives for the background grid, toolbar grouping, and supporting content."
      }
    ],
    "notes": [
      "Use positioning classes to adjust segments at each breakpoint.",
      "Toolbar controls support focus, click, touch, and pressed-state announcements. Named color variants are retained from the original component. Respects reduced motion."
    ],
    "preview": "components/examples/segment-spotlight.tsx",
    "examples": [],
    "provenance": {
      "repository": "https://github.com/Navdeepannu/Portfolio",
      "commit": "c4fcc26d0fb10293cf549398e331cb5cc7ec350c",
      "path": "src/registry/components/segment-spotlight/segment-spotlight.tsx"
    },
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@radix-ui/react-use-controllable-state",
        "cn",
        "motion",
        "radix-ui"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/segment-spotlight.tsx",
          "target": "components/navui/segment-spotlight.tsx",
          "type": "registry:ui"
        },
        {
          "source": "registry/components/LICENSE",
          "target": "components/navui/LICENSE",
          "type": "registry:file",
          "shared": true
        }
      ]
    }
  }
] as const satisfies readonly ComponentCatalogEntry[];

export type ComponentSlug = (typeof componentCatalog)[number]["slug"];

export const registryCatalog = [...blockCatalog, ...componentCatalog];

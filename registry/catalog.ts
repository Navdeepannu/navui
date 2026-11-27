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
    "usageExample": "import { AnimatedNumber } from '@/components/navui/animated-numbers'\n\nexport function Example() {\n  return (\n    <div className=\"flex gap-8 text-4xl font-semibold\">\n      <AnimatedNumber value={38} suffix=\"%\" />\n      <AnimatedNumber value={3.2} suffix=\"\u00d7\" decimalPlaces={1} />\n      <AnimatedNumber value={125000} prefix=\"$\" duration={1.4} />\n    </div>\n  )\n}",
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
    "id": "components/button",
    "registryName": "button",
    "slug": "button",
    "category": "foundations",
    "status": "published",
    "tags": [
      "ui-sdk",
      "button",
      "accessibility"
    ],
    "preview": "components/examples/button.tsx",
    "examples": [],
    "title": "Button",
    "description": "A neutral UI SDK action with native form behavior, pending feedback, and composable rendering.",
    "usageExample": "import { Button } from '@/components/navui/button'\n\nexport function Example() {\n  return <Button onClick={() => console.log('Pressed')}>Create project</Button>\n}",
    "api": [
      {
        "prop": "variant",
        "type": "\"default\" | \"secondary\" | \"outline\" | \"ghost\"",
        "description": "Semantic appearance.",
        "default": "\"default\""
      },
      {
        "prop": "size",
        "type": "\"sm\" | \"default\" | \"lg\" | \"icon\"",
        "description": "Control size.",
        "default": "\"default\""
      },
      {
        "prop": "render / ref / onClick",
        "type": "UI SDK Button props",
        "description": "Use render to compose another element; return a Promise for pending feedback. Native type, disabled, and focusableWhenDisabled are forwarded.",
        "default": "\u2014"
      }
    ],
    "notes": [
      "UI SDK owns press, native form, pending, disabled, and render behavior. Icon-only controls require an accessible name."
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/button.tsx",
          "target": "components/navui/button.tsx",
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
    "id": "components/dialog",
    "registryName": "dialog",
    "slug": "dialog",
    "category": "foundations",
    "status": "published",
    "tags": [
      "ui-sdk",
      "dialog",
      "accessibility"
    ],
    "preview": "components/examples/dialog.tsx",
    "examples": [],
    "title": "Dialog",
    "description": "A focused UI SDK modal with named content, focus return, scroll containment, and SDK-owned transition presence.",
    "usageExample": "import { Dialog, DialogTrigger, DialogBackdrop, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/navui/dialog'\n\nexport function Example() {\n  return <Dialog>\n    <DialogTrigger>Project details</DialogTrigger>\n    <DialogBackdrop />\n    <DialogContent>\n      <DialogTitle>Project details</DialogTitle>\n      <DialogDescription>Review this project.</DialogDescription>\n      <DialogClose>Done</DialogClose>\n    </DialogContent>\n  </Dialog>\n}",
    "api": [
      {
        "prop": "Dialog",
        "type": "UI SDK Dialog props",
        "description": "Controlled/uncontrolled open state; onOpenChange(open, details) supports cancellation.",
        "default": "\u2014"
      },
      {
        "prop": "DialogContent",
        "type": "UI SDK content props",
        "description": "initialFocus, finalFocus, keepMounted, inline, container, refs, and render are forwarded.",
        "default": "\u2014"
      },
      {
        "prop": "DialogTitle / DialogDescription",
        "type": "UI SDK part props",
        "description": "Required contextual name and description.",
        "default": "\u2014"
      },
      {
        "prop": "DialogClose",
        "type": "UI SDK close props",
        "description": "Supports action and asynchronous pending dismissal.",
        "default": "\u2014"
      }
    ],
    "notes": [
      "SDK owns focus trapping, outside presses, Escape, modality, and exit presence. CSS uses data-starting-style and data-ending-style; reduced motion removes transitions."
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/dialog.tsx",
          "target": "components/navui/dialog.tsx",
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
        "type": "UI SDK Dialog props",
        "description": "Controlled/uncontrolled open state and cancelable onOpenChange(open, details).",
        "default": "\u2014"
      },
      {
        "prop": "ExpandableCardTrigger / Content",
        "type": "UI SDK trigger/content props",
        "description": "Card styling and shared-layout motion with SDK-owned dialog lifecycle. Content also takes showCloseButton, closeLabel, overlayClassName.",
        "default": "\u2014"
      },
      {
        "prop": "ExpandableCardMedia",
        "type": "Motion span props",
        "description": "Optional shared media paired by the root, disabled under reduced motion.",
        "default": "\u2014"
      },
      {
        "prop": "Header / Title / Description / Body / Footer / Close",
        "type": "Composable part props",
        "description": "Name and describe every dialog. Close uses SDK render and action.",
        "default": "\u2014"
      }
    ],
    "notes": [
      "SDK Dialog owns modal behavior, focus return, Escape, and presence. Motion only provides the paired card/media layout effect; reduced motion removes that effect.",
      "Breaking change: use SDK render, container and inline instead of Radix asChild, portalContainer and contained. Open callbacks receive SDK cancellation details."
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
        "cn",
        "lucide-react",
        "motion",
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17"
      ],
      "registryDependencies": [
        "@navui/dialog"
      ],
      "files": [
        {
          "source": "registry/components/expandable-card.tsx",
          "target": "components/navui/expandable-card.tsx",
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
    "usageExample": "'use client'\n\nimport { KeyboardShortcut } from '@/components/navui/keyboard-shortcut'\n\nconst commandKeys = [\n  { key: 'Meta', label: '\u2318' },\n  { key: 'k', label: 'K' },\n]\n\nexport function NavbarShortcut({ onOpenCommand }: { onOpenCommand: () => void }) {\n  return (\n    <button onClick={onOpenCommand} className=\"flex items-center gap-3 rounded-lg border px-3 py-2\">\n      Open command menu\n      <KeyboardShortcut keys={commandKeys} onTrigger={onOpenCommand} />\n    </button>\n  )\n}\n\nexport function RaisedShortcut() {\n  return (\n    <KeyboardShortcut\n      keys={[\n        { key: 'Shift', label: '\u21e7' },\n        { key: 'p', label: 'P' },\n      ]}\n      sound=\"/sounds/key-press.mp3\"\n      keyClassName=\"size-10 rounded-md shadow-sm\"\n    />\n  )\n}",
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
      },
      {
        "prop": "allowInEditable",
        "type": "boolean",
        "description": "Allow shortcuts inside inputs, textareas, selects and contenteditable.",
        "default": "false"
      }
    ],
    "notes": [
      "Uses the public SDK matchesShortcut helper for exact modifier chords. Editable fields and IME composition are ignored by default; allowInEditable is an explicit opt-in. Listeners are removed on unmount."
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
        "cn",
        "@ui-sdk/core@0.1.0-beta.17"
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
    "usageExample": "import { MagneticButton } from '@/components/navui/magnetic-button'\n\nexport function Example() {\n  return <MagneticButton movement={8} variant=\"outline\" render={<a href=\"/docs\" />}>Documentation</MagneticButton>\n}",
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
        "description": "The complete shadcn Button API, including variant, size, render, refs, event handlers, disabled, and native button props."
      }
    ],
    "notes": [
      "Pointer enhancement over canonical NavUI Button. Disabled and reduced-motion states return the wrapper to its origin.",
      "Breaking change: use render instead of asChild. Button callbacks, refs, form props, pending, and disabled semantics use the installed SDK."
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
        "cn",
        "motion",
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17"
      ],
      "registryDependencies": [
        "@navui/button"
      ],
      "files": [
        {
          "source": "registry/components/magnetic-button.tsx",
          "target": "components/navui/magnetic-button.tsx",
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
        "default": "defaultActiveHref / first item",
        "description": "Controlled active destination. When omitted, selection starts at defaultActiveHref or the first item."
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
      "Framework-independent native links. Pass activeHref from your router for route tracking. preventNavigation demonstrates local selection. Pointer and focus effects respect reduced motion."
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
        "motion"
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
        "description": "Navigation entries with React labels, any link href, optional heading depth, tracking targets, classes, and click handlers."
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
      },
      {
        "prop": "touchToggle",
        "type": "boolean",
        "default": "false",
        "description": "Adds a compact explicit disclosure control for touch-first layouts."
      }
    ],
    "notes": [
      "Hover or keyboard focus expands the rail. Native anchors, controlled selection, optional scroll tracking, and reduced motion are preserved. Items without depth keep the original indicator lengths. Responsive visibility is left to the consumer."
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
    "id": "components/tabs",
    "registryName": "tabs",
    "slug": "tabs",
    "category": "foundations",
    "status": "published",
    "tags": [
      "ui-sdk",
      "tabs",
      "accessibility"
    ],
    "preview": "components/examples/tabs.tsx",
    "examples": [
      {
        "id": "variants",
        "title": "Controlled and vertical",
        "description": "Manual activation, controlled selection, disabled state, and vertical navigation.",
        "source": "components/examples/tabs-variants.tsx"
      }
    ],
    "title": "Tabs",
    "description": "Accessible UI SDK tabs with a measured moving indicator, horizontal or vertical layouts, and subtle panel transitions.",
    "usageExample": "import { Tabs, TabsList, TabsTab, TabsPanel, TabsIndicator } from '@/components/navui/tabs'\n\nexport function Example() {\n  return <Tabs defaultValue=\"overview\">\n    <TabsList aria-label=\"Project\">\n      <TabsTab value=\"overview\">Overview</TabsTab>\n      <TabsTab value=\"activity\">Activity</TabsTab>\n      <TabsIndicator />\n    </TabsList>\n    <TabsPanel value=\"overview\">Project overview</TabsPanel>\n    <TabsPanel value=\"activity\">Recent activity</TabsPanel>\n  </Tabs>\n}",
    "api": [
      {
        "prop": "Tabs",
        "type": "UI SDK Tabs props",
        "description": "value/defaultValue are string or null; onValueChange(value, details) supports cancellation. activation replaces the legacy activationMode prop.",
        "default": "\u2014"
      },
      {
        "prop": "TabsList / TabsTab",
        "type": "UI SDK part props",
        "description": "Name the list; pair each tab and panel by value. Supports disabled tabs and vertical orientation.",
        "default": "\u2014"
      },
      {
        "prop": "TabsIndicator",
        "type": "UI SDK indicator props",
        "description": "Optional measured indicator; uses SDK position variables, including RTL.",
        "default": "\u2014"
      },
      {
        "prop": "TabsPanel",
        "type": "UI SDK panel props",
        "description": "Use keepMounted to preserve panel state. SDK owns hidden/inert and exit presence.",
        "default": "\u2014"
      }
    ],
    "notes": [
      "Consolidates Animated Tabs. There is no separate selection, keyboard, measurement, or presence controller. Root and part props use the installed SDK API; reduced motion disables movement."
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/tabs.tsx",
          "target": "components/navui/tabs.tsx",
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
    "id": "components/field",
    "registryName": "field",
    "slug": "field",
    "title": "Field",
    "description": "Labels, descriptions, errors and field sets connected by UI SDK.",
    "category": "forms",
    "status": "published",
    "tags": [
      "ui-sdk",
      "forms",
      "field",
      "accessibility"
    ],
    "usageExample": "\"use client\";\nimport {\n  Field,\n  FieldLabel,\n  FieldDescription,\n} from \"@/components/navui/field\";\nimport { Input } from \"@/components/navui/input\";\nexport default function Example() {\n  return (\n    <Field className=\"w-full max-w-sm p-6\" name=\"field-email\">\n      <FieldLabel>Email address</FieldLabel>\n      <Input type=\"email\" placeholder=\"you@example.com\" />\n      <FieldDescription>Used for project updates.</FieldDescription>\n    </Field>\n  );\n}\n",
    "api": [
      {
        "prop": "name / disabled / invalid",
        "type": "FieldOptions",
        "default": "SDK default",
        "description": "Connect one SDK control per Field. Set invalid only when the consuming application owns validation."
      },
      {
        "prop": "FieldLabel / FieldDescription / FieldError",
        "type": "SDK parts",
        "default": "SDK default",
        "description": "SDK manages IDs and error associations. FieldError match accepts native validity keys or a boolean."
      },
      {
        "prop": "FieldGroup / FieldSet / FieldLegend",
        "type": "SDK parts",
        "default": "SDK default",
        "description": "Group layout; use a field set and first-child legend for related controls."
      }
    ],
    "notes": [
      "Use a visible associated label. Field wires labels, descriptions and visible errors without manual IDs.",
      "Validation policy belongs to the consuming form. Reset is native; controlled controls reset their state in the consuming form.",
      "Styles use neutral semantic tokens. Motion is CSS only and gated by prefers-reduced-motion."
    ],
    "preview": "components/examples/field.tsx",
    "examples": [
      {
        "id": "states",
        "title": "Practical states",
        "description": "Validation, reset and useful control states.",
        "source": "components/examples/field-states.tsx"
      }
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/field.tsx",
          "target": "components/navui/field.tsx",
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
    "id": "components/input",
    "registryName": "input",
    "slug": "input",
    "title": "Input",
    "description": "A native text input with consistent focus, invalid and disabled styling.",
    "category": "forms",
    "status": "published",
    "tags": [
      "ui-sdk",
      "forms",
      "input",
      "accessibility"
    ],
    "usageExample": "\"use client\";\nimport {\n  Field,\n  FieldLabel,\n  FieldDescription,\n} from \"@/components/navui/field\";\nimport { Input } from \"@/components/navui/input\";\nexport default function Example() {\n  return (\n    <Field className=\"w-full max-w-sm p-6\" name=\"input-email\">\n      <FieldLabel>Email address</FieldLabel>\n      <Input type=\"email\" placeholder=\"you@example.com\" />\n      <FieldDescription>Used for project updates.</FieldDescription>\n    </Field>\n  );\n}\n",
    "api": [
      {
        "prop": "value / defaultValue / onValueChange",
        "type": "string / (value, details) => void",
        "default": "SDK default",
        "description": "Controlled or uncontrolled. Reset controlled text in the consuming form reset handler. details.cancel() rejects edits."
      },
      {
        "prop": "ref / type / required / disabled / readOnly",
        "type": "Native input props",
        "default": "SDK default",
        "description": "Native form participation and forwarded input ref."
      },
      {
        "prop": "className / render",
        "type": "SDK part callbacks",
        "default": "SDK default",
        "description": "Callbacks receive SDK input state; render forwards native props and ref."
      }
    ],
    "notes": [
      "Use a visible associated label. Field wires labels, descriptions and visible errors without manual IDs.",
      "Validation policy belongs to the consuming form. Reset is native; controlled controls reset their state in the consuming form.",
      "Styles use neutral semantic tokens. Motion is CSS only and gated by prefers-reduced-motion."
    ],
    "preview": "components/examples/input.tsx",
    "examples": [
      {
        "id": "states",
        "title": "Practical states",
        "description": "Validation, reset and useful control states.",
        "source": "components/examples/input-states.tsx"
      }
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/input.tsx",
          "target": "components/navui/input.tsx",
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
    "id": "components/select",
    "registryName": "select",
    "slug": "select",
    "title": "Select",
    "description": "Composable typed single and multiple selection with SDK keyboard and form behavior.",
    "category": "forms",
    "status": "published",
    "tags": [
      "ui-sdk",
      "forms",
      "select",
      "accessibility"
    ],
    "usageExample": "\"use client\";\nimport {\n  Select,\n  SelectTrigger,\n  SelectValue,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectItemIndicator,\n} from \"@/components/navui/select\";\nimport {\n  Field,\n  FieldLabel,\n} from \"@/components/navui/field\";\nimport { CheckIcon, ChevronDownIcon } from \"lucide-react\";\nconst regions = [\"Canada\", \"Europe\", \"United States\"];\nexport default function Example() {\n  return (\n    <Field className=\"w-full max-w-sm p-6\">\n      <FieldLabel>Region</FieldLabel>\n      <Select items={regions} defaultValue=\"Canada\">\n        <SelectTrigger>\n          <SelectValue />\n          <ChevronDownIcon aria-hidden=\"true\" />\n        </SelectTrigger>\n        <SelectContent sideOffset={6}>\n          <SelectGroup>\n            {regions.map((value) => (\n              <SelectItem key={value} value={value}>\n                {value}\n                <SelectItemIndicator>\n                  <CheckIcon aria-hidden=\"true\" />\n                </SelectItemIndicator>\n              </SelectItem>\n            ))}\n          </SelectGroup>\n        </SelectContent>\n      </Select>\n    </Field>\n  );\n}\n",
    "api": [
      {
        "prop": "Select<T, Multiple>",
        "type": "SDK SelectProps<T, Multiple>",
        "default": "SDK default",
        "description": "Original generic root: single value T | null; multiple values T[]. Keep items on root for SSR labels."
      },
      {
        "prop": "value / defaultValue / onValueChange",
        "type": "T | null or T[] / change callback",
        "default": "SDK default",
        "description": "SDK owns selection, cancellation and reset; reset controlled values in the consuming form."
      },
      {
        "prop": "SelectTrigger / SelectValue",
        "type": "SDK part props",
        "default": "SDK default",
        "description": "Name via FieldLabel. Value supports placeholder, maxLabels and state callbacks."
      },
      {
        "prop": "SelectContent / SelectGroup / SelectItem<T>",
        "type": "SDK part props",
        "default": "SDK default",
        "description": "Scrollable popup and wrapped options. Disabled items are skipped. Content supports positioning and presence props."
      },
      {
        "prop": "SelectItemIndicator / SelectGroupLabel",
        "type": "SDK parts",
        "default": "SDK default",
        "description": "Compose indicators and named groups. Indicators accept children and state callbacks."
      }
    ],
    "notes": [
      "Use a visible associated label. Field wires labels, descriptions and visible errors without manual IDs.",
      "Validation policy belongs to the consuming form. Reset is native; controlled controls reset their state in the consuming form.",
      "Styles use neutral semantic tokens. Motion is CSS only and gated by prefers-reduced-motion."
    ],
    "preview": "components/examples/select.tsx",
    "examples": [
      {
        "id": "states",
        "title": "Practical states",
        "description": "Validation, reset and useful control states.",
        "source": "components/examples/select-states.tsx"
      }
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/select.tsx",
          "target": "components/navui/select.tsx",
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
    "id": "components/checkbox",
    "registryName": "checkbox",
    "slug": "checkbox",
    "title": "Checkbox",
    "description": "A styled checkbox with checked, mixed, required and native form states.",
    "category": "forms",
    "status": "published",
    "tags": [
      "ui-sdk",
      "forms",
      "checkbox",
      "accessibility"
    ],
    "usageExample": "\"use client\";\nimport { Checkbox } from \"@/components/navui/checkbox\";\nimport {\n  Field,\n  FieldLabel,\n} from \"@/components/navui/field\";\nexport default function Example() {\n  return (\n    <Field className=\"flex-row items-center gap-3 p-6\">\n      <Checkbox />\n      <FieldLabel>Deployment notifications</FieldLabel>\n    </Field>\n  );\n}\n",
    "api": [
      {
        "prop": "checked / defaultChecked",
        "type": "boolean | \"indeterminate\"",
        "default": "SDK default",
        "description": "SDK-supported mixed state; a press checks it. Reset controlled values in the consuming form."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked, details) => void",
        "default": "SDK default",
        "description": "Cancellation and reset reasons are forwarded."
      },
      {
        "prop": "name / value / required / disabled / readOnly",
        "type": "SDK form props",
        "default": "SDK default",
        "description": "Only checked, enabled controls submit. Label and describe through Field."
      },
      {
        "prop": "children / className / render / ref",
        "type": "SDK part props",
        "default": "SDK default",
        "description": "Default indicator includes check/mixed icons. Custom children replace it; CheckboxIndicator is exported."
      }
    ],
    "notes": [
      "Use a visible associated label. Field wires labels, descriptions and visible errors without manual IDs.",
      "Validation policy belongs to the consuming form. Reset is native; controlled controls reset their state in the consuming form.",
      "Styles use neutral semantic tokens. Motion is CSS only and gated by prefers-reduced-motion."
    ],
    "preview": "components/examples/checkbox.tsx",
    "examples": [
      {
        "id": "states",
        "title": "Practical states",
        "description": "Validation, reset and useful control states.",
        "source": "components/examples/checkbox-states.tsx"
      }
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn",
        "lucide-react"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/checkbox.tsx",
          "target": "components/navui/checkbox.tsx",
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
    "id": "components/switch",
    "registryName": "switch",
    "slug": "switch",
    "title": "Switch",
    "description": "A compact on/off setting with labelled, disabled and native form behavior.",
    "category": "forms",
    "status": "published",
    "tags": [
      "ui-sdk",
      "forms",
      "switch",
      "accessibility"
    ],
    "usageExample": "\"use client\";\nimport { Switch } from \"@/components/navui/switch\";\nimport {\n  Field,\n  FieldLabel,\n} from \"@/components/navui/field\";\nexport default function Example() {\n  return (\n    <Field className=\"flex-row items-center gap-3 p-6\">\n      <Switch />\n      <FieldLabel>Preview deployments</FieldLabel>\n    </Field>\n  );\n}\n",
    "api": [
      {
        "prop": "checked / defaultChecked",
        "type": "boolean",
        "default": "SDK default",
        "description": "Controlled or uncontrolled. Reset controlled values in the consuming form."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked, details) => void",
        "default": "SDK default",
        "description": "SDK cancellation and reset reasons are forwarded."
      },
      {
        "prop": "name / value / required / disabled / readOnly",
        "type": "SDK form props",
        "default": "SDK default",
        "description": "Checked controls submit; disabled controls are omitted. Use a stable setting label."
      },
      {
        "prop": "children / className / render / ref",
        "type": "SDK part props",
        "default": "SDK default",
        "description": "Default thumb respects RTL and reduced motion; SwitchThumb is exported for custom composition."
      }
    ],
    "notes": [
      "Use a visible associated label. Field wires labels, descriptions and visible errors without manual IDs.",
      "Validation policy belongs to the consuming form. Reset is native; controlled controls reset their state in the consuming form.",
      "Styles use neutral semantic tokens. Motion is CSS only and gated by prefers-reduced-motion."
    ],
    "preview": "components/examples/switch.tsx",
    "examples": [
      {
        "id": "states",
        "title": "Practical states",
        "description": "Validation, reset and useful control states.",
        "source": "components/examples/switch-states.tsx"
      }
    ],
    "registry": {
      "type": "registry:ui",
      "dependencies": [
        "@ui-sdk/core@0.1.0-beta.17",
        "@ui-sdk/react@0.1.0-beta.17",
        "cn"
      ],
      "registryDependencies": [],
      "files": [
        {
          "source": "registry/components/switch.tsx",
          "target": "components/navui/switch.tsx",
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

export const retiredComponents = [{ slug: "animated-tabs", replacement: "tabs" }, { slug: "package-manager-command" }, { slug: "segment-spotlight" }] as const;

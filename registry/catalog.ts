import type { BlockCategoryId } from "@/registry/categories";
import type { BlockCatalogEntry, RegistryFile } from "@/registry/types";

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

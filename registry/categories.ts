export const blockCategories = [
  {
    id: "header",
    name: "Headers",
    description: "Responsive site navigation and announcement headers.",
  },
  {
    id: "hero",
    name: "Hero sections",
    description: "Clear opening sections for products, services, and launches.",
  },
  {
    id: "logo-cloud",
    name: "Logo clouds",
    description: "Partner, customer, and integration logo collections.",
  },
  {
    id: "features",
    name: "Features",
    description: "Product benefits, capabilities, and feature comparisons.",
  },
  {
    id: "content",
    name: "Content",
    description: "Long-form product, company, and editorial sections.",
  },
  {
    id: "stats",
    name: "Stats",
    description: "Credible metrics and supporting performance summaries.",
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Plans, billing options, and tier comparisons.",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer quotes and proof presented with restraint.",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Article lists, featured writing, and editorial archives.",
  },
  {
    id: "teams",
    name: "Teams",
    description: "People, roles, and leadership introductions.",
  },
  {
    id: "cta",
    name: "Calls to action",
    description: "Focused conversion sections with one clear next step.",
  },
  {
    id: "faqs",
    name: "FAQs",
    description: "Accessible answers for common product questions.",
  },
  {
    id: "contact",
    name: "Contact",
    description: "Contact, sales, and support entry points.",
  },
  {
    id: "login",
    name: "Login",
    description: "Sign-in screens and authentication entry points.",
  },
  {
    id: "sign-up",
    name: "Sign up",
    description: "Account creation and onboarding forms.",
  },
  {
    id: "forgot-password",
    name: "Password recovery",
    description: "Password reset and account recovery flows.",
  },
  {
    id: "footer",
    name: "Footers",
    description: "Site maps, legal links, and closing calls to action.",
  },
] as const;

export type BlockCategoryId = (typeof blockCategories)[number]["id"];

export type BlockCategory = (typeof blockCategories)[number];

export function isBlockCategoryId(value: string): value is BlockCategoryId {
  return blockCategories.some((category) => category.id === value);
}

export function getBlockCategory(id: BlockCategoryId) {
  return blockCategories.find((category) => category.id === id);
}

# Portfolio block migration inventory

This inventory maps the active `blockItems` from the Portfolio repository to the standalone NavUI catalog. The target catalog, not this document, remains the executable source of truth.

- Source: `Navdeepannu/Portfolio`, branch `main`, commit `c4fcc26d0fb10293cf549398e331cb5cc7ec350c`
- Target design system: Base
- Active source blocks: 45
- Included target blocks: 45
- Primitive variants: the source inventory did not declare block-level primitive variants. Migrated blocks use the target project's Base UI primitives without inventing Radix or React Aria variants.
- Exclusion: `content-section-six` exists as a support item in the source repository but is not part of the active `blockItems` registry, so it is intentionally not migrated.

| Source block | Target registry item | Category | Source files | Registry dependencies | NPM dependencies | Primitive variant | Preview status | Migration status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| blog-section-one | base-blog-section-one | blog | blog-section-one.tsx | — | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| contact-section-one | base-contact-section-one | contact | contact-section-one.tsx | — | lucide-react | Base UI | Pending browser QA | Migrated |
| contact-section-two | base-contact-section-two | contact | contact-section-two.tsx | — | — | Base UI | Pending browser QA | Migrated |
| contact-section-three | base-contact-section-three | contact | contact-section-three.tsx | — | — | Base UI | Pending browser QA | Migrated |
| contact-section-four | base-contact-section-four | contact | contact-section-four.tsx | button, input, label, textarea | — | Base UI | Pending browser QA | Migrated |
| content-section-one | base-content-section-one | content | content-section-one.tsx<br>content-section-one-designed-for-focus-illustration.tsx<br>content-section-one-fast-by-default-illustration.tsx<br>content-section-one-flexible-at-scale-illustration.tsx | — | motion | Base UI | Pending browser QA | Migrated |
| content-section-two | base-content-section-two | content | content-section-two.tsx | — | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| content-section-three | base-content-section-three | content | content-section-three.tsx<br>content-section-three-release-workflow-illustration.tsx | — | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| content-section-four | base-content-section-four | content | content-section-four.tsx<br>content-section-four-revision-cycles-illustration.tsx | — | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| content-section-five | base-content-section-five | content | content-section-five.tsx | — | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| cta-section-one | base-cta-section-one | cta | cta-section-one.tsx | button | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| cta-section-two | base-cta-section-two | cta | cta-section-two.tsx | button | cn | Base UI | Pending browser QA | Migrated |
| cta-section-three | base-cta-section-three | cta | cta-section-three.tsx | button | cn | Base UI | Pending browser QA | Migrated |
| faq-section-one | base-faq-section-one | faqs | faq-section-one.tsx | accordion | — | Base UI | Pending browser QA | Migrated |
| faqs-section-two | base-faqs-section-two | faqs | faqs-section-two.tsx | accordion | — | Base UI | Pending browser QA | Migrated |
| faq-section-three | base-faq-section-three | faqs | faq-section-three.tsx | accordion | — | Base UI | Pending browser QA | Migrated |
| feature-section-two | base-feature-section-two | features | feature-section-two.tsx | — | cn, motion | Base UI | Pending browser QA | Migrated |
| footer-section-one | base-footer-section-one | footer | footer-section-one.tsx<br>footer-section-one-logo.tsx | button | lucide-react | Base UI | Pending browser QA | Migrated |
| footer-section-two | base-footer-section-two | footer | footer-section-two.tsx<br>footer-section-two-logo.tsx | — | lucide-react | Base UI | Pending browser QA | Migrated |
| forgot-password-one | base-forgot-password-one | forgot-password | forgot-password-one.tsx | button, input, label | lucide-react | Base UI | Pending browser QA | Migrated |
| forgot-password-two | base-forgot-password-two | forgot-password | forgot-password-two.tsx | button, input, label | lucide-react | Base UI | Pending browser QA | Migrated |
| forgot-password-three | base-forgot-password-three | forgot-password | forgot-password-three.tsx | button, input, label | lucide-react | Base UI | Pending browser QA | Migrated |
| header-one | base-header-one | header | header-one.tsx<br>header-one-logo.tsx | button | lucide-react, motion | Base UI | Pending browser QA | Migrated |
| header-two | base-header-two | header | header-two.tsx<br>header-two-logo.tsx | button | lucide-react, motion | Base UI | Pending browser QA | Migrated |
| header-three | base-header-three | header | header-three.tsx | button, navigation-menu | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| header-four | base-header-four | header | header-four.tsx | button, navigation-menu | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| hero-section-one | base-hero-section-one | hero | hero-section-one.tsx<br>hero-section-one-header.tsx<br>hero-section-one-logo.tsx | badge, button | lucide-react, motion | Base UI | Pending browser QA | Migrated |
| hero-section-two | base-hero-section-two | hero | hero-section-two.tsx<br>hero-section-two-animated-group.tsx<br>hero-section-two-header.tsx<br>hero-section-two-logo.tsx<br>hero-section-two-text-effect.tsx | button | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| hero-section-three | base-hero-section-three | hero | hero-section-three.tsx | button | lucide-react, shaders | Base UI | Pending browser QA | Migrated |
| hero-section-four | base-hero-section-four | hero | hero-section-four.tsx<br>hero-section-four-header.tsx<br>hero-section-four-illustration.tsx<br>hero-section-four-logo-cloud.tsx | button, label, navigation-menu | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| logo-cloud-one | base-logo-cloud-one | logo-cloud | logo-cloud-one.tsx | — | — | Base UI | Pending browser QA | Migrated |
| logo-cloud-two | base-logo-cloud-two | logo-cloud | logo-cloud-two.tsx | — | lucide-react | Base UI | Pending browser QA | Migrated |
| logo-cloud-three | base-logo-cloud-three | logo-cloud | logo-cloud-three.tsx | — | — | Base UI | Pending browser QA | Migrated |
| logo-cloud-four | base-logo-cloud-four | logo-cloud | logo-cloud-four.tsx | — | cn, motion | Base UI | Pending browser QA | Migrated |
| logo-cloud-five | base-logo-cloud-five | logo-cloud | logo-cloud-five.tsx | — | motion | Base UI | Pending browser QA | Migrated |
| pricing-section-one | base-pricing-section-one | pricing | pricing-section-one.tsx<br>pricing-section-one-animated-number.tsx | badge, button, card | cn, lucide-react, motion | Base UI | Pending browser QA | Migrated |
| sign-up-one | base-sign-up-one | sign-up | sign-up-one.tsx<br>sign-up-one-logo.tsx | button, input, label | cn, lucide-react | Base UI | Pending browser QA | Migrated |
| sign-up-two | base-sign-up-two | sign-up | sign-up-two.tsx<br>sign-up-two-logo.tsx | button, input, label | cn, lucide-react, shaders | Base UI | Pending browser QA | Migrated |
| stats-section-one | base-stats-section-one | stats | stats-section-one.tsx | — | cn, motion | Base UI | Pending browser QA | Migrated |
| teams-section-one | base-teams-section-one | teams | teams-section-one.tsx | — | — | Base UI | Pending browser QA | Migrated |
| teams-section-two | base-teams-section-two | teams | teams-section-two.tsx | — | — | Base UI | Pending browser QA | Migrated |
| teams-section-three | base-teams-section-three | teams | teams-section-three.tsx | — | — | Base UI | Pending browser QA | Migrated |
| teams-section-four | base-teams-section-four | teams | teams-section-four.tsx | badge | — | Base UI | Pending browser QA | Migrated |
| teams-section-five | base-teams-section-five | teams | teams-section-five.tsx | badge | — | Base UI | Pending browser QA | Migrated |
| testimonial-section-one | base-testimonial-section-one | testimonials | testimonial-section-one.tsx | badge, button | lucide-react | Base UI | Pending browser QA | Migrated |

The source's misspelled `testamonial-section-one` identifier is normalized to `testimonial-section-one` in the target because the user-facing migration inventory and standalone category architecture use the corrected name. The source files and visual implementation remain the basis of the migrated block.

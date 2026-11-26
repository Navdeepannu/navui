import type { ComponentType } from "react";

import BlogSectionOne from "@/registry/blocks/base/blog/blog-section-one/blog-section-one";
import ContactSectionFour from "@/registry/blocks/base/contact/contact-section-four/contact-section-four";
import ContactSectionOne from "@/registry/blocks/base/contact/contact-section-one/contact-section-one";
import ContactSectionThree from "@/registry/blocks/base/contact/contact-section-three/contact-section-three";
import ContactSectionTwo from "@/registry/blocks/base/contact/contact-section-two/contact-section-two";
import ContentSectionFive from "@/registry/blocks/base/content/content-section-five/content-section-five";
import ContentSectionFour from "@/registry/blocks/base/content/content-section-four/content-section-four";
import ContentSectionOne from "@/registry/blocks/base/content/content-section-one/content-section-one";
import ContentSectionThree from "@/registry/blocks/base/content/content-section-three/content-section-three";
import ContentSectionTwo from "@/registry/blocks/base/content/content-section-two/content-section-two";
import CtaSectionOne from "@/registry/blocks/base/cta/cta-section-one/cta-section-one";
import CtaSectionThree from "@/registry/blocks/base/cta/cta-section-three/cta-section-three";
import CtaSectionTwo from "@/registry/blocks/base/cta/cta-section-two/cta-section-two";
import FaqSectionOne from "@/registry/blocks/base/faqs/faq-section-one/faq-section-one";
import FaqSectionThree from "@/registry/blocks/base/faqs/faq-section-three/faq-section-three";
import FaqsSectionTwo from "@/registry/blocks/base/faqs/faqs-section-two/faqs-section-two";
import FeatureSectionTwo from "@/registry/blocks/base/features/feature-section-two/feature-section-two";
import FooterSectionOne from "@/registry/blocks/base/footer/footer-section-one/footer-section-one";
import FooterSectionTwo from "@/registry/blocks/base/footer/footer-section-two/footer-section-two";
import ForgotPasswordOne from "@/registry/blocks/base/forgot-password/forgot-password-one/forgot-password-one";
import ForgotPasswordThree from "@/registry/blocks/base/forgot-password/forgot-password-three/forgot-password-three";
import ForgotPasswordTwo from "@/registry/blocks/base/forgot-password/forgot-password-two/forgot-password-two";
import HeaderFour from "@/registry/blocks/base/header/header-four/header-four";
import HeaderOne from "@/registry/blocks/base/header/header-one/header-one";
import HeaderThree from "@/registry/blocks/base/header/header-three/header-three";
import HeaderTwo from "@/registry/blocks/base/header/header-two/header-two";
import HeroSectionFour from "@/registry/blocks/base/hero/hero-section-four/hero-section-four";
import HeroSectionOne from "@/registry/blocks/base/hero/hero-section-one/hero-section-one";
import HeroSectionThree from "@/registry/blocks/base/hero/hero-section-three/hero-section-three";
import HeroSectionTwo from "@/registry/blocks/base/hero/hero-section-two/hero-section-two";
import LogoCloudFive from "@/registry/blocks/base/logo-cloud/logo-cloud-five/logo-cloud-five";
import LogoCloudFour from "@/registry/blocks/base/logo-cloud/logo-cloud-four/logo-cloud-four";
import LogoCloudOne from "@/registry/blocks/base/logo-cloud/logo-cloud-one/logo-cloud-one";
import LogoCloudThree from "@/registry/blocks/base/logo-cloud/logo-cloud-three/logo-cloud-three";
import LogoCloudTwo from "@/registry/blocks/base/logo-cloud/logo-cloud-two/logo-cloud-two";
import PricingSectionOne from "@/registry/blocks/base/pricing/pricing-section-one/pricing-section-one";
import SignUpOne from "@/registry/blocks/base/sign-up/sign-up-one/sign-up-one";
import SignUpTwo from "@/registry/blocks/base/sign-up/sign-up-two/sign-up-two";
import StatsSectionOne from "@/registry/blocks/base/stats/stats-section-one/stats-section-one";
import TeamsSectionFive from "@/registry/blocks/base/teams/teams-section-five/teams-section-five";
import TeamsSectionFour from "@/registry/blocks/base/teams/teams-section-four/teams-section-four";
import TeamsSectionOne from "@/registry/blocks/base/teams/teams-section-one/teams-section-one";
import TeamsSectionThree from "@/registry/blocks/base/teams/teams-section-three/teams-section-three";
import TeamsSectionTwo from "@/registry/blocks/base/teams/teams-section-two/teams-section-two";
import TestimonialSectionOne from "@/registry/blocks/base/testimonials/testimonial-section-one/testimonial-section-one";
import type { BlockId } from "@/registry/catalog";

export const blockComponents = {
  "base/blog-section-one": BlogSectionOne,
  "base/contact-section-one": ContactSectionOne,
  "base/contact-section-two": ContactSectionTwo,
  "base/contact-section-three": ContactSectionThree,
  "base/contact-section-four": ContactSectionFour,
  "base/content-section-one": ContentSectionOne,
  "base/content-section-two": ContentSectionTwo,
  "base/content-section-three": ContentSectionThree,
  "base/content-section-four": ContentSectionFour,
  "base/content-section-five": ContentSectionFive,
  "base/cta-section-one": CtaSectionOne,
  "base/cta-section-two": CtaSectionTwo,
  "base/cta-section-three": CtaSectionThree,
  "base/faq-section-one": FaqSectionOne,
  "base/faqs-section-two": FaqsSectionTwo,
  "base/faq-section-three": FaqSectionThree,
  "base/feature-section-two": FeatureSectionTwo,
  "base/footer-section-one": FooterSectionOne,
  "base/footer-section-two": FooterSectionTwo,
  "base/forgot-password-one": ForgotPasswordOne,
  "base/forgot-password-two": ForgotPasswordTwo,
  "base/forgot-password-three": ForgotPasswordThree,
  "base/header-one": HeaderOne,
  "base/header-two": HeaderTwo,
  "base/header-three": HeaderThree,
  "base/header-four": HeaderFour,
  "base/hero-section-one": HeroSectionOne,
  "base/hero-section-two": HeroSectionTwo,
  "base/hero-section-three": HeroSectionThree,
  "base/hero-section-four": HeroSectionFour,
  "base/logo-cloud-one": LogoCloudOne,
  "base/logo-cloud-two": LogoCloudTwo,
  "base/logo-cloud-three": LogoCloudThree,
  "base/logo-cloud-four": LogoCloudFour,
  "base/logo-cloud-five": LogoCloudFive,
  "base/pricing-section-one": PricingSectionOne,
  "base/sign-up-one": SignUpOne,
  "base/sign-up-two": SignUpTwo,
  "base/stats-section-one": StatsSectionOne,
  "base/teams-section-one": TeamsSectionOne,
  "base/teams-section-two": TeamsSectionTwo,
  "base/teams-section-three": TeamsSectionThree,
  "base/teams-section-four": TeamsSectionFour,
  "base/teams-section-five": TeamsSectionFive,
  "base/testimonial-section-one": TestimonialSectionOne,
} satisfies Record<BlockId, ComponentType>;

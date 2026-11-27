import { cache } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

export const highlightCode = cache(
  async (code: string, language: BundledLanguage = "tsx") =>
    codeToHtml(code, {
      lang: language,
      themes: { light: "github-light-default", dark: "vesper" },
    }),
);

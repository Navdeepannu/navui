import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Browse reusable NavUI blocks on one neutral foundation with light and dark modes.",
};

export default function BlocksPage() {
  redirect("/blocks/base");
}

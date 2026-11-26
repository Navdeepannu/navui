import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Browse reusable NavUI blocks across the free Base and Iris systems and the paid Pro system.",
};

export default function BlocksPage() {
  redirect("/blocks/base");
}

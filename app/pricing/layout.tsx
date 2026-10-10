import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Vextor Code pricing: Hobby is free forever, Pro is $20 per month and Teams is $40 per user per month.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | Vextor Code", description: "Vextor Code pricing: Hobby is free forever, Pro is $20 per month and Teams is $40 per user per month.", url: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

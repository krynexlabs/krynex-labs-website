import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Product Inquiries",
  description:
    "Connect with Krynex Labs for software product trials, subscription licensing, industry problem proposals, or partnership inquiries. Headquartered in AHMEDABAD (IN).",
  alternates: {
    canonical: "https://www.krynexlabs.in/contact",
  },
  openGraph: {
    title: "Contact & Product Inquiries | Krynex Labs",
    description:
      "Connect with Krynex Labs for software product trials, subscription licensing, or industry problem proposals.",
    url: "https://www.krynexlabs.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

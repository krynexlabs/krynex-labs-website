import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Engineering Inquiries",
  description:
    "Connect with Krynex Labs for enterprise software architectures, subscription licensing, industry problem proposals, or partnership inquiries. Headquartered in AHMEDABAD (IN).",
  alternates: {
    canonical: "https://www.krynexlabs.in/contact",
  },
  openGraph: {
    title: "Contact & Engineering Inquiries | Krynex Labs",
    description:
      "Connect with Krynex Labs for enterprise software architectures, subscription licensing, or industry problem proposals.",
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

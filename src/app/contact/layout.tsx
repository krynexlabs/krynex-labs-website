import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Contact & Consultation",
  description:
    "Initiate an executive technical consultation or enterprise inquiry with Krynex Labs engineering team. SBR, Ahmedabad, Gujarat, India.",
  alternates: {
    canonical: "https://www.krynexlabs.in/contact",
  },
  openGraph: {
    title: "Executive Contact & Consultation | Krynex Labs",
    description:
      "Initiate an executive technical consultation or enterprise inquiry with Krynex Labs engineering team.",
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

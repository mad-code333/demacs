import type { Metadata } from "next";
import { RegisterCompleteForm } from "@/components/RegisterCompleteForm";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Complete registration",
  description: "Add your Kick and Roobet details to finish setting up your Gamba account.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Complete registration · Gamba",
    description: "Add your Kick and Roobet details to finish setting up your Gamba account.",
    url: "/register/complete",
  },
  twitter: {
    title: "Complete registration · Gamba",
    description: "Add your Kick and Roobet details to finish setting up your Gamba account.",
  },
};

export default function RegisterCompletePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#050508]">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
        <RegisterCompleteForm />
      </main>
    </div>
  );
}

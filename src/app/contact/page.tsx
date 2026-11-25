import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { ContactOfficesPanel } from "@/components/contact-offices-panel";
import { ContactSpotlightHero } from "@/components/contact-spotlight-hero";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Contactez Tech'lux à Charbonnières-les-Bains (69) ou Jacob-Bellecombette (73) pour vos études d'aménagement lumière et d'éclairage extérieur.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSpotlightHero />

      <div className="bg-[#f4f4f1]">
        <section
          id="contact-form"
          className="scroll-mt-20 mx-auto max-w-[1400px] px-6 py-16 sm:py-20 lg:px-10"
        >
          <div className="mb-12">
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0b0b0c]">
              Le bon interlocuteur, dès le premier appel.
            </h2>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="rounded-3xl border border-black/10 bg-white p-12 text-center text-sm text-black/45">
                    Chargement du formulaire…
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
            <aside className="lg:col-span-5 lg:sticky lg:top-24">
              <ContactOfficesPanel />
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}

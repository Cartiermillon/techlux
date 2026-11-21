import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactOfficesPanel } from "@/components/contact-offices-panel";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Contactez Tech'lux à Charbonnières-les-Bains (69) ou Jacob-Bellecombette (73) pour vos études d'aménagement lumière et d'éclairage extérieur.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <section className="border-b border-white/10 bg-[#3a3d44] text-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:px-10">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Échange &amp; étude
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] lg:col-span-7">
              Parlons de
              <br />
              votre{" "}
              <span className="text-[#ffb43b]">projet.</span>
            </h1>
            <div className="flex flex-col justify-end gap-6 lg:col-span-5">
              <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
                Indiquez d&rsquo;abord le{" "}
                <strong className="font-medium text-white">département</strong>{" "}
                et le{" "}
                <strong className="font-medium text-white">
                  domaine d&rsquo;éclairage
                </strong>{" "}
                : nous orientons votre demande vers la bonne équipe et les bons
                fabricants.
              </p>
              <Link
                href="/etude-lumiere"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[#ffb43b] hover:text-white"
              >
                Voir l&rsquo;outil étude lumière / éclairement
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <ContactOfficesPanel />
          </aside>

          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="contact-form-shell rounded-3xl p-12 text-center text-sm text-white/55">
                  Chargement du formulaire…
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}

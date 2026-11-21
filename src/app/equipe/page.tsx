import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TeamRegionMap } from "@/components/team-region-map";
import { TeamMemberAvatar } from "@/components/team-member-avatar";
import { ARA_MAP_DEPARTMENTS, TEAM_MEMBERS } from "@/data/team";

export const metadata: Metadata = {
  title: "Équipe & territoires",
  description:
    "L'équipe commerciale Tech'lux en Auvergne-Rhône-Alpes : interlocuteurs par département, téléphones et e-mails.",
};

export default function EquipePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <section className="border-b border-white/10 bg-[#050506] text-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-16 sm:pb-20 sm:pt-20 lg:px-10">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Proximité terrain
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            Notre{" "}
            <span className="text-[#ffb43b]">équipe</span> régionale.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Une chargée ou un chargé d&rsquo;affaires dédié par secteur en
            Auvergne-Rhône-Alpes. Explorez la carte, puis appelez ou écrivez
            directement à votre interlocuteur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-10">
        <TeamRegionMap />
      </section>

      <section className="border-t border-black/12 bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Annuaire complet
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {TEAM_MEMBERS.map((m) => (
              <li
                key={m.id}
                id={`membre-${m.id}`}
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-black/10 bg-[#fafaf8] shadow-sm"
              >
                <div
                  className="h-1 w-full"
                  style={{ background: m.accent }}
                />
                <div className="flex gap-4 p-5 sm:p-6">
                  <TeamMemberAvatar
                    name={m.name}
                    photo={m.photo}
                    accent={m.accent}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.16em] text-black/45">
                      {m.role}
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight">
                      {m.name}
                    </p>
                    <p className="mt-1 text-sm text-black/55">
                      {m.territoryLabel ??
                        m.departments
                          .map(
                            (c) =>
                              ARA_MAP_DEPARTMENTS.find((d) => d.code === c)
                                ?.name ?? c
                          )
                          .join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-black/8 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                  <a
                    href={`tel:${m.phone}`}
                    className="block rounded-xl bg-white px-3 py-2 text-sm font-medium tabular-nums hover:text-[#b07612]"
                  >
                    {m.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="block rounded-xl bg-white px-3 py-2 text-sm break-all hover:text-[#b07612]"
                  >
                    {m.email}
                  </a>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 px-3 py-1 text-sm font-medium"
                  >
                    LinkedIn
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-black/55">
            Autres départements (Bourgogne, La Réunion…) :{" "}
            <Link href="/contact" className="font-medium underline">
              formulaire contact
            </Link>{" "}
            ou siège 09 67 07 56 77.
          </p>
        </div>
      </section>
    </div>
  );
}

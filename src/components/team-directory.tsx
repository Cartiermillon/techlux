import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { ARA_MAP_DEPARTMENTS, TEAM_MEMBERS } from "@/data/team";
import { TeamMemberAvatar } from "@/components/team-member-avatar";

export function TeamDirectory() {
  return (
    <section className="border-t border-black/12 bg-[#ecece7] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/50 lg:col-span-4">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Annuaire
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] lg:col-span-8">
            Tous les <span className="text-black/35">interlocuteurs</span>
          </h2>
        </div>

        <ul className="flex flex-col gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((m, index) => (
            <li
              key={m.id}
              id={`membre-${m.id}`}
              className="group scroll-mt-24 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_48px_120px_-64px_rgba(26,36,48,0.22)]"
            >
              <div
                className="h-1.5 w-full"
                style={{ background: m.accent }}
                aria-hidden
              />
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-0 lg:gap-y-6">
                <div className="flex gap-5 lg:col-span-4 lg:border-r lg:border-black/[0.08] lg:pr-8">
                  <span
                    className="hidden shrink-0 pt-1 text-sm tabular-nums tracking-[0.2em] text-black/30 sm:block"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <TeamMemberAvatar
                    name={m.name}
                    photo={m.photo}
                    accent={m.accent}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                      {m.role}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#0b0b0c]">
                      {m.name}
                    </h3>
                    {m.territoryLabel ? (
                      <p className="mt-2 text-sm font-medium text-[#b07612]">
                        {m.territoryLabel}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:col-span-4 lg:border-r lg:border-black/[0.08] lg:px-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">
                    Départements
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.departments.map((c) => {
                      const label =
                        ARA_MAP_DEPARTMENTS.find((d) => d.code === c)?.name ??
                        c;
                      return (
                        <span
                          key={c}
                          className="rounded-full border px-3.5 py-1.5 text-sm font-semibold tabular-nums"
                          style={{
                            borderColor: `${m.accent}55`,
                            backgroundColor: `${m.accent}16`,
                          }}
                        >
                          <span className="text-black/45">{c}</span>
                          <span className="mx-1.5 text-black/25">·</span>
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 lg:col-span-4 lg:pl-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40 lg:sr-only">
                    Contact
                  </p>
                  <a
                    href={`tel:${m.phone}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#f4f4f1] px-4 py-3 text-sm font-medium tabular-nums transition-colors hover:text-[#b07612]"
                  >
                    <Phone className="size-4 shrink-0 text-[#ffb43b]" />
                    {m.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#f4f4f1] px-4 py-3 text-sm font-medium break-all transition-colors hover:text-[#b07612]"
                  >
                    <Mail className="size-4 shrink-0 text-[#ffb43b]" />
                    <span className="truncate">{m.email}</span>
                  </a>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-1 py-1.5 text-sm font-medium text-black/60 hover:text-[#0b0b0c]"
                  >
                    LinkedIn
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-xl text-sm leading-relaxed text-black/55">
          Autres départements (Bourgogne, La Réunion…) :{" "}
          <Link
            href="/contact"
            className="font-medium underline hover:text-[#b07612]"
          >
            formulaire contact
          </Link>{" "}
          ou siège 09 67 07 56 77.
        </p>
      </div>
    </section>
  );
}
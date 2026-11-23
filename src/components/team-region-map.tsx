"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight, MapPin } from "lucide-react";
import {
  ARA_DEPT_PATHS,
  ARA_MAP_DEPARTMENTS,
  ARA_MAP_VIEWBOX,
  ARA_MAP_OFFICES,
  TEAM_MEMBERS,
  membersForDepartment,
  type TeamMember,
} from "@/data/team";
import { TeamMemberAvatar } from "@/components/team-member-avatar";
import { cn } from "cn";

const COVERED_CODES = new Set(TEAM_MEMBERS.flatMap((m) => m.departments));
const HIDDEN_MAP_CODES = new Set(["43"]);
const COMPACT_LABEL_CODES = new Set(["01", "39", "74"]);

const VB = `0 0 ${ARA_MAP_VIEWBOX.width} ${ARA_MAP_VIEWBOX.height}`;

const OFFICE_LABEL_OFFSET: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "middle" | "end" }
> = {
  siege: { dx: -10, dy: -16, anchor: "end" },
  agence: { dx: 12, dy: 24, anchor: "start" },
};

const LIGHT_ON_ACCENT = new Set([
  "#5b9cf5",
  "#a855f7",
  "#f472b6",
  "#c084fc",
]);

function deptPillStyle(accent: string, vivid: boolean) {
  if (!vivid) {
    return {
      borderColor: `${accent}55`,
      backgroundColor: `${accent}18`,
      color: "#0b0b0c",
    } as React.CSSProperties;
  }
  const light = LIGHT_ON_ACCENT.has(accent.toLowerCase());
  return {
    borderColor: accent,
    backgroundColor: accent,
    color: light ? "#ffffff" : "#050506",
    boxShadow: `0 8px 22px -8px ${accent}cc`,
  } as React.CSSProperties;
}

export function TeamRegionMap() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<string | null>("69");
  const [activeMemberId, setActiveMemberId] = React.useState<string | null>(
    null
  );
  const [hoveredOfficeId, setHoveredOfficeId] = React.useState<string | null>(
    null
  );

  const focusCode = hovered ?? selected;
  const focusMembers = focusCode ? membersForDepartment(focusCode) : [];
  const focusDept = ARA_MAP_DEPARTMENTS.find((d) => d.code === focusCode);

  const displayedMembers = activeMemberId
    ? TEAM_MEMBERS.filter((m) => m.id === activeMemberId)
    : focusMembers.length > 0
      ? focusMembers
      : TEAM_MEMBERS;

  const deptFill = (code: string) => {
    const reps = membersForDepartment(code);
    if (reps.length === 0) {
      return { fill: "rgba(11,11,12,0.07)", opacity: 1 };
    }
    if (focusCode === code || hovered === code) {
      return { fill: reps[0].accent, opacity: 0.72 };
    }
    if (activeMemberId && reps.some((r) => r.id === activeMemberId)) {
      return {
        fill: reps.find((r) => r.id === activeMemberId)!.accent,
        opacity: 0.58,
      };
    }
    return { fill: reps[0].accent, opacity: 0.38 };
  };

  const selectMember = (member: TeamMember) => {
    setActiveMemberId(member.id);
    setSelected(member.departments[0] ?? null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <svg
          viewBox={VB}
          role="img"
          aria-label="Carte des départements d'Auvergne-Rhône-Alpes"
          className="h-auto min-h-[min(58vw,520px)] w-full sm:min-h-[min(52vw,580px)]"
        >
          <rect
            width={ARA_MAP_VIEWBOX.width}
            height={ARA_MAP_VIEWBOX.height}
            fill="transparent"
          />
          <defs>
            <pattern
              id="team-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(11,11,12,0.04)"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="team-map-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5b9cf5" stopOpacity="0.05" />
              <stop offset="35%" stopColor="#4ade80" stopOpacity="0.04" />
              <stop offset="65%" stopColor="#ffb43b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect
            width={ARA_MAP_VIEWBOX.width}
            height={ARA_MAP_VIEWBOX.height}
            fill="url(#team-map-wash)"
          />
          <rect
            width={ARA_MAP_VIEWBOX.width}
            height={ARA_MAP_VIEWBOX.height}
            fill="url(#team-grid)"
          />

          {Object.entries(ARA_DEPT_PATHS).map(([code, d]) => {
            if (HIDDEN_MAP_CODES.has(code)) return null;
            const covered = COVERED_CODES.has(code);
            const { fill, opacity } = deptFill(code);
            const isFocus = focusCode === code;
            return (
              <path
                key={code}
                d={d}
                fill={fill}
                fillOpacity={opacity}
                stroke={
                  isFocus
                    ? "#0b0b0c"
                    : covered
                      ? "rgba(11,11,12,0.22)"
                      : "rgba(11,11,12,0.1)"
                }
                strokeWidth={isFocus ? 2.25 : 0.9}
                strokeLinejoin="round"
                className={cn(
                  covered ? "cursor-pointer transition-all duration-200" : ""
                )}
                onMouseEnter={() => covered && setHovered(code)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  if (!covered) return;
                  setSelected(code);
                  setActiveMemberId(null);
                }}
              />
            );
          })}

          {ARA_MAP_DEPARTMENTS.map((dept) => {
            if (HIDDEN_MAP_CODES.has(dept.code)) return null;
            const covered = COVERED_CODES.has(dept.code);
            const isFocus = focusCode === dept.code;
            const compact =
              COMPACT_LABEL_CODES.has(dept.code) &&
              !isFocus &&
              hovered !== dept.code;
            return (
              <g key={dept.code} pointerEvents="none">
                <text
                  x={dept.labelX}
                  y={dept.labelY}
                  textAnchor="middle"
                  fill="#0b0b0c"
                  fontWeight={700}
                  fontSize={isFocus ? 20 : compact ? 14 : 16}
                  opacity={covered ? (isFocus ? 1 : 0.9) : 0.28}
                >
                  {dept.code}
                </text>
                {!compact ? (
                  <text
                    x={dept.labelX}
                    y={dept.labelY + 16}
                    textAnchor="middle"
                    fill="rgba(11,11,12,0.62)"
                    fontSize={isFocus ? 12 : 10.5}
                    fontWeight={isFocus ? 600 : 500}
                    opacity={covered ? 1 : 0.32}
                  >
                    {dept.name}
                  </text>
                ) : null}
              </g>
            );
          })}

          {ARA_MAP_OFFICES.map((office) => {
            const layout = OFFICE_LABEL_OFFSET[office.id] ?? {
              dx: 10,
              dy: -8,
              anchor: "start",
            };
            const showLabel = hoveredOfficeId === office.id;
            return (
              <g
                key={office.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredOfficeId(office.id)}
                onMouseLeave={() => setHoveredOfficeId(null)}
              >
                <circle
                  cx={office.x}
                  cy={office.y}
                  r="7"
                  className="team-map-office-pulse"
                  fill="none"
                  stroke="#ffb43b"
                  strokeWidth="1.25"
                />
                <circle
                  cx={office.x}
                  cy={office.y}
                  r="7"
                  className="team-map-office-pulse team-map-office-pulse--delay-1"
                  fill="none"
                  stroke="#ffb43b"
                  strokeWidth="1.25"
                />
                <circle
                  cx={office.x}
                  cy={office.y}
                  r="7"
                  className="team-map-office-pulse team-map-office-pulse--delay-2"
                  fill="none"
                  stroke="#ffb43b"
                  strokeWidth="1.25"
                />
                <circle
                  cx={office.x}
                  cy={office.y}
                  r="22"
                  fill="transparent"
                />
                <circle
                  cx={office.x}
                  cy={office.y}
                  r="5.5"
                  fill="#ffb43b"
                  stroke="#f4f4f1"
                  strokeWidth="1.5"
                />
                <circle cx={office.x} cy={office.y} r="2" fill="#0b0b0c" />
                {showLabel ? (
                  <g pointerEvents="none">
                    <rect
                      x={
                        layout.anchor === "end"
                          ? office.x + layout.dx - 118
                          : office.x + layout.dx - 4
                      }
                      y={office.y + layout.dy - 14}
                      width={122}
                      height={34}
                      rx="6"
                      fill="rgba(255,255,255,0.96)"
                      stroke="rgba(255,180,59,0.55)"
                      strokeWidth="1"
                    />
                    <text
                      x={office.x + layout.dx}
                      y={office.y + layout.dy}
                      textAnchor={layout.anchor}
                      fill="#ffb43b"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="0.08em"
                    >
                      {office.shortLabel.toUpperCase()}
                    </text>
                    <text
                      x={office.x + layout.dx}
                      y={office.y + layout.dy + 12}
                      textAnchor={layout.anchor}
                      fill="rgba(11,11,12,0.78)"
                      fontSize="8.5"
                      fontWeight="500"
                    >
                      {office.title}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>

        <ul className="mt-8 flex flex-wrap gap-2">
          {TEAM_MEMBERS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => selectMember(m)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full border px-2 py-1.5 pr-3 text-xs font-semibold transition-colors",
                  activeMemberId === m.id
                    ? "border-[#ffb43b] bg-[#ffb43b] text-[#050506] shadow-md"
                    : "border-black/10 bg-white text-[#0b0b0c] shadow-sm hover:border-[#ffb43b]/50 hover:bg-[#fff9f0]"
                )}
              >
                <TeamMemberAvatar
                  name={m.name}
                  photo={m.photo}
                  accent={m.accent}
                  size="xs"
                />
                {m.name.split(" ")[0]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5">
        <aside className="sticky top-24 space-y-5">
          {displayedMembers.map((member) => {
            const showFocusDept =
              focusDept && member.departments.includes(focusDept.code);
            return (
              <article
                key={member.id}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"
                style={{
                  boxShadow: `0 12px 40px -16px ${member.accent}44`,
                }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{ background: member.accent }}
                />
                <div className="flex gap-4 p-6 sm:gap-5">
                  <TeamMemberAvatar
                    name={member.name}
                    photo={member.photo}
                    accent={member.accent}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    {showFocusDept ? (
                      <p
                        className="mb-3 inline-flex flex-wrap items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold"
                        style={deptPillStyle(member.accent, true)}
                      >
                        <MapPin className="size-3.5 shrink-0 opacity-90" aria-hidden />
                        <span className="tabular-nums">{focusDept.code}</span>
                        <span className="opacity-50" aria-hidden>
                          ·
                        </span>
                        <span>{focusDept.name}</span>
                      </p>
                    ) : null}
                    <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                      {member.role}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#0b0b0c] sm:text-2xl">
                      {member.name}
                    </h3>
                    {member.territoryLabel ? (
                      <p className="mt-1 text-sm font-medium text-[#b07612]">
                        {member.territoryLabel}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-black/8 px-6 pb-6 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">
                    Départements couverts
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {member.departments.map((c) => {
                      const label =
                        ARA_MAP_DEPARTMENTS.find((d) => d.code === c)?.name ??
                        c;
                      const isHighlighted = focusDept?.code === c;
                      return (
                        <li
                          key={c}
                          className="rounded-full border px-3.5 py-1.5 text-sm font-bold tabular-nums transition-[box-shadow,transform] duration-200"
                          style={deptPillStyle(member.accent, isHighlighted)}
                        >
                          <span className={isHighlighted ? "opacity-80" : "text-black/50"}>
                            {c}
                          </span>
                          <span
                            className={`mx-1.5 ${isHighlighted ? "opacity-40" : "text-black/25"}`}
                          >
                            ·
                          </span>
                          {label}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 space-y-2">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 rounded-2xl bg-[#f4f4f1] px-4 py-3 text-base font-medium tabular-nums hover:text-[#b07612]"
                    >
                      <Phone className="size-4 shrink-0 text-[#ffb43b]" />
                      {member.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 rounded-2xl bg-[#f4f4f1] px-4 py-3 text-sm font-medium break-all hover:text-[#b07612]"
                    >
                      <Mail className="size-4 shrink-0 text-[#ffb43b]" />
                      {member.email}
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-1 pt-2 text-sm font-medium text-black/70 hover:text-[#0b0b0c]"
                    >
                      Profil LinkedIn
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {focusCode === "69" &&
            focusMembers.length > 1 &&
            !activeMemberId ? (
            <p className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-black/55">
              Le Rhône est suivi par {focusMembers.length} interlocuteurs selon
              la nature du projet (grand compte lyonnais, voirie, patrimoine).
            </p>
          ) : null}

          <Link
            href="/contact"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0b0b0c] text-sm font-semibold text-white hover:bg-[#ffb43b] hover:text-[#050506] sm:w-auto sm:px-6"
          >
            Contacter l&rsquo;agence
            <ArrowUpRight className="size-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
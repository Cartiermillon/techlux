"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Send,
  AlertCircle,
  RotateCcw,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AGENCY_INFO,
  DEPARTMENTS,
  DOMAINS,
  DOMAIN_MAP,
  type DomainSlug,
} from "@/data/techlux";
import { primaryMemberForDepartment } from "@/data/team";
import {
  buildContactDraftText,
  buildContactReference,
} from "@/lib/contact-request-draft";
import { cn } from "cn";

const CONTACT_DEPT_CODES = DEPARTMENTS.filter((d) => d.code !== "974").map(
  (d) => d.code
);

const SAVOIE_AGENCY_DEPTS = new Set([
  "73",
  "74",
  "38",
  "05",
  "26",
  "07",
  "01",
  "71",
  "42",
  "43",
  "63",
]);

function isDomainSlug(v: string): v is DomainSlug {
  return DOMAINS.some((d) => d.slug === v);
}

function preferredOfficePhone(department: string): (typeof AGENCY_INFO.offices)[number] {
  if (SAVOIE_AGENCY_DEPTS.has(department)) {
    return AGENCY_INFO.offices[1];
  }
  return AGENCY_INFO.offices[0];
}

const fieldClass =
  "h-12 rounded-2xl border border-white/15 bg-white/6 text-[#f8f7f4] shadow-none placeholder:text-white/40 focus-visible:border-[#ffb43b] focus-visible:ring-[#ffb43b]/30";

const fieldClassLight =
  "h-12 rounded-2xl border border-black/10 bg-white text-[#1a1a1c] shadow-none placeholder:text-black/35 focus-visible:border-[#ffb43b] focus-visible:ring-[#ffb43b]/35";

export function ContactForm() {
  const searchParams = useSearchParams();
  const domainFromUrl = searchParams.get("domaine");
  const deptFromUrl = searchParams.get("departement");

  const [name, setName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [department, setDepartment] = React.useState<string>(() => {
    if (
      deptFromUrl &&
      DEPARTMENTS.some((d) => d.code === deptFromUrl && d.code !== "974")
    ) {
      return deptFromUrl;
    }
    return "69";
  });
  const [domain, setDomain] = React.useState<string>(() =>
    domainFromUrl && isDomainSlug(domainFromUrl)
      ? domainFromUrl
      : "mise-en-lumiere-patrimoine-batiments"
  );
  const [message, setMessage] = React.useState("");

  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);
  const [sentTo, setSentTo] = React.useState<string | null>(null);

  const deptInfo = DEPARTMENTS.find((d) => d.code === department);
  const domainInfo = DOMAIN_MAP[domain as DomainSlug];
  const office = preferredOfficePhone(department);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!department) {
      setError("Indiquez le département du projet pour orienter votre demande.");
      return;
    }
    if (!domain || !isDomainSlug(domain)) {
      setError("Choisissez un domaine d'éclairage.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Indiquez votre nom complet.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Saisissez une adresse e-mail valide.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Décrivez votre projet en au moins 10 caractères.");
      return;
    }

    setBusy(true);

    const reference = buildContactReference();
    const draft = buildContactDraftText(
      {
        name: name.trim(),
        organization: organization.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department,
        departmentLabel: deptInfo?.name,
        domain,
        message: message.trim(),
      },
      reference
    );

    const recipient =
      primaryMemberForDepartment(department) ??
      primaryMemberForDepartment("69");
    const to = recipient?.email ?? "p.cartier-millon@techlux.fr";
    const subject = `Demande Tech'lux ${reference}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;

    window.location.href = mailto;
    setSentTo(recipient?.name ?? "Tech'lux");
    setSubmittedRef(reference);
    setBusy(false);
  };

  if (submittedRef) {
    const tel = office.phone.replace(/\s+/g, "");
    return (
      <div className="space-y-4 rounded-3xl border border-white/12 bg-[linear-gradient(165deg,#3a3d44_0%,#2e3136_52%,#26282c_100%)] p-10 text-center text-[#f4f3f0] shadow-[0_28px_72px_-32px_rgba(0,0,0,0.45)] sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#ffb43b]/20 text-[#ffb43b]">
          <CheckCircle2 className="size-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#ffb43b]">
          Référence {submittedRef}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          Message prêt à envoyer
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-white/65">
          Votre messagerie s&rsquo;ouvre avec le message adressé à {sentTo}.
          Il part lorsque vous l&rsquo;envoyez depuis votre boîte mail.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${tel}`}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#ffb43b] px-6 text-sm font-semibold text-[#2a2b2e] hover:bg-white"
          >
            <Phone className="size-4" />
            {office.phone}
          </a>
          <span className="text-xs text-white/45">{office.city}</span>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSubmittedRef(null);
            setSentTo(null);
            setMessage("");
          }}
          className="mt-2 rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
        >
          <RotateCcw className="size-3.5" />
          Préparer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_28px_72px_-32px_rgba(0,0,0,0.18)]"
    >
      <div className="h-1.5 w-full bg-[#ffb43b]" />
      <div className="border-b border-black/10 bg-[#2a2b2e] p-6 text-white sm:p-8">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/55">
          <span className="size-1.5 rounded-full bg-[#ffb43b]" />
          Votre demande
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPin className="size-4 text-[#ffb43b]" />
              Département du projet *
            </label>

            <div className="flex flex-wrap gap-2">
              {CONTACT_DEPT_CODES.map((code) => {
                const active = department === code;
                const info = DEPARTMENTS.find((d) => d.code === code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setDepartment(code)}
                    className={cn(
                      "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                      active
                        ? "border-[#ffb43b] bg-[#ffb43b] text-[#0a0a0b]"
                        : "border-transparent bg-[#3a3a3f] text-white hover:bg-[#4a4a50]"
                    )}
                  >
                    {code}
                    {info ? (
                      <span
                        className={cn(
                          "ml-1.5 hidden font-semibold sm:inline",
                          active ? "text-[#0a0a0b]" : "text-white"
                        )}
                      >
                        {info.name}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="size-4 text-[#ffb43b]" />
              Domaine d&rsquo;éclairage *
            </label>

            <Select
              items={Object.fromEntries(DOMAINS.map((d) => [d.slug, d.title]))}
              value={domain}
              onValueChange={(val) => {
                if (val) setDomain(val);
              }}
            >
              <SelectTrigger className={cn(fieldClass, "w-full text-left")}>
                <SelectValue placeholder="Choisir un domaine" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {domainInfo && (
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4">
                <p className="text-base font-medium text-white">
                  {domainInfo.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {domainInfo.description}
                </p>
                <p className="mt-3 text-xs text-white/45">
                  Température conseillée : {domainInfo.recommendedKelvin} ·{" "}
                  {domainInfo.partners.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 bg-white p-6 text-[#1a1a1c] sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1c]">
          Vos coordonnées
        </h2>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs font-semibold text-[#1a1a1c]/75"
            >
              Nom &amp; prénom *
            </label>
            <Input
              id="contact-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean Dupont"
              className={fieldClassLight}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-org" className="text-xs font-semibold text-[#1a1a1c]/75">
              Collectivité / BE / Entreprise
            </label>
            <Input
              id="contact-org"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Ville de…, Atelier…"
              className={fieldClassLight}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold text-[#1a1a1c]/75">
              Email professionnel *
            </label>
            <Input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClassLight}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="text-xs font-semibold text-[#1a1a1c]/75">
              Téléphone
            </label>
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClassLight}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-semibold text-[#1a1a1c]/75">
            Votre projet (contexte, surfaces, délais, livrables attendus) *
          </label>
          <Textarea
            id="contact-message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex. : requalification d'une place en 2700 K, cible 15 lux, abaissement nocturne, plans DWG disponibles…"
            className={cn(fieldClassLight, "min-h-[9rem] resize-y")}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs text-black/45">
            Le bouton ouvre votre messagerie avec le message déjà rédigé.
          </p>
          <Button
            type="submit"
            disabled={busy}
            className="h-12 cursor-pointer rounded-full bg-[#ffb43b] px-8 text-sm font-semibold text-[#2a2b2e] shadow-[0_8px_32px_-8px_rgba(255,180,59,0.55)] hover:bg-white hover:text-[#2a2b2e]"
          >
            {busy ? "Envoi…" : "Envoyer le message"}
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
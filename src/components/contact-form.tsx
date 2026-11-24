"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ClipboardCopy,
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
import {
  buildContactDraftText,
  buildContactReference,
} from "@/lib/contact-request-draft";
import { cn } from "cn";

const QUICK_DEPTS = ["69", "73", "74", "38", "01", "26", "71", "974"] as const;

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
  "contact-form-field h-12 rounded-2xl focus-visible:border-[#ffb43b] focus-visible:ring-[#ffb43b]/30";

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
      (DEPARTMENTS.some((d) => d.code === deptFromUrl) || deptFromUrl === "autre")
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
  const [copied, setCopied] = React.useState(false);

  const deptInfo = DEPARTMENTS.find((d) => d.code === department);
  const domainInfo = DOMAIN_MAP[domain as DomainSlug];
  const office = preferredOfficePhone(department);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCopied(false);

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

    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setSubmittedRef(reference);
    } catch {
      setError(
        "Impossible de copier automatiquement. Sélectionnez le message ci-dessous et copiez-le, puis appelez une implantation."
      );
      setSubmittedRef(reference);
    } finally {
      setBusy(false);
    }
  };

  if (submittedRef) {
    const tel = office.phone.replace(/\s+/g, "");
    return (
      <div className="contact-form-shell space-y-4 rounded-3xl p-10 text-center sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#ffb43b]/25 text-[#8a5a08]">
          <CheckCircle2 className="size-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#b07612]">
          Référence {submittedRef}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-[#0b0b0c]">
          Demande préparée dans votre navigateur
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-black/60">
          {copied
            ? "Le résumé a été copié dans le presse-papiers. Aucune donnée n'est transmise en ligne depuis ce site : appelez-nous pour transmettre votre demande à nos équipes."
            : "Aucune donnée n'est envoyée en ligne depuis ce site. Appelez-nous en vous appuyant sur le texte que vous avez saisi."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${tel}`}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0b0b0c] px-6 text-sm font-semibold text-white hover:bg-[#ffb43b] hover:text-[#050506]"
          >
            <Phone className="size-4" />
            {office.phone}
          </a>
          <span className="text-xs text-black/45">{office.city}</span>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSubmittedRef(null);
            setCopied(false);
            setMessage("");
          }}
          className="mt-2 rounded-full border-black/15 bg-transparent text-[#0b0b0c] hover:bg-black/5"
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
      className="contact-form-shell overflow-hidden rounded-3xl"
    >
      <div className="h-1.5 w-full bg-[#ffb43b]" />
      <div className="contact-form-header p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-black/45">
            <span className="size-1.5 rounded-full bg-[#ffb43b]" />
            Contexte projet — prioritaire
          </p>
          <p className="text-xs text-black/40">
            Ces deux champs orientent la bonne agence et le bon fabricant.
          </p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-black/45">
          Ce formulaire ne transmet rien sur Internet : il génère un texte récapitulatif (copié
          localement) pour votre appel ou votre e-mail vers nos implantations.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0b0b0c]">
              <MapPin className="size-4 text-[#b07612]" />
              Département du projet *
            </label>

            <div className="flex flex-wrap gap-2">
              {QUICK_DEPTS.map((code) => {
                const active = department === code;
                const info = DEPARTMENTS.find((d) => d.code === code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setDepartment(code)}
                    className={cn(
                      "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-[#ffb43b] bg-[#ffb43b] text-[#2a2b2e]"
                        : "border-black/10 bg-white text-[#0b0b0c] hover:border-black/25"
                    )}
                  >
                    {code}
                    {info ? (
                      <span className="ml-1.5 hidden font-normal opacity-80 sm:inline">
                        {info.name}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <Select
              items={{
                ...Object.fromEntries(
                  DEPARTMENTS.map((dept) => [
                    dept.code,
                    `${dept.code} — ${dept.name} (${dept.region})`,
                  ])
                ),
                autre: "Hors zone listée",
              }}
              value={department}
              onValueChange={(val) => {
                if (val) setDepartment(val);
              }}
            >
              <SelectTrigger
                className={cn(fieldClass, "w-full data-placeholder:text-black/40")}
              >
                <SelectValue placeholder="Ou choisir dans la liste complète" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept.code} value={dept.code}>
                    {dept.code} — {dept.name} ({dept.region})
                  </SelectItem>
                ))}
                <SelectItem value="autre">Hors zone listée</SelectItem>
              </SelectContent>
            </Select>

            {deptInfo && (
              <p className="text-sm font-medium text-[#b07612]">
                Région couverte : {deptInfo.region}
              </p>
            )}
            {department === "autre" && (
              <p className="text-sm text-black/55">
                Précisez la localisation dans le message ci-dessous.
              </p>
            )}
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0b0b0c]">
              <Sparkles className="size-4 text-[#b07612]" />
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
              <div className="rounded-2xl border border-black/8 bg-white p-4">
                <p className="text-base font-medium text-[#0b0b0c]">
                  {domainInfo.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {domainInfo.description}
                </p>
                <p className="mt-3 text-xs text-black/45">
                  Température conseillée : {domainInfo.recommendedKelvin} ·{" "}
                  {domainInfo.partners.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#0b0b0c]">
          Vos coordonnées
        </h2>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs font-semibold text-black/55"
            >
              Nom &amp; prénom *
            </label>
            <Input
              id="contact-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean Dupont"
              className={fieldClass}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-org" className="text-xs font-semibold text-black/55">
              Collectivité / BE / Entreprise
            </label>
            <Input
              id="contact-org"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Ville de…, Atelier…"
              className={fieldClass}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold text-black/55">
              Email professionnel *
            </label>
            <Input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="text-xs font-semibold text-black/55">
              Téléphone
            </label>
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-semibold text-black/55">
            Votre projet (contexte, surfaces, délais, livrables attendus) *
          </label>
          <Textarea
            id="contact-message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex. : requalification d'une place en 2700 K, cible 15 lux, abaissement nocturne, plans DWG disponibles…"
            className={cn(fieldClass, "min-h-[9rem] resize-y")}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-black/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs text-black/45">
            Rien n&apos;est stocké ni envoyé aux serveurs Tech&rsquo;lux : vous gardez le contrôle
            jusqu&apos;à l&apos;appel.
          </p>
          <Button
            type="submit"
            disabled={busy}
            className="h-12 cursor-pointer rounded-full bg-[#0b0b0c] px-8 text-sm font-semibold text-white hover:bg-[#ffb43b] hover:text-[#050506]"
          >
            {busy ? "Préparation…" : "Copier le résumé et appeler"}
            <ClipboardCopy className="size-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
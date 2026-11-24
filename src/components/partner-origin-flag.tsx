import { cn } from "cn";

const FLAGS = {
  France: {
    label: "France",
    node: (
      <>
        <rect width="1" height="2" fill="#002395" />
        <rect x="1" width="1" height="2" fill="#ffffff" />
        <rect x="2" width="1" height="2" fill="#ed2939" />
      </>
    ),
  },
  Allemagne: {
    label: "Allemagne",
    node: (
      <>
        <rect width="3" height="0.667" y="0" fill="#000000" />
        <rect width="3" height="0.667" y="0.667" fill="#dd0000" />
        <rect width="3" height="0.666" y="1.333" fill="#ffce00" />
      </>
    ),
  },
} as const;

type PartnerOriginFlagProps = {
  origin: string;
  className?: string;
};

export function PartnerOriginFlag({ origin, className }: PartnerOriginFlagProps) {
  const flag = FLAGS[origin as keyof typeof FLAGS];
  if (!flag) return null;

  return (
    <svg
      viewBox="0 0 3 2"
      className={cn("h-[0.85em] w-[1.28em] shrink-0 rounded-[2px] shadow-sm", className)}
      role="img"
      aria-label={flag.label}
    >
      {flag.node}
    </svg>
  );
}
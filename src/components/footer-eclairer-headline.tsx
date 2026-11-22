import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FooterAutrementRocket } from "@/components/footer-autrement-rocket";

export function FooterEclairerHeadline() {
  return (
    <Link href="/contact" className="group block max-w-5xl">
      <span className="block text-[clamp(2rem,5.8vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
        Éclairer{" "}
        <FooterAutrementRocket className="text-[#ffb43b]">
          autrement
        </FooterAutrementRocket>
        <ArrowUpRight className="ml-[0.08em] inline size-[0.5em] -translate-y-[0.06em] text-white/40 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-[0.14em] group-hover:text-[#ffb43b]" />
      </span>
    </Link>
  );
}
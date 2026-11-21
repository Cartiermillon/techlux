import Image from "next/image";
import { cn } from "cn";

type TeamMemberAvatarProps = {
  name: string;
  photo: string;
  accent: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const sizePx = { xs: 28, sm: 56, md: 80, lg: 112 } as const;

export function TeamMemberAvatar({
  name,
  photo,
  accent,
  size = "md",
  className,
}: TeamMemberAvatarProps) {
  const px = sizePx[size];
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-[#ebe8e2]",
        className
      )}
      style={{
        width: px,
        height: px,
        boxShadow: `0 0 0 2px ${accent}33`,
      }}
    >
      <Image
        src={photo}
        alt={name}
        width={px}
        height={px}
        className="size-full object-cover"
      />
    </div>
  );
}

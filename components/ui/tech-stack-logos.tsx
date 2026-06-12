import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  name: string;
  alt: string;
  src: string;
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={{
          name: "NVIDIA",
          alt: "Nvidia Logo",
          src: "/SVG_logos/nvidia.svg",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r"
        logo={{
          name: "Supabase",
          alt: "Supabase Logo",
          src: "/SVG_logos/supabase-icon.svg",
        }}
      />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          name: "GitHub",
          alt: "GitHub Logo",
          src: "/SVG_logos/github-icon.svg",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          name: "OpenAI",
          alt: "OpenAI Logo",
          src: "/SVG_logos/openai.svg",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          name: "Zapier",
          alt: "Zapier Logo",
          src: "/SVG_logos/zapier.svg",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          name: "MCP",
          alt: "Model Context Protocol Logo",
          src: "/SVG_logos/model-context-protocol-icon.svg",
        }}
      />

      <LogoCard
        className="border-r"
        logo={{
          name: "Claude",
          alt: "Claude AI Logo",
          src: "/SVG_logos/claude.svg",
        }}
      />

      <LogoCard
        className="bg-secondary dark:bg-secondary/30"
        logo={{
          name: "Vercel",
          alt: "Vercel Logo",
          src: "/SVG_logos/vercel.svg",
        }}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        title={logo.name}
        className="pointer-events-none h-8 w-auto select-none object-contain md:h-9"
        loading="lazy"
      />
      {children}
    </div>
  );
}

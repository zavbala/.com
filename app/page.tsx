import { ThemeToggle } from "./theme-toggle";
import { TypedPrompt } from "./typed-prompt";

const projects = [
  {
    name: "ectarea",
    description: "Real estate platform for developers",
    href: "https://ectarea.mx/",
  },
  {
    name: "abitar",
    description: "Real estate marketplace",
    href: "https://abitar.mx/",
  },
  {
    name: "funklo",
    description: "Online shop for collectibles",
    href: "https://funklo.shop/",
  },
];

const contributions = [
  {
    name: "react docs (es)",
    description: "Spanish translation of the React documentation",
    href: "https://es.react.dev/",
  },
];

const options = [
  { flag: "--projects", description: "list shipped products", href: "#projects" },
  {
    flag: "--contributions",
    description: "open-source work",
    href: "#contributions",
  },
  { flag: "--hire", description: "check availability", href: "#exit-status" },
  { flag: "--contact", description: "ways to reach me", href: "#see-also" },
  { flag: "--source", description: "view this page's source", href: "#source" },
];

const environment = [
  { name: "OS", value: "linux" },
  { name: "SHELL", value: "zsh" },
  { name: "EDITOR", value: "nvim" },
  { name: "STACK", value: "typescript · react · next.js · node" },
];

const exitStatus = [
  { code: "0", meaning: "available for new opportunities" },
  { code: "1", meaning: "currently shipping at Intuit" },
];

const links = [
  { label: "github", href: "https://github.com/zavbala" },
  { label: "x", href: "https://x.com/zavbala" },
  { label: "linkedin", href: "https://www.linkedin.com/in/zavbala" },
  { label: "email", href: "mailto:jeremy.zbala@gmail.com" },
];

// Strip the protocol/mailto so links read like a man page's SEE ALSO entries.
const display = (href: string) => href.replace(/^https?:\/\//, "").replace(/^mailto:/, "").replace(/\/$/, "");

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // e.g. "EXIT STATUS" -> "exit-status", so OPTIONS flags can anchor to it.
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section id={id} className="mt-6 scroll-mt-6">
      <h2 className="font-bold text-foreground">{title}</h2>
      <div className="mt-1 pl-4 text-foreground/70 break-words sm:pl-7">
        {children}
      </div>
    </section>
  );
}

function Rule({ center }: { center: string }) {
  return (
    <div className="flex justify-between gap-4 text-xs text-foreground/40">
      <span>JEREMY(1)</span>
      <span className="hidden sm:inline">{center}</span>
      <span>JEREMY(1)</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-5 py-14 sm:px-6 sm:py-16">
      <div className="fixed right-3 top-3 sm:right-4 sm:top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl text-sm leading-relaxed">
        <TypedPrompt />

        <Rule center="User Commands" />

        <Section title="NAME">
          jeremy — software engineer at{" "}
          <a
            href="https://www.intuit.com/"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Intuit
          </a>
        </Section>

        <Section title="SYNOPSIS">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-foreground">jeremy</span>
            {options.map(({ flag, href }) => (
              <span key={flag} className="whitespace-nowrap text-foreground/50">
                [
                <a
                  href={href}
                  className="transition-colors hover:text-foreground"
                >
                  {flag}
                </a>
                ]
              </span>
            ))}
          </div>
        </Section>

        <Section title="DESCRIPTION">
          Builds web platforms and products end to end. Linux enthusiast and
          open-source contributor. Currently shipping at Intuit, with side
          projects across real estate and e-commerce.
        </Section>

        <Section title="OPTIONS">
          <div className="flex flex-col gap-1">
            {options.map(({ flag, description, href }) => (
              <a
                key={flag}
                href={href}
                className="flex flex-wrap gap-x-4 transition-colors hover:text-foreground"
              >
                <span className="w-36 shrink-0 text-foreground">{flag}</span>
                <span className="min-w-0 text-foreground/60">{description}</span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="PROJECTS">
          <div className="flex flex-col gap-1">
            {projects.map(({ name, description, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap gap-x-4 transition-colors hover:text-foreground"
              >
                <span className="w-20 shrink-0 text-foreground">{name}</span>
                <span className="min-w-0 text-foreground/60">{description}</span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="CONTRIBUTIONS">
          <div className="flex flex-col gap-1">
            {contributions.map(({ name, description, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap gap-x-4 transition-colors hover:text-foreground"
              >
                <span className="w-36 shrink-0 text-foreground">{name}</span>
                <span className="min-w-0 text-foreground/60">{description}</span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="ENVIRONMENT">
          <div className="flex flex-col gap-1">
            {environment.map(({ name, value }) => (
              <div key={name} className="flex flex-wrap gap-x-4">
                <span className="w-24 shrink-0 text-foreground">{name}</span>
                <span className="text-foreground/60">{value}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="SEE ALSO">
          <div className="flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex flex-wrap gap-x-4 transition-colors hover:text-foreground"
              >
                <span className="w-20 shrink-0 text-foreground">{label}</span>
                <span className="min-w-0 break-all text-foreground/60">
                  {display(href)}
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="EXIT STATUS">
          <div className="flex flex-col gap-1">
            {exitStatus.map(({ code, meaning }) => (
              <div key={code} className="flex gap-x-4">
                <span className="w-6 shrink-0 text-foreground">{code}</span>
                <span className="text-foreground/60">{meaning}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="SOURCE">
          This page is open source —{" "}
          <a
            href="https://github.com/zavbala/.com"
            target="_blank"
            rel="noreferrer"
            className="break-all text-foreground underline-offset-4 hover:underline"
          >
            github.com/zavbala/.com
          </a>
        </Section>

        <Section title="AUTHOR">Written by Jeremy Zabala.</Section>

        <div className="mt-10">
          <Rule center="June 2026" />
        </div>
      </div>
    </main>
  );
}

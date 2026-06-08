// Single source of truth for the man page. Both the HTML page (app/page.tsx)
// and the curl/JSON endpoint (app/man/route.ts) read from here so they can
// never drift apart.

export type Entry = {
  name: string;
  description: string;
  href: string;
};

export const name = {
  title: "jeremy",
  tagline: "software engineer at Intuit",
};

export const description =
  "Builds web platforms and products end to end. Linux enthusiast and " +
  "open-source contributor. Currently shipping at Intuit, with side " +
  "projects across real estate and e-commerce.";

export const projects: Entry[] = [
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

export const contributions: Entry[] = [
  {
    name: "react docs (es)",
    description: "Spanish translation of the React documentation",
    href: "https://es.react.dev/",
  },
];

export const options = [
  { flag: "--projects", description: "list shipped products", href: "#projects" },
  {
    flag: "--contributions",
    description: "open-source work",
    href: "#contributions",
  },
  { flag: "--resume", description: "download my résumé (pdf)", href: "#files" },
  { flag: "--hire", description: "check availability", href: "#exit-status" },
  { flag: "--contact", description: "ways to reach me", href: "#see-also" },
  { flag: "--source", description: "view this page's source", href: "#source" },
];

export const environment = [
  { name: "OS", value: "linux" },
  { name: "SHELL", value: "zsh" },
  { name: "EDITOR", value: "nvim" },
  { name: "STACK", value: "typescript · react · next.js · node" },
];

export const exitStatus = [
  { code: "0", meaning: "available for new opportunities" },
  { code: "1", meaning: "currently shipping at Intuit" },
];

export const links = [
  { label: "github", href: "https://github.com/zavbala" },
  { label: "x", href: "https://x.com/zavbala" },
  { label: "linkedin", href: "https://www.linkedin.com/in/zavbala" },
  { label: "email", href: "mailto:jeremy.zbala@gmail.com" },
];

// Lives in public/resume.pdf. `path` is the same-origin link used by the HTML
// page and the /resume short-link; `href` is the canonical URL shown in the
// man page's FILES section.
export const resume = {
  path: "/resume.pdf",
  href: "https://zavbala.com/resume.pdf",
  description: "résumé (pdf)",
  filename: "jeremy-zabala-resume.pdf", // name the file gets when downloaded
};

export const source = "https://github.com/zavbala/.com";
export const author = "Written by Jeremy Zabala.";
export const date = "June 2026";

// Strip the protocol/mailto so links read like a man page's SEE ALSO entries.
export const display = (href: string) =>
  href
    .replace(/^https?:\/\//, "")
    .replace(/^mailto:/, "")
    .replace(/\/$/, "");

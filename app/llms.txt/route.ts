import {
  author,
  contributions,
  description,
  environment,
  exitStatus,
  links,
  name,
  projects,
  resume,
  source,
} from "../content";

// Serves /llms.txt — the emerging convention for a plain-markdown summary of a
// site aimed at LLMs/AI crawlers (https://llmstxt.org). Generated from
// content.ts so it stays in lockstep with the page, man page, and JSON.

// "Written by Jeremy Zabala." -> "Jeremy Zabala"
const fullName = author.replace(/^Written by /, "").replace(/\.$/, "");

// Friendly, capitalized labels for the link list.
const linkLabels: Record<string, string> = {
  github: "GitHub",
  x: "X",
  linkedin: "LinkedIn",
  email: "Email",
};

function llms(): string {
  const status = exitStatus[0]?.meaning ?? "";
  const lines: string[] = [];

  lines.push(`# ${fullName}`, "");
  lines.push(`> ${name.title} — ${name.tagline}`, "");
  lines.push(description, "");

  lines.push("## Projects");
  for (const p of projects) {
    lines.push(`- [${p.name}](${p.href}): ${p.description}`);
  }
  lines.push("");

  lines.push("## Open-source contributions");
  for (const c of contributions) {
    lines.push(`- [${c.name}](${c.href}): ${c.description}`);
  }
  lines.push("");

  lines.push("## Profile");
  for (const e of environment) {
    // OS stays uppercase; SHELL -> Shell, EDITOR -> Editor, etc.
    const key =
      e.name === "OS" ? "OS" : e.name.charAt(0) + e.name.slice(1).toLowerCase();
    lines.push(`- ${key}: ${e.value}`);
  }
  lines.push(`- Status: ${status}`, "");

  lines.push("## Links");
  for (const l of links) {
    lines.push(`- [${linkLabels[l.label] ?? l.label}](${l.href})`);
  }
  lines.push("");

  lines.push("## Files");
  lines.push(`- [Résumé (PDF)](${resume.href})`, "");

  lines.push("## Source");
  lines.push(`- [Site source](${source}): This portfolio is open source.`);

  return lines.join("\n") + "\n";
}

export async function GET() {
  return new Response(llms(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

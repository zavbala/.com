import {
  contributions,
  environment,
  exitStatus,
  name,
  projects,
} from "../content";

// `curl zavbala.com/neofetch` -> a neofetch-style system card: ASCII logo on
// the left, "system info" (sourced from content.ts) on the right, and the
// classic 16-swatch color palette underneath. `?nocolor` strips the ANSI.

const ORANGE = "\x1b[1;38;5;208m";
const RESET = "\x1b[0m";
const CLI_AGENTS = /\b(curl|wget|httpie|libcurl|powershell|python-requests)\b/i;

// A terminal-window logo, built programmatically so every line is exactly the
// same width (hand-drawn ASCII boxes drift). Box-drawing chars render at one
// column in monospace fonts; we avoid glyphs like ● that some fonts render
// double-width and throw the right border off.
const LOGO = buildLogo();

function buildLogo(): string[] {
  const SEP = Symbol("sep");
  const body: (string | typeof SEP)[] = [
    "zavbala.com — zsh",
    SEP,
    "$ whoami",
    "jeremy",
    "",
    "$ cat role.txt",
    "software engineer",
    "",
    "$ uname -o",
    "GNU/Linux",
    "",
    "$ _",
  ];

  const longest = body.reduce<number>(
    (max, b) => (typeof b === "string" ? Math.max(max, b.length) : max),
    0,
  );
  const inner = Math.max(longest + 4, 24); // interior width, with breathing room
  const bar = (l: string, r: string) => l + "─".repeat(inner) + r;

  return [
    bar("╭", "╮"),
    ...body.map((b) =>
      b === SEP ? bar("├", "┤") : `│ ${b.padEnd(inner - 1)}│`,
    ),
    bar("╰", "╯"),
  ];
}

// SHELL -> Shell, EDITOR -> Editor, but keep OS uppercase.
const label = (n: string) =>
  n === "OS" ? "OS" : n.charAt(0) + n.slice(1).toLowerCase();

function neofetch(color: boolean): string {
  const paint = (s: string) => (color ? `${ORANGE}${s}${RESET}` : s);
  const kv = (k: string, v: string) => `${paint(k)}: ${v}`;

  // Host = the company from the tagline ("... at Intuit" -> "Intuit").
  const host = name.tagline.split(" at ").pop() ?? "";
  const title = `${name.title}@zavbala`;

  const info: string[] = [
    paint(title),
    paint("─".repeat(title.length)),
    kv("Host", host),
    ...environment.map((e) => kv(label(e.name), e.value)),
    kv("Projects", `${projects.length} shipped`),
    kv("Contributions", `${contributions.length}`),
    kv("Status", exitStatus[0].meaning),
    "",
  ];

  if (color) {
    const block = (n: number) => `\x1b[48;5;${n}m   ${RESET}`;
    const palette = (from: number) =>
      Array.from({ length: 8 }, (_, i) => block(from + i)).join("");
    info.push(palette(0), palette(8));
  }

  const width = Math.max(...LOGO.map((l) => l.length));
  const rows = Math.max(LOGO.length, info.length);
  const out: string[] = [];

  for (let i = 0; i < rows; i++) {
    const left = paint((LOGO[i] ?? "").padEnd(width));
    const right = info[i] ?? "";
    out.push(`${left}   ${right}`.replace(/\s+$/, ""));
  }

  out.push("", "tip: curl zavbala.com  ·  json: curl zavbala.com/man?format=json");

  return out.join("\n") + "\n";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") ?? "";

  // Color for terminals; plain for `?nocolor` or accidental browser visits
  // (which would otherwise show raw escape codes).
  const color = !url.searchParams.has("nocolor") && CLI_AGENTS.test(ua);

  return new Response(neofetch(color), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

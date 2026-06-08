import {
  author,
  contributions,
  date,
  description,
  display,
  environment,
  exitStatus,
  links,
  name,
  options,
  projects,
  resume,
  source,
} from "../content";

// `curl zavbala.com` lands here (rewritten by proxy.ts) and so does a direct
// hit to `/man`. We hand back a real nroff-style man page for terminals, or
// JSON when asked via `?format=json` or `Accept: application/json`.

const NAME = "JEREMY";
const SECTION = "1";
const WIDTH = 78; // classic man page column width
const INDENT = "       "; // 7 spaces, like a real man page body

// ANSI: bold orange for section headers/rulers, reset back to default.
// 256-color 208 is a warm orange that shows up well on light and dark terminals.
const ORANGE = "\x1b[1;38;5;208m";
const RESET = "\x1b[0m";

// Wrap text to WIDTH, prefixing every line with `indent`.
function wrap(text: string, indent: string): string {
  const limit = WIDTH - indent.length;
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && line.length + 1 + word.length > limit) {
      lines.push(indent + line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(indent + line);
  return lines.join("\n");
}

// Two-column row: left label padded to `pad`, then the value (no wrapping —
// these are short and reading them on one line matches the HTML layout).
function row(label: string, value: string, pad: number): string {
  return INDENT + label.padEnd(pad) + value;
}

// Centered running header/footer: NAME(1) ... center ... NAME(1)
function ruler(center: string): string {
  const tag = `${NAME}(${SECTION})`;
  const gap = WIDTH - tag.length * 2 - center.length;
  const left = Math.max(1, Math.floor(gap / 2));
  const right = Math.max(1, gap - left);
  return tag + " ".repeat(left) + center + " ".repeat(right) + tag;
}

function manPage(color: boolean): string {
  const paint = (s: string) => (color ? `${ORANGE}${s}${RESET}` : s);
  const out: string[] = [];
  const section = (title: string, body: string) => {
    out.push(paint(title), body, "");
  };

  out.push(paint(ruler("User Commands")), "");

  section("NAME", `${INDENT}${name.title} — ${name.tagline}`);

  const synopsis = `${name.title} ${options
    .map((o) => `[${o.flag}]`)
    .join(" ")}`;
  section("SYNOPSIS", wrap(synopsis, INDENT));

  section("DESCRIPTION", wrap(description, INDENT));

  section(
    "OPTIONS",
    options.map((o) => row(o.flag, o.description, 18)).join("\n"),
  );

  section(
    "PROJECTS",
    projects
      .map((p) => `${row(p.name, p.description, 12)}\n${INDENT}  ${display(p.href)}`)
      .join("\n"),
  );

  section(
    "CONTRIBUTIONS",
    contributions
      .map((c) => `${row(c.name, c.description, 18)}\n${INDENT}  ${display(c.href)}`)
      .join("\n"),
  );

  section(
    "ENVIRONMENT",
    environment.map((e) => row(e.name, e.value, 10)).join("\n"),
  );

  section(
    "FILES",
    row(display(resume.href), resume.description, 26),
  );

  section(
    "SEE ALSO",
    links.map((l) => row(l.label, display(l.href), 12)).join("\n"),
  );

  section(
    "EXIT STATUS",
    exitStatus.map((e) => row(e.code, e.meaning, 6)).join("\n"),
  );

  section("SOURCE", `${INDENT}This page is open source — ${display(source)}`);

  section("AUTHOR", `${INDENT}${author}`);

  out.push(paint(ruler(date)));

  return out.join("\n") + "\n";
}

function json() {
  return {
    name,
    description,
    options,
    projects,
    contributions,
    resume,
    environment,
    exitStatus,
    links,
    source,
    author,
    date,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get("format");
  const accept = request.headers.get("accept") ?? "";

  const wantsJson =
    format === "json" ||
    (format !== "txt" && accept.includes("application/json"));

  if (wantsJson) {
    return Response.json(json());
  }

  // Colorize by default; `?nocolor` keeps it plain for piping/redirecting.
  const color = !url.searchParams.has("nocolor");

  return new Response(manPage(color), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Hint to clients/CDNs; harmless for curl.
      "cache-control": "public, max-age=3600",
    },
  });
}

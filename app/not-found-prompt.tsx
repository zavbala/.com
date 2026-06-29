"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Commands that take a lost visitor back home. `cd` with no arg, `cd ~`,
// `cd /`, and `cd ..` all behave like a shell would — return to $HOME.
const HOME_COMMANDS = new Set(["cd", "cd ~", "cd /", "cd ..", "cd ../", "home"]);

export function NotFoundPrompt() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Keep the caret in the prompt: focus on mount, and refocus on any click.
  useEffect(() => {
    inputRef.current?.focus();
    const refocus = () => inputRef.current?.focus();
    window.addEventListener("click", refocus);
    return () => window.removeEventListener("click", refocus);
  }, []);

  function run(event: React.FormEvent) {
    event.preventDefault();
    const cmd = value.trim().replace(/\s+/g, " ").toLowerCase();
    if (cmd === "") return;

    if (HOME_COMMANDS.has(cmd)) {
      router.push("/");
      return;
    }

    // Not a route home — echo a shell-style error and clear the line.
    setError(`bash: ${value.trim().split(" ")[0]}: command not found`);
    setValue("");
  }

  return (
    <form onSubmit={run} className="mt-6">
      <label className="flex items-baseline">
        <span className="select-none text-foreground/40">$&nbsp;</span>
        <span className="relative inline-flex items-baseline">
          <span aria-hidden="true" className="whitespace-pre text-foreground">
            {value}
          </span>
          {value === "" && <span className="cursor" aria-hidden="true" />}
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal command"
            // Transparent overlay: the styled span above renders the text.
            className="absolute inset-0 w-full bg-transparent text-transparent caret-foreground outline-none"
          />
        </span>
      </label>

      {error && <p className="mt-2 text-foreground/70">{error}</p>}

      <p className="mt-4 text-foreground/40">
        <span className="select-none"># tip: </span>type{" "}
        <code className="text-foreground/70">cd ~</code> to head home
      </p>
    </form>
  );
}

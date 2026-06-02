"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "lucide-react";

const order = ["system", "light", "dark"] as const;
const icons = { system: Monitor, light: Sun, dark: Moon };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = (theme ?? "system") as (typeof order)[number];
  const Icon = icons[current] ?? Monitor;

  const cycle = () =>
    setTheme(order[(order.indexOf(current) + 1) % order.length]);

  // The theme is only known on the client, so render nothing but a same-size
  // placeholder until mounted — this avoids an SSR/client hydration mismatch.
  if (!mounted) {
    return <span className="inline-flex size-8" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${current}. Click to change.`}
      title={`Theme: ${current}`}
      className="inline-flex size-8 items-center justify-center rounded-md text-[#FF6521]/70 transition-colors hover:bg-[#FF6521]/10 hover:text-[#FF6521]"
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  );
}

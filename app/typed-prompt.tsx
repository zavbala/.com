"use client";

import { useEffect, useState } from "react";

// The argument cycles: type "jeremy", delete it, type "zavbala", repeat.
const words = ["jeremy", "zavbala"];

const TYPE_MS = 110;
const DELETE_MS = 55;
const HOLD_FULL_MS = 1800;
const HOLD_EMPTY_MS = 400;

export function TypedPrompt() {
  // Initial state is deterministic so SSR and first client render match.
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // No animation for users who prefer reduced motion — leave it static.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = words[wordIndex];

    // Whole word shown: pause, then start deleting.
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), HOLD_FULL_MS);
      return () => clearTimeout(t);
    }

    // Fully deleted: pause, then advance to the next word and resume typing.
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, HOLD_EMPTY_MS);
      return () => clearTimeout(t);
    }

    // Otherwise type or delete one character.
    const t = setTimeout(
      () =>
        setText((cur) =>
          deleting ? word.slice(0, cur.length - 1) : word.slice(0, cur.length + 1)
        ),
      deleting ? DELETE_MS : TYPE_MS
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex]);

  return (
    <p className="mb-6 text-foreground/40">
      $ man <span className="text-foreground/60">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </p>
  );
}

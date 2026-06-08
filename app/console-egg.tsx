"use client";

import { useEffect } from "react";

// Easter egg: anyone who opens devtools gets nudged toward the real magic —
// the site renders as a man page over curl. Renders nothing in the DOM.
export function ConsoleEgg() {
  useEffect(() => {
    const banner = [
      "      _                                ",
      "     (_) ___ _ __ ___ _ __ ___  _   _  ",
      "     | |/ _ \\ '__/ _ \\ '_ ` _ \\| | | | ",
      "     | |  __/ | |  __/ | | | | | |_| | ",
      "    _/ |\\___|_|  \\___|_| |_| |_|\\__, | ",
      "   |__/                         |___/  ",
    ].join("\n");

    console.log(
      `%c${banner}`,
      "color:#7dd3fc;font-family:monospace;font-size:12px;line-height:1.2",
    );
    console.log(
      "%cpsst — this whole site is a man page. try it from your terminal:",
      "color:#a3a3a3;font-style:italic",
    );
    console.log(
      "%c$ curl zavbala.com%c   #%c want json? %ccurl zavbala.com/man?format=json",
      "color:#4ade80;font-weight:bold",
      "color:#737373",
      "color:#737373",
      "color:#4ade80",
    );
  }, []);

  return null;
}

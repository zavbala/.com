import { ThemeToggle } from "./theme-toggle";
import { NotFoundPrompt } from "./not-found-prompt";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-14 sm:px-6 sm:py-16">
      <div className="fixed right-3 top-3 sm:right-4 sm:top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl text-sm leading-relaxed">
        <p className="text-foreground/70">
          <span className="select-none text-foreground/40">$ </span>
          jeremy <span className="text-foreground/50">--page</span>{" "}
          <span className="break-all text-foreground">$REQUEST_URI</span>
        </p>

        <p className="mt-2 text-foreground/70">
          bash: <span className="text-foreground">404</span>: No such file or
          directory
        </p>

        <p className="mt-6 text-foreground/40">
          <span className="select-none"># </span>the page you requested does not
          exist (exit status 404).
        </p>

        <NotFoundPrompt />
      </div>
    </main>
  );
}

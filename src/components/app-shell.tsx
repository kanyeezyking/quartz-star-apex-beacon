import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, House, MessageCircle, Repeat, Route } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { initSpeech } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/path", label: "Path", icon: Route },
  { to: "/practice", label: "Practice", icon: Repeat },
  { to: "/tutor", label: "Tutor", icon: MessageCircle },
  { to: "/progress", label: "Progress", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const due = useAppStore(
    (s) => Object.values(s.srs).filter((c) => c.nextReview <= Date.now()).length,
  );

  useEffect(() => {
    void useAppStore.persist.rehydrate().then(() => {
      useAppStore.getState().markHydrated();
    });
    initSpeech();
  }, []);

  const hideNav = pathname.startsWith("/lesson/");

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-border bg-bg-elevated px-4 py-6 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-3 px-2">
          <span className="flex size-9 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-fg">
            朱
          </span>
          <span>
            <span className="block font-display text-lg leading-none">Cinnabar</span>
            <span className="text-xs text-muted">朱砂</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                  active ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
                {item.to === "/practice" && due > 0 ? (
                  <span className="ml-auto tabular-nums text-xs text-primary">{due}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <p className="px-3 text-xs text-subtle">Mandarin to fluency</p>
      </aside>

      <div className={cn("relative md:pl-56", !hideNav && "pb-20 md:pb-0")}>
        {children}
      </div>

      {!hideNav ? (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg-elevated/95 backdrop-blur-sm md:hidden">
          <ul className="grid grid-cols-5">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex h-16 flex-col items-center justify-center gap-1 text-[11px]",
                      active ? "text-fg" : "text-muted",
                    )}
                  >
                    <span className="relative">
                      <Icon className="size-5" strokeWidth={1.75} />
                      {item.to === "/practice" && due > 0 ? (
                        <span className="absolute -right-2 -top-1 size-1.5 rounded-full bg-primary" />
                      ) : null}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

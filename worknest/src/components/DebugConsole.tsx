"use client";

import { useEffect, useState } from "react";

/**
 * TEMPORARY DEBUG TOOL — not part of the app design.
 *
 * Always-visible banner (dev-only, guarded by NODE_ENV — a build-time
 * constant, so this is safe from hydration mismatches) that proves whether
 * client-side JS actually ran on a given device, and surfaces any runtime
 * error/rejection/console.error. No external dependency (unlike Eruda),
 * so there's nothing else that can fail to load. Remove this file and its
 * import in layout.tsx once the mobile hamburger/drag-and-drop issue is
 * diagnosed.
 */
export function DebugConsole() {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: proves an effect fired at all
    setMounted(true); // if this never flips to true on a device, hydration never ran

    const push = (msg: string) => setLogs((prev) => [...prev.slice(-19), msg]);

    const onError = (event: ErrorEvent) => {
      push(`error: ${event.message} @ ${event.filename}:${event.lineno}`);
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      push(`unhandled rejection: ${String(event.reason)}`);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      push(`console.error: ${args.map(String).join(" ")}`);
      originalConsoleError(...args);
    };

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      console.error = originalConsoleError;
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      style={{
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        maxHeight: "40vh",
        overflowY: "auto",
        background: "rgba(0,0,0,0.88)",
        color: mounted ? "#7CFF8A" : "#FF5C5C",
        fontSize: 11,
        fontFamily: "ui-monospace, monospace",
        padding: "6px 8px",
        zIndex: 999999,
        whiteSpace: "pre-wrap",
        pointerEvents: "none",
      }}
    >
      <div>{mounted ? "✅ client JS is running" : "⏳ waiting for hydration…"}</div>
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}

import { useEffect, useRef } from "react";
export type CopyStatus = "idle" | "copying" | "success" | "error";

export function CopyFeedback({
  status,
  email,
  id,
}: {
  status: CopyStatus;
  email: string;
  id: string;
}) {
  const manual = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "error") {
      manual.current?.focus();
      manual.current?.select();
    }
  }, [status]);
  const message = {
    idle: "Open your email app, or copy the address.",
    copying: "Copying email address…",
    success: "Email address copied to clipboard.",
    error:
      "Copy unavailable. Select the address below and copy it manually, or use the email link.",
  }[status];
  return (
    <div className="copy-feedback">
      <p id={id} role="status" aria-live="polite" aria-atomic="true">
        {message}
      </p>
      {status === "error" && (
        <input
          ref={manual}
          readOnly
          className="manual-copy-input"
          aria-label="Email address to copy manually"
          aria-describedby={id}
          value={email}
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
    </div>
  );
}

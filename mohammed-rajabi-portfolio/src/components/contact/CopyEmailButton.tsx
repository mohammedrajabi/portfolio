import { useId, useState } from "react";
import { Copy, Check } from "lucide-react";
import { BrutalistButton } from "../ui/BrutalistButton";
import { CopyFeedback, type CopyStatus } from "./CopyFeedback";
import { copyText } from "../../utils/clipboard";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const feedbackId = useId();
  const copy = async () => {
    if (status === "copying") return;
    setStatus("copying");
    try {
      await copyText(email, navigator.clipboard);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="copy-email-control">
      <BrutalistButton
        className="contact-copy"
        variant="secondary"
        aria-disabled={status === "copying"}
        aria-busy={status === "copying"}
        aria-describedby={feedbackId}
        onClick={copy}
      >
        {status === "success"
          ? "Copied!"
          : status === "copying"
            ? "Copying…"
            : "Copy email"}
        {status === "success" ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Copy size={17} aria-hidden="true" />
        )}
      </BrutalistButton>
      <CopyFeedback id={feedbackId} status={status} email={email} />
    </div>
  );
}

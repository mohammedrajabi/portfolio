export type ClipboardWriter = Pick<Clipboard, "writeText">;

// Resolve only after the browser confirms the write; let the UI handle failures.
export async function copyText(
  text: string,
  clipboard?: ClipboardWriter,
): Promise<void> {
  if (!clipboard?.writeText) throw new Error("Clipboard unavailable");
  await clipboard.writeText(text);
}

import type { ComponentPropsWithRef } from "react";
type Props = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary";
};
export function BrutalistButton({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={["brutalist-button", "button-" + variant, className].join(" ")}
      {...props}
    />
  );
}

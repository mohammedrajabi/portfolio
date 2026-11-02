import assert from "node:assert/strict";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "../src/components/theme/ThemeProvider";
import { useTheme } from "../src/hooks/useTheme";
import { CopyEmailButton } from "../src/components/contact/CopyEmailButton";
import { BackToTop } from "../src/components/navigation/BackToTop";
import { AnimationProvider } from "../src/components/AnimationProvider";
import { ProjectMedia } from "../src/components/projects/ProjectMedia";
import { contacts } from "../src/content/contact";
import { SkillsTabs } from "../src/components/skills/SkillsTabs";
import { skills } from "../src/content/skills";

function ThemeProbe() {
  const { preference, resolvedTheme, setPreference } = useTheme();
  return (
    <>
      <output>
        {preference}:{resolvedTheme}
      </output>
      <button onClick={() => setPreference("light")}>Light</button>
      <button onClick={() => setPreference("dark")}>Dark</button>
      <button onClick={() => setPreference("system")}>System</button>
    </>
  );
}
export async function runInteractionChecks({
  setMedia,
  listenerCount,
}: {
  setMedia: (query: string, value: boolean) => void;
  listenerCount: (query: string) => number;
}) {
  const container = document.getElementById("test-root")!;
  const root = createRoot(container);
  await act(async () => root.render(<SkillsTabs />));
  const tabs = [
    ...container.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  ];
  const panels = [
    ...container.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
  ];
  const assertTab = (index: number) => {
    assert.equal(
      tabs.filter((tab) => tab.getAttribute("aria-selected") === "true").length,
      1,
    );
    assert.equal(tabs[index]!.getAttribute("aria-selected"), "true");
    assert.equal(tabs[index]!.tabIndex, 0);
    assert.equal(panels.filter((panel) => !panel.hidden).length, 1);
    assert.equal(panels[index]!.hidden, false);
    assert.equal(tabs[index]!.getAttribute("aria-controls"), panels[index]!.id);
    assert.equal(
      panels[index]!.getAttribute("aria-labelledby"),
      tabs[index]!.id,
    );
    assert.deepEqual(
      [...panels[index]!.querySelectorAll(".skill-list li span")].map(
        (item) => item.textContent,
      ),
      skills[index]!.skills,
    );
  };
  assert.equal(tabs.length, 5);
  assertTab(0);
  for (const [key, index] of [
    ["End", 4],
    ["ArrowRight", 0],
    ["ArrowLeft", 4],
    ["Home", 0],
    ["ArrowDown", 1],
    ["ArrowUp", 0],
  ] as const) {
    await act(async () =>
      container
        .querySelector('[role="tab"][aria-selected="true"]')!
        .dispatchEvent(
          new window.KeyboardEvent("keydown", {
            key,
            bubbles: true,
            cancelable: true,
          }),
        ),
    );
    assertTab(index);
    assert.equal(document.activeElement, tabs[index]);
  }
  for (let index = 0; index < tabs.length; index++) {
    await act(async () => tabs[index]!.click());
    assertTab(index);
  }
  assert.equal(
    container.querySelectorAll(".skill-list li").length,
    21,
    "All approved categories remain in crawler-readable HTML",
  );
  const darkQuery = "(prefers-color-scheme: dark)";
  await act(async () =>
    root.render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    ),
  );
  assert.equal(container.querySelector("output")?.textContent, "system:light");
  await act(async () => setMedia(darkQuery, true));
  assert.equal(document.documentElement.dataset.theme, "dark");
  await act(async () => container.querySelectorAll("button")[0]!.click());
  assert.equal(window.localStorage.getItem("mr-theme"), "light");
  await act(async () => setMedia(darkQuery, false));
  await act(async () => setMedia(darkQuery, true));
  assert.equal(document.documentElement.dataset.theme, "light");
  await act(async () => container.querySelectorAll("button")[2]!.click());
  assert.equal(window.localStorage.getItem("mr-theme"), null);
  assert.equal(document.documentElement.dataset.theme, "dark");
  await act(async () => root.render(<div />));
  assert.equal(
    listenerCount(darkQuery),
    0,
    "Theme query listener must be cleaned up",
  );

  const email = contacts.find((contact) => contact.kind === "email")!.value;
  let resolveWrite!: () => void;
  let written = "";
  const pending = new Promise<void>((resolve) => {
    resolveWrite = resolve;
  });
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: (value: string) => {
        written = value;
        return pending;
      },
    },
  });
  await act(async () =>
    root.render(<CopyEmailButton key="pending" email={email} />),
  );
  const button = container.querySelector("button")!;
  button.focus();
  await act(async () => button.click());
  assert.equal(button.getAttribute("aria-busy"), "true");
  assert.equal(button.getAttribute("aria-disabled"), "true");
  assert.equal(document.activeElement, button);
  assert.doesNotMatch(container.textContent ?? "", /Email address copied/);
  await act(async () => {
    resolveWrite();
    await pending;
  });
  assert.equal(written, email);
  assert.match(
    container.textContent ?? "",
    /Email address copied to clipboard/,
  );
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async () => {
        throw new Error("Denied");
      },
    },
  });
  await act(async () =>
    root.render(<CopyEmailButton key="denied" email={email} />),
  );
  await act(async () => container.querySelector("button")!.click());
  const manual = container.querySelector("input")!;
  assert.equal(manual.value, email);
  assert.equal(document.activeElement, manual);
  assert.equal(manual.selectionStart, 0);
  assert.equal(manual.selectionEnd, email.length);
  assert.match(container.textContent ?? "", /Copy unavailable/);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: undefined,
  });
  await act(async () =>
    root.render(<CopyEmailButton key="unavailable" email={email} />),
  );
  await act(async () => container.querySelector("button")!.click());
  assert.ok(container.querySelector("input[readonly]"));

  await act(async () =>
    root.render(
      <ProjectMedia
        title="isolated test only"
        image={{
          src: "/test-only-missing.png",
          alt: "test-only",
          width: 1200,
          height: 750,
        }}
      />,
    ),
  );
  await act(async () =>
    container.querySelector("img")!.dispatchEvent(new Event("error")),
  );
  assert.match(container.textContent ?? "", /Preview image unavailable/);

  let scrollPosition = 0;
  let behavior: ScrollBehavior | undefined;
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    get: () => scrollPosition,
  });
  window.scrollTo = ((options: ScrollToOptions) => {
    behavior = options.behavior;
    scrollPosition = options.top ?? 0;
  }) as typeof window.scrollTo;
  await act(async () => setMedia("(prefers-reduced-motion: reduce)", true));
  await act(async () =>
    root.render(
      <AnimationProvider>
        <MemoryRouter initialEntries={["/projects/test-only"]}>
          <BackToTop />
        </MemoryRouter>
      </AnimationProvider>,
    ),
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 25));
  });
  assert.equal(container.querySelector("button"), null);
  scrollPosition = 1200;
  await act(async () => {
    window.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 25));
  });
  assert.ok(container.querySelector('button[aria-label="Back to top"]'));
  await act(async () => container.querySelector("button")!.click());
  assert.equal(behavior, "instant");
  assert.equal(document.activeElement?.id, "main-content");
  await act(async () => root.unmount());
  console.log(
    "DOM interaction checks passed: live media changes, stored override, listener cleanup, pending/success/error clipboard UI, manual selection, image fallback, and reduced-motion Back to Top.",
  );
}

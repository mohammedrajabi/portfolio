import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import desktop from "lighthouse/core/config/desktop-config.js";
await fs.mkdir(".qa", { recursive: true });
const prefix = process.env.QA_REPORT_PREFIX || "lighthouse";
if (!/^[a-z0-9-]+$/.test(prefix))
  throw new Error(
    "QA_REPORT_PREFIX must contain only lowercase letters, numbers and hyphens.",
  );
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  chromeFlags: [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    ...(process.env.QA_DARK === "1" ? ["--force-dark-mode"] : []),
  ],
});
try {
  const results = [];
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse(
      "http://127.0.0.1:4173/",
      {
        port: chrome.port,
        output: ["json", "html"],
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      mode === "desktop" ? desktop : undefined,
    );
    if (!result || result.lhr.runtimeError)
      throw new Error(JSON.stringify(result?.lhr.runtimeError));
    await fs.writeFile(`.qa/${prefix}-${mode}.json`, result.report[0]);
    await fs.writeFile(`.qa/${prefix}-${mode}.html`, result.report[1]);
    const { lhr } = result;
    const scores = Object.fromEntries(
      Object.entries(lhr.categories).map(([name, value]) => [
        name,
        Math.round(value.score * 100),
      ]),
    );
    const metrics = Object.fromEntries(
      [
        "largest-contentful-paint",
        "cumulative-layout-shift",
        "total-blocking-time",
      ].map((name) => [name, lhr.audits[name].numericValue]),
    );
    const failures = Object.entries(lhr.audits)
      .filter(
        ([, audit]) =>
          audit.score !== null &&
          audit.score < 1 &&
          audit.details?.items?.length,
      )
      .map(([id, audit]) => ({
        id,
        title: audit.title,
        score: audit.score,
        display: audit.displayValue,
      }));
    results.push({ mode, scores, metrics, failures });
    console.log(JSON.stringify(results.at(-1)));
  }
  await fs.writeFile(
    `.qa/${prefix}-summary.json`,
    JSON.stringify(results, null, 2),
  );
} finally {
  await chrome.kill();
}

import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  // Wait for the form to be hydrated
  await page.waitForSelector('button[type="submit"]:not([disabled])');

  // Fill input and submit
  await page.fill('input[name="test-field"]', "hello");
  await page.click('button[type="submit"]');

  // Wait for the result to appear in the <pre> tag
  await page.waitForSelector("pre", { timeout: 10000 });

  const result = await page.textContent("pre");

  console.log("=== Environment ===");
  console.log(`OS: ${process.platform}`);
  console.log(`Node: ${process.version}`);
  console.log("");
  console.log("=== Result ===");
  console.log(result);

  await browser.close();

  const parsed = JSON.parse(result);
  if (parsed.received === "hello") {
    console.log("\nPASS: FormData was received correctly");
    process.exit(0);
  } else {
    console.log("\nFAIL: FormData appears to be empty");
    console.log("Received:", parsed.received);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test error:", err.message);
  process.exit(1);
});

import { mkdir, copyFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetPath = resolve(__dirname, "../src/data/moc_Data.json");
const preferredSourcePath = resolve(__dirname, "../../data/moc_Data.json");

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function syncDataFile() {
  const hasPreferredSource = await fileExists(preferredSourcePath);
  const hasTarget = await fileExists(targetPath);

  if (!hasPreferredSource && hasTarget) {
    // In Vercel, repository root may be `my-app`, so keep existing src data file.
    console.log(`Data source not found at ${preferredSourcePath}; using existing ${targetPath}`);
    return;
  }

  if (!hasPreferredSource && !hasTarget) {
    throw new Error(
      `Data file not found in either location: ${preferredSourcePath} or ${targetPath}`
    );
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(preferredSourcePath, targetPath);
  console.log(`Synced data file from ${preferredSourcePath} to ${targetPath}`);
}

syncDataFile().catch((error) => {
  console.error("Failed to sync data file:", error);
  process.exitCode = 1;
});


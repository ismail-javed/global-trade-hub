import { mkdir, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = resolve(__dirname, "../../data/moc_Data.json");
const targetPath = resolve(__dirname, "../src/data/moc_Data.json");

async function syncDataFile() {
  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(sourcePath, targetPath);
  console.log(`Synced data file to ${targetPath}`);
}

syncDataFile().catch((error) => {
  console.error("Failed to sync data file:", error);
  process.exitCode = 1;
});


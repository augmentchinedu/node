import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const name = process.env.NAME;

if (!name) {
  throw new Error("NAME environment variable is required");
}

console.log(`Fetching client config for: ${name}`);

// Call your API
const response = await fetch(`https://dummy-rt2a.onrender.com/api/clients/${name}`);

if (!response.ok) {
  throw new Error(`Failed to fetch client data: ${response.status}`);
}

const client = await response.json();

const dependencies = client.dependencies || {};
const devDependencies = client.devDependencies || {};

console.log("Resolved dependencies:", dependencies);

// Build package.json dynamically
const packageJson = {
  name,
  version: "1.0.0",
  type: "module",
  private: true,
  main: "index.js",
  scripts: {
    start: "node index.js",
    build: client.buildScript || "vite build",
  },
  dependencies,
  devDependencies,
};

// Write package.json into the CURRENT WORKSPACE (not build repo)
const outputPath = `/workspace/package.json`;

await writeFile(outputPath, JSON.stringify(packageJson, null, 2));

console.log(packageJson);
console.log(`package.json generated at ${outputPath}`);

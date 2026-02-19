import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const id = process.env.ID;

if (!id) {
  throw new Error("ID environment variable is required");
}

console.log(`Fetching client config for: ${id}`);

// Fetch client config from API
const response = await fetch(
  `https://dummy-rt2a.onrender.com/api/clients/${id}`
);

if (!response.ok) {
  throw new Error(`Failed to fetch client data: ${response.status}`);
}

const client = await response.json();

const dependencies = client.dependencies || {};
const devDependencies = client.devDependencies || {};

// Build package.json dynamically
const packageJson = {
  name: id,
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

// Write package.json
const packagePath = `/workspace/package.json`;
await writeFile(packagePath, JSON.stringify(packageJson, null, 2));
console.log(`package.json generated at ${packagePath}`);

// 3️⃣ Create Dockerfile for any environment
const dockerfileContent = `
# Use official Node.js 20 LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --omit=dev

# Copy remaining files
COPY . .

# Expose port
EXPOSE 3000

# Default environment variables
ENV PORT=3000
ENV NODE_ENV=production
ENV NAME=${client.name}

# Start the app
CMD ["node", "index.js"]
`.trim();

const dockerfilePath = `/workspace/Dockerfile`;
await writeFile(dockerfilePath, dockerfileContent);
console.log(`Dockerfile generated at ${dockerfilePath}`);

// 4️⃣ Generate app.yaml only if target is GAE
if (process.env.DEPLOY_TARGET === "gae") {
  console.log("GAE deployment target detected. Generating app.yaml (Flex)...");

  const appYamlContent =
    "runtime: custom\n" +
    "env: flex\n" +
    "service: default\n" +
    "\n" +
    "automatic_scaling:\n" +
    "  min_num_instances: 1\n" +
    "  max_num_instances: 3\n";

  await writeFile("/workspace/app.yaml", appYamlContent);

  console.log("app.yaml generated for App Engine Flex");
} else {
  console.log("DEPLOY_TARGET is not 'gae'. Skipping app.yaml generation.");
}

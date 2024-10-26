#!/usr/bin/env node

import { spawn } from "child_process";
import { Command } from "commander";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name("assets-viewer")
  .description("CLI to initialize and manage Assets Viewer")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize Assets Viewer by scanning SVG icons.")
  .action(() => {
    const iconsDir = path.resolve(process.cwd(), "src/assets/icons");
    const outputFile = path.resolve(process.cwd(), "server/assets.json");

    if (!fs.existsSync(iconsDir)) {
      console.error(`Icons directory not found: ${iconsDir}`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(iconsDir)
      .filter((file) => file.endsWith(".svg"));

    const assets = files.map((file) => ({
      name: path.basename(file, ".svg"),
      path: `/assets/icons/${file}`,
    }));

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(assets, null, 2));

    console.log(`Assets JSON generated at ${outputFile}`);
  });

program
  .command("start")
  .description("Start assets viewer with server and frontend")
  .action(() => {
    // Resolve to project root
    const projectRoot = path.resolve(__dirname, "../");

    // Start the server
    const server = spawn("npm", ["run", "start-server"], {
      stdio: "inherit",
      cwd: projectRoot, // Server in project root
      shell: true,
    });

    // Start the viewer
    const viewerPath = path.resolve(projectRoot, "viewer");
    const viewer = spawn("npm", ["run", "start-viewer"], {
      stdio: "inherit",
      cwd: viewerPath, // Set cwd to /viewer folder
      shell: true,
    });

    // Handle process errors
    server.on("error", (err) => {
      console.error(`Error starting server: ${err.message}`);
    });

    viewer.on("error", (err) => {
      console.error(`Error starting viewer: ${err.message}`);
    });
  });

program.parse(process.argv);

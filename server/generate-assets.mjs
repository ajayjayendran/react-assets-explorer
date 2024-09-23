import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function generateIconsData(iconsDir) {
  const outputFilePath = path.resolve(process.cwd(), "src/icons.json");

  if (!fs.existsSync(iconsDir)) {
    console.error(`Error: Directory ${iconsDir} does not exist.`);
    return;
  }

  const iconFiles = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"));

  const iconData = iconFiles.map((file) => ({
    name: path.basename(file, ".svg"),
    path: `/icons/${file}`,
  }));

  fs.writeFileSync(outputFilePath, JSON.stringify(iconData, null, 2));
  console.log(`Generated ${iconFiles.length} icons in iconsData.json`);
}

// If the script is executed via CLI
if (process.argv[1].endsWith("generate-assets.mjs")) {
  const iconsDir =
    process.argv[2] || path.resolve(process.cwd(), "public/icons");
  generateIconsData(iconsDir);
}

import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static SVG assets
app.use(
  "/assets/icons",
  express.static(path.join(process.cwd(), "src/assets/icons"))
);

// Serve the React viewer build
app.use(
  "/assets-viewer",
  express.static(path.join(__dirname, "../viewer/build"))
);

// API endpoint to get assets JSON
app.get("/api/assets", (req, res) => {
  const assetsPath = path.join(__dirname, "assets.json");
  if (fs.existsSync(assetsPath)) {
    const assets = JSON.parse(fs.readFileSync(assetsPath, "utf-8"));
    res.json(assets);
  } else {
    res
      .status(404)
      .json({ error: "Assets not found. Please run `assets-viewer init`." });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(
    `Assets Viewer accessible at http://localhost:${PORT}/assets-viewer`
  );
});

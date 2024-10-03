import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());

// Endpoint to serve icons data
app.get("/icons", (req, res) => {
  console.log("/icons....");
  const iconsFilePath = path.join(process.cwd(), "src/icons.json");

  console.log(`Looking for icons data at: ${iconsFilePath}`);

  fs.readFile(iconsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading icons data:", err);
      res.status(500).send("Error reading icons data");
      return;
    }

    // Check if the data is valid JSON
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      res.send(jsonData);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      res.status(500).send("Invalid JSON format");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

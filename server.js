
import { getAllProjects } from "./src/models/projects.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS, images, and other static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Organizations page
app.get("/organizations", (req, res) => {
  res.render("organizations", { title: "Organizations" });
});


// Service projects page
app.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();

    // Display retrieved projects in the terminal
    console.log("Projects retrieved:", projects.length);
    console.table(projects);

    res.render("projects", {
      title: "Service Projects",
      projects,
    });
  } catch (error) {
    console.error("Error retrieving service projects:", error);
    res.status(500).send("Unable to retrieve service projects.");
  }
});

// Categories page
app.get("/categories", (req, res) => {
  res.render("categories", { title: "Service Project Categories" });
});

// Handle pages that do not exist
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

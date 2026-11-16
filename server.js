
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getAllProjects } from "./src/models/projects.js";
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllCategories } from "./src/models/categories.js";
import { testConnection } from "./src/models/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS, images, and other static files
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// HOME PAGE
// ==========================================

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// ==========================================
// ORGANIZATIONS PAGE
// ==========================================

app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });

  } catch (error) {
    console.error("Error retrieving organizations:", error);
    res.status(500).send("Unable to retrieve organizations.");
  }
});

// ==========================================
// SERVICE PROJECTS PAGE
// ==========================================

app.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects,
    });

  } catch (error) {
    console.error("Error retrieving service projects:", error);
    res.status(500).send("Unable to retrieve service projects.");
  }
});

// ==========================================
// CATEGORIES PAGE
// ==========================================

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Service Project Categories",
      categories,
    });

  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).send("Unable to retrieve categories.");
  }
});

// ==========================================
// 404 ERROR HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// ==========================================
// START SERVER
// ==========================================

testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  });
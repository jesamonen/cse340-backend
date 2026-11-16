import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRoute from "./src/routes/homeRoute.js";
import organizationsRoute from "./src/routes/organizationsRoute.js";
import projectsRoute from "./src/routes/projectsRoute.js";
import categoriesRoute from "./src/routes/categoriesRoute.js";
import organizationRoute from "./src/routes/organizationRoute.js";
import projectRoute from "./src/routes/projectRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";

import { testConnection } from "./src/models/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Serve CSS, images, and other static files
app.use(express.static(path.join(__dirname, "public")));

// MVC routes
app.use("/", homeRoute);
app.use("/organizations", organizationsRoute);
app.use("/organization", organizationRoute);
app.use("/projects", projectsRoute);
app.use("/project", projectRoute);
app.use("/categories", categoriesRoute);
app.use("/category", categoryRoute);

// 404 error handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
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

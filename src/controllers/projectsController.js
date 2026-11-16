import { getAllProjects } from "../models/projects.js";

// Build the service projects page
const buildProjects = async (req, res, next) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export { buildProjects };
import { getProjectById } from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";

// Build the project detail page
const buildProjectDetail = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).render("404", {
        title: "Page Not Found",
      });
    }

    const categories = await getCategoriesByProjectId(projectId);

    res.render("project", {
      title: project.title,
      project,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { buildProjectDetail };
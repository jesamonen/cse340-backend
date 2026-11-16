import {
  getCategoryById,
} from "../models/categories.js";

import {
  getProjectsByCategoryId,
} from "../models/projects.js";

// Display one category and its associated projects
const buildCategoryDetail = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render("category", {
      title: category.category_name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export { buildCategoryDetail };

import { getAllCategories } from "../models/categories.js";

// Build the categories page
const buildCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Service Project Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { buildCategories };
import { getAllOrganizations } from "../models/organizations.js";

// Build the organizations page
const buildOrganizations = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

export { buildOrganizations };
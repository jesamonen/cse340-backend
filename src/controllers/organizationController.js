import { getOrganizationById } from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";

// Build the organization detail page
const buildOrganizationDetail = async (req, res, next) => {
  try {
    const organizationId = req.params.id;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
      return res.status(404).render("404", {
        title: "Page Not Found",
      });
    }

    const projects = await getProjectsByOrganizationId(organizationId);

    res.render("organization", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export { buildOrganizationDetail };
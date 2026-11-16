
import pool from "./db.js";

// Get all organizations from the database
const getAllOrganizations = async () => {
  const sql = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    ORDER BY name ASC;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

// Get one organization by its ID
const getOrganizationById = async (organizationId) => {
  const sql = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    WHERE organization_id = $1;
  `;

  const result = await pool.query(sql, [organizationId]);

  return result.rows[0];
};

export { getAllOrganizations, getOrganizationById };

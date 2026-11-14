
import pool from "../database.js";

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

export { getAllOrganizations };


import pool from "../database.js";

// Get all service projects with their organization names
const getAllProjects = async () => {
  const sql = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      TO_CHAR(sp.date, 'FMMonth DD, YYYY') AS formatted_date,
      o.name AS organization_name
    FROM service_project AS sp
    INNER JOIN organization AS o
      ON sp.organization_id = o.organization_id
    ORDER BY sp.date ASC;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

export { getAllProjects };

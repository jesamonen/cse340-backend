
import pool from "../database.js";

// Get all service projects with their organization names and categories
const getAllProjects = async () => {
  const sql = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      TO_CHAR(sp.date, 'FMMonth DD, YYYY') AS formatted_date,
      o.name AS organization_name,
      COALESCE(
        STRING_AGG(c.category_name, ', ' ORDER BY c.category_name),
        'Uncategorized'
      ) AS categories
    FROM service_project AS sp
    INNER JOIN organization AS o
      ON sp.organization_id = o.organization_id
    LEFT JOIN project_category AS pc
      ON sp.project_id = pc.project_id
    LEFT JOIN category AS c
      ON pc.category_id = c.category_id
    GROUP BY
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date,
      o.name
    ORDER BY sp.date ASC;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

export { getAllProjects };

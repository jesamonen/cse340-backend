
import pool from "./db.js";

// ==========================================
// GET ALL SERVICE PROJECTS
// Includes organization names and categories
// ==========================================

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

// ==========================================
// GET ALL PROJECTS BY ORGANIZATION ID
// Includes associated categories
// ==========================================

const getProjectsByOrganizationId = async (organizationId) => {
  const sql = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      TO_CHAR(sp.date, 'FMMonth DD, YYYY') AS formatted_date,
      COALESCE(
        STRING_AGG(c.category_name, ', ' ORDER BY c.category_name),
        'Uncategorized'
      ) AS categories
    FROM service_project AS sp
    LEFT JOIN project_category AS pc
      ON sp.project_id = pc.project_id
    LEFT JOIN category AS c
      ON pc.category_id = c.category_id
    WHERE sp.organization_id = $1
    GROUP BY
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date
    ORDER BY sp.date ASC;
  `;

  const result = await pool.query(sql, [organizationId]);
  return result.rows;
};

// ==========================================
// GET ONE PROJECT BY PROJECT ID
// Includes organization name
// ==========================================

const getProjectById = async (projectId) => {
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
    WHERE sp.project_id = $1;
  `;

  const result = await pool.query(sql, [projectId]);
  return result.rows[0];
};

// ==========================================
// GET ALL PROJECTS BY CATEGORY ID
// ==========================================

const getProjectsByCategoryId = async (categoryId) => {
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
    INNER JOIN project_category AS pc
      ON sp.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY sp.date ASC;
  `;

  const result = await pool.query(sql, [categoryId]);
  return result.rows;
};

// ==========================================
// EXPORT MODEL FUNCTIONS
// ==========================================

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getProjectById,
  getProjectsByCategoryId
};

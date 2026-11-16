import pool from "./db.js";

// Get all categories from the database
const getAllCategories = async () => {
  const sql = `
    SELECT
      category_id,
      category_name,
      category_description
    FROM category
    ORDER BY category_name ASC;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

// Get all categories belonging to one project
const getCategoriesByProjectId = async (projectId) => {
  const sql = `
    SELECT
      c.category_id,
      c.category_name,
      c.category_description
    FROM category AS c
    INNER JOIN project_category AS pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name ASC;
  `;

  const result = await pool.query(sql, [projectId]);

  return result.rows;
};

// Get one category by its ID
const getCategoryById = async (categoryId) => {
  const sql = `
    SELECT
      category_id,
      category_name,
      category_description
    FROM category
    WHERE category_id = $1;
  `;

  const result = await pool.query(sql, [categoryId]);

  return result.rows[0];
};

export {
  getAllCategories,
  getCategoriesByProjectId,
  getCategoryById
};
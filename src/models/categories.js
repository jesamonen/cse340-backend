
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

export { getAllCategories };

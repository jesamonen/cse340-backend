
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Support both the official DB_URL and your existing DATABASE_URL.
const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

let db = pool;

// Log SQL queries during development when logging is enabled.
if (
  process.env.NODE_ENV === "development" &&
  process.env.ENABLE_SQL_LOGGING === "true"
) {
  db = {
    async query(text, params) {
      try {
        const start = Date.now();
        const result = await pool.query(text, params);
        const duration = Date.now() - start;

        console.log("Executed query:", {
          text: text.replace(/\s+/g, " ").trim(),
          duration: `${duration}ms`,
          rows: result.rowCount,
        });

        return result;
      } catch (error) {
        console.error("Error in query:", {
          text: text.replace(/\s+/g, " ").trim(),
          error: error.message,
        });

        throw error;
      }
    },

    async close() {
      await pool.end();
    },
  };
}

// Test the database connection.
const testConnection = async () => {
  try {
    const result = await db.query("SELECT NOW() AS current_time");

    console.log(
      "Database connection successful:",
      result.rows[0].current_time
    );

    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export { db as default, testConnection };

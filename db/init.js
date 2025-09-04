const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
  const client = await pool.connect();
  try {
    // Try to acquire advisory lock (bigint key)
    const lockKey = 1234567890; // unique lock key for your migration
    const gotLockRes = await client.query(
      "SELECT pg_try_advisory_lock($1) AS acquired",
      [lockKey]
    );

    if (!gotLockRes.rows[0].acquired) {
      console.log("Another migration is running, skipping this migration.");
      return;
    }

    console.log("Migration lock acquired!");

    // Read migration SQL from file
    const sqlFilePath = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");

    // Run migration SQL statements
    await client.query(sql);

    console.log("Migration completed successfully.");

    // Release advisory lock
    await client.query("SELECT pg_advisory_unlock($1)", [lockKey]);
  } catch (err) {
    console.error("Migration failed:", err);
    throw err;
  } finally {
    client.release();
  }
}

// Run the migration script
runMigration()
  .then(() => {
    console.log("Migration script finished.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration script failed:", err);
    process.exit(1);
  });

import cdb from '../../conn';
export async function addInstitute(obj) {
  try {
      const db = await cdb();

      // Create the institute table if not exists
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS institute(
              id INT AUTO_INCREMENT PRIMARY KEY,
              name TEXT,
              email TEXT,
              phone TEXT,
              address TEXT,
              logo TEXT,
              tcnumber TEXT,
              password TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
      `;

      await db.query(createTableQuery);

      // Insert data into the institute table
      const insertQuery = `
          INSERT INTO institute (name, email, phone, address, logo, tcnumber, password, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;

      await db.query(insertQuery, [
          obj.name,
          obj.email,
          obj.phone,
          obj.address,
          obj.logo,
          obj.tcnumber,
          obj.password
      ]);

      // Close the database connection
      db.end();

      return "Institute Saved successfully!";
  } catch (error) {
      console.log("Error in addInstitute:", error.message);
      throw error;
  }
}

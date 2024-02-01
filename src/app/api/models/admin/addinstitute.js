import cdb from '../../conn';

export function addInstitute(obj) {
  return new Promise((resolve, reject) => {
    const db = cdb();

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
      )`;
      
    db.query(createTableQuery, (err) => {
      if (err) {
        reject(err.message);
        db.end();
        return;
      }

      // Insert data into the institute table
      const insertQuery = `
        INSERT INTO institute (name, email, phone, address, logo, tcnumber, password, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
      db.query(
        insertQuery,
        [
          obj.name,
          obj.email,
          obj.phone,
          obj.address,
          obj.logo,
          obj.tcnumber,
          obj.password,
          obj.created_at,
        ],
        (err) => {
          if (err) {
            reject(err.message);
          } else {
            resolve("Institute Saved successfully!");
          }
          db.end();
        }
      );
    });
  });
}

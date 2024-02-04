import { comparePassword, hashPassword } from './secure.js';
import jwt from 'jsonwebtoken';
import cdb from "./conn"
async function updateUser(name, email, phone, id) {
  try {
      const db = await cdb();

      // Check if the user exists
      const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);

      // Check if the result is not empty
      if (rows.length === 0) {
          db.end();
          throw new Error('No user found');
      }

      // Update the user
      const [updateResult] = await db.query('UPDATE admin SET name=?, email=?, phone=? WHERE id=?', [name, email, phone, id]);

      // Check if the update was successful
      if (updateResult.affectedRows === 0) {
          db.end();
          throw new Error('Admin not updated');
      }

      // Close the database connection
      db.end();

      return 'Admin updated successfully';
  } catch (error) {
      console.log("Error in updateUser:", error.message);
      throw error;
  }
}


async function getuser(id) {
  try {
      const db = await cdb();

      // Use async/await to execute the query and handle errors
      const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);

      // Check if the result is not empty
      if (rows.length === 0) {
          throw new Error('No user found');
      }

      // Assuming you only expect one result, use the first row
      const row = rows[0];

      // Close the database connection
      db.end();

      // Resolve with the user data
      return row;
  } catch (error) {
      console.log("Error in getuser:", error.message);
      throw error;
  }
}

async function createAdmin(name, email, phone, password, joining_date, isadmin = true) {
  try {
      const db = await cdb();

      // Hash the password using your hashPassword function
      const hash = await hashPassword(password);

      // Check for duplicate email or phone
      const [duplicateRows] = await db.query('SELECT COUNT(*) as count FROM admin WHERE email=? OR phone=?', [email, phone]);

      const isDuplicate = duplicateRows[0].count > 0;
      if (isDuplicate) {
          throw new Error('Email or phone already exists');
      }

      // Insert new admin
      const [insertResult] = await db.query(`
          INSERT INTO admin (name, email, phone, password,isadmin)
          VALUES (?, ?, ?, ?,?)
      `, [name, email, phone, hash,isadmin]);

      // Retrieve the inserted admin
      const [selectResult] = await db.query(`
          SELECT name, email, phone, joining_date
          FROM admin
          WHERE email=?
      `, [email]);

      const result = selectResult[0];

      // Close the database connection
      db.end();

      return result;
  } catch (error) {
      console.log("Error in createAdmin:", error.message);
      throw error;
  }
}

async function adminLogin(email, password) {
    try {
        const db = await cdb();

        const [rows] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);

        if (rows.length === 0) {
            db.end();
            throw new Error('Invalid email');
        }

        const row = rows[0];

        const isPasswordMatch = await comparePassword(password, row.password);

        if (!isPasswordMatch) {
            db.end();
            throw new Error('Password Not matched');
        }

        const tokenData = {
            id: row.id,
            name: row.name,
            email: row.email,
            joining_date: row.joining_date,
            isadmin: row.isadmin,
            admin: true,
        };

        const token = await signTokenAsync(tokenData);

        db.end();
        return token;
    } catch (error) {
        console.log("Error in adminLogin:", error.message);
        throw error;
    }
}

export async function instituteLogin(email, password) {
  try {
      const db = await cdb();

      const [rows] = await db.query('SELECT * FROM institute WHERE email = ?', [email]);

      if (rows.length === 0) {
          db.end();
          throw new Error('Invalid email');
      }

      const row = rows[0];

      const isPasswordMatch = await comparePassword(password, row.password);

      if (!isPasswordMatch) {
          db.end();
          throw new Error('Password Not matched');
      }

      const tokenData = {
          // Assuming you want to include other fields excluding 'password' and 'logo'
          // Modify as per your requirements
          id: row.id,
          email: row.email,
          institute: true,
      };

      const token = await signTokenAsync(tokenData);

      db.end();
      return token;
  } catch (error) {
      console.log("Error in instituteLogin:", error.message);
      throw error;
  }
}

function queryAsync(db, query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

function signTokenAsync(tokenData) {
  return new Promise((resolve, reject) => {
    jwt.sign(tokenData, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export { createAdmin, adminLogin, getuser,updateUser };

import { comparePassword, hashPassword } from './secure.js';
import jwt from 'jsonwebtoken';
import cdb from "./conn"
function updateUser(name, email, phone, id) {
  return new Promise(async(resolve, reject) => {
    const db = await cdb();

    const checkUserQuery = "SELECT * FROM admin WHERE id = ?";
    db.query(checkUserQuery, [id], (err, row) => {
      if (err) {
        reject(err.message);
      } else if (!row) {
        reject("No user found");
      } else {
        const updateUserQuery = "UPDATE admin SET name=?, email=?, phone=? WHERE id=?";
        db.query(updateUserQuery, [name, email, phone, id], (err) => {
          if (err) {
            reject(err.message);
          } else {
            resolve("Admin updated successfully");
          }
        });
      }

      // The 'mysql' package automatically manages the connection, so there's no need to close it manually
    });
  });
}


function getuser(id) {
  return new Promise(async(resolve, reject) => {
    const db = await cdb();

    const query = "SELECT * FROM admin WHERE id = ?";
    
    db.query(query, [id], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        // Assuming you only expect one result, use the first row
        const row = rows[0];
        resolve(row);
      }

      // The 'mysql' package automatically manages the connection, so there's no need to close it manually
    });
  });
}

function createAdmin(name, email, phone, password, joining_date,isadmin=true) {
  return new Promise(async(resolve, reject) => {
    const db = await cdb();

    hashPassword(password)
      .then((hash) => {
        const checkDuplicateQuery = 'SELECT COUNT(*) as count FROM admin WHERE email=? OR phone=?';
        db.query(checkDuplicateQuery, [email, phone], (err, rows) => {
          if (err) {
            reject(err.message);
            db.close();
          } else {
            const isDuplicate = rows[0].count > 0;
            if (isDuplicate) {
              reject('Email or phone already exist');
              db.close();
            } else {
              const insertQuery = `
                INSERT INTO admin (name, email, phone, password, joining_date,isadmin)
                VALUES (?, ?, ?, ?, ?,?)
              `;
              db.query(insertQuery, [name, email, phone, hash, joining_date,isadmin], (err) => {
                if (err) {
                  reject(err.message);
                  db.close();
                } else {
                  const selectQuery = `
                    SELECT name, email, phone, joining_date
                    FROM admin
                    WHERE email=?
                  `;
                  db.query(selectQuery, [email], (err, rows) => {
                    if (err) {
                      reject(err.message);
                    } else {
                      const result = rows[0];
                      resolve(result);
                    }
                    db.close();
                  });
                }
              });
            }
          }
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}


function adminLogin(email, password) {
  return new Promise(async (resolve, reject) => {
    const db = await cdb();

    try {
      const row = await queryAsync(db, 'SELECT * FROM admin WHERE email = ?', [email]);

      if (!row) {
        db.end();
        return reject('Invalid email');
      }

      const isPasswordMatch = await comparePassword(password, row.password);

      if (!isPasswordMatch) {
        db.end();
        return reject('Password Not matched');
      }

      const tokenData = {
        id: row.id,
        name: row.name,
        email: row.email,
        joining_date: row.joining_date,
        isadmin: row.isadmin,
        admin:true
      };

      const token = await signTokenAsync(tokenData);

      db.end();
      resolve(token);
    } catch (error) {
      db.end();
      reject(error.message);
    }
  });
}
export function instituteLogin(email, password) {
  return new Promise(async (resolve, reject) => {
    const db = await cdb();
    try {
      const row = await queryAsync(db, 'SELECT * FROM institute WHERE email = ?', [email]);

      if (!row) {
        db.end();
        return reject('Invalid email');
      }

      const isPasswordMatch = await comparePassword(password, row.password);

      if (!isPasswordMatch) {
        db.end();
        return reject('Password Not matched');
      }

      const tokenData = {...row,password:"",logo:'',institute:true};

      const token = await signTokenAsync(tokenData);

      db.end();
      resolve(token);
    } catch (error) {
      db.end();
      reject(error.message);
    }
  });
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

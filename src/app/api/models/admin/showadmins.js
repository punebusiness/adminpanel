import cdb from "../../conn";
import {comparePassword,hashPassword} from "../../secure"
export function showAdmins(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    db.query('SHOW COLUMNS FROM admin', (err, columnsInfo) => {
      if (err) {
        reject(err.message);
        db.end();
        return;
      }

      const columnNames = columnsInfo
        .filter((column) => column.Field !== 'password')
        .map((column) => column.Field);

      const selectColumns = columnNames.join(', ');
      const query = `SELECT ${selectColumns} FROM admin WHERE id != ${id}`;

      db.query(query, (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
        db.end();
      });
    });
  });
}

export function deleteAdmin(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();

    let query = `DELETE FROM admin WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(`Admin Deleted Successfully! Affected rows: ${result.affectedRows}`);
      }
      db.end();
    });
  });
}

export function changePassword(prevPass, newPass, id) {
  return new Promise((resolve, reject) => {
    let db = cdb();

    const checkPasswordQuery = `SELECT * FROM admin WHERE id = ?`;
    db.query(checkPasswordQuery, [id], (err, rows) => {
      if (err) {
        reject(err.message);
      } else if (rows.length === 0) {
        reject("User not Found");
      } else {
        const row = rows[0];
        comparePassword(prevPass, row.password)
          .then((isMatch) => {
            if (!isMatch) {
              reject("Invalid previous password");
            } else {
              hashPassword(newPass)
                .then((hash) => {
                  let updateQuery = `UPDATE admin SET password = ? WHERE id = ?`;
                  db.query(updateQuery, [hash, id], (err) => {
                    if (err) {
                      reject("Something went wrong!");
                    } else {
                      resolve("Password Changed Successfully!");
                    }
                    db.end();
                  });
                })
                .catch((err) => {
                  reject(err.message);
                  db.end();
                });
            }
          })
          .catch((err) => {
            reject(err.message);
          });
      }
    });
  });
}
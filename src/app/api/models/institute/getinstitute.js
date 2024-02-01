import cdb from "../../conn";
import {hashPassword} from "../../secure"
export function showInstitute() {
  return new Promise((resolve, reject) => {
    const db = cdb();

    // Fetch table columns
    const tableName = 'institute';
    const columnsQuery = `SHOW COLUMNS FROM ${tableName}`;
    
    db.query(columnsQuery, (err, columns) => {
      if (err) {
        reject(err.message);
        db.end();
        return;
      }

      const columnNames = columns
        .filter(column => column.Field !== 'password')
        .map(column => column.Field);

      const selectColumns = columnNames.join(', ');
      const query = `SELECT ${selectColumns} FROM ${tableName}`;

      // Fetch data from the table
      db.query(query, [], (err, rows) => {
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
export function deleteInstitute(id) {
  return new Promise((resolve, reject) => {
    const db = cdb();

    // Construct delete query
    const deleteQuery = `DELETE FROM institute WHERE id = ?`;

    // Execute the delete query
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        reject(err.message);
        db.end();
      } else {
        if (result.affectedRows > 0) {
          resolve(`Institute with ID ${id} deleted successfully`);
        } else {
          reject(`No matching institute found with ID ${id}`);
        }
        db.end();
      }
    });
  });
}
export function updateInstitute(obj) {
  return new Promise((resolve, reject) => {
    const db = cdb();

    // Construct the update query
    const query = `UPDATE institute SET name=?, email=?, phone=?, address=?, tcnumber=?, logo=? WHERE id=?`;

    // Execute the update query with parameters
    db.query(
      query,
      [obj.name, obj.email, obj.phone, obj.address, obj.tcnumber, obj.logo, obj.id],
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          if (result.affectedRows > 0) {
            resolve('Institute updated successfully!');
          } else {
            reject(`No matching institute found with ID ${obj.id}`);
          }
        }
        db.end();
      }
    );
  });
}
export function updatePassword(id, pass) {
  return new Promise((resolve, reject) => {
    hashPassword(pass)
      .then((hash) => {
        const db = cdb();

        // Construct the update query
        const query = `UPDATE institute SET password=? WHERE id=?`;

        // Execute the update query with parameters
        db.query(query, [hash, id], (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            if (result.affectedRows > 0) {
              resolve('Password updated successfully!');
            } else {
              reject(`No matching institute found with ID ${id}`);
            }
          }
          db.end();
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
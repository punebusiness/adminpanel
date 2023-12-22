import cdb from "../../conn";
import {hashPassword} from "../../secure"
export function showInstitute() {
  return new Promise((resolve, reject) => {
    let db = cdb();
    db.serialize(() => {
      const tableName = 'institute';
      const columnsQuery = `PRAGMA table_info(${tableName})`;
      db.all(columnsQuery, [], (err, columns) => {
        if (err) {
          reject(err.message);
          db.close();
          return;
        }

        const columnNames = columns
          .filter(column => column.name !== 'password') 
          .map(column => column.name);
        const selectColumns = columnNames.join(', ');
        const query = `SELECT ${selectColumns} FROM ${tableName}`;
        db.all(query, [], (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
    db.close();
        });
      });
    });
  });
}

export function deleteInstitute(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    db.serialize(() => {
      const deleteQuery = `DELETE FROM institute WHERE id = ?`;
      db.run(deleteQuery, [id], function (err) {
        if (err) {
          reject(err.message);
        db.close();
        } else {
          if (this.changes > 0) {
            resolve(`Institute with ID ${id} deleted successfully`);
            db.close();
          } else {
            reject(`No matching institute found with ID ${id}`);
            db.close();
          }
        }
      });
    });
  });
}

export function updateInstitute(obj) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = `UPDATE institute SET name='${obj.name}', email='${obj.email}', phone='${obj.phone}', address='${obj.address}', tcnumber='${obj.tcnumber}', logo='${obj.logo}' WHERE id=${obj.id}`;
    
    db.run(query, (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve("Institute Update Successfully!");
      }
      db.close();
    });
  });
}

export function updatePassword(id, pass) {
  return new Promise((resolve, reject) => {
    hashPassword(pass).then(hash=>{
      let db = cdb();
      let query = `UPDATE institute SET password='${hash}' WHERE id=${id}`;
      
      db.run(query, (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve("Password Update Successfully!");
        }
        db.close();
      });
    }).catch(err=>{
      reject(err.message)
    })
  });
}
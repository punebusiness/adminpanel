import cdb from "../../conn";

export default function showAdmins(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();

    db.serialize(() => {
      db.all(
        "PRAGMA table_info(admin)",
        (err, columnsInfo) => {
          if (err) {
            reject(err.message);
            db.close();
            return;
          }

          const columnNames = columnsInfo
            .filter((column) => column.name !== "password")
            .map((column) => column.name);

          const selectColumns = columnNames.join(", ");
          const query = `SELECT ${selectColumns} FROM admin WHERE id !=${id}`;

          db.all(query, (err, rows) => {
            if (err) {
              reject(err.message);
            } else {
              resolve(rows);
            }
            db.close();
          });
        }
      );
    });
  });
}

export async function deleteAdmin(id){
  return new Promise((resolve,reject)=>{
    let db = cdb()
    db.serialize(()=>{
      let query = `DELETE FROM admin WHERE id = ${id}`;
      db.run(query,(err)=>{
        if(err){
          reject(err.message)
        }else{
          resolve("Admin Deleted Succesfully!")
        }
        db.close()
      })
    })
  })
}

export function changePassword(prevPass, newPass, id) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    db.serialize(() => {
      const checkPasswordQuery = `SELECT id FROM admin WHERE id = ? AND password = ?`;
      db.get(checkPasswordQuery, [id, prevPass], (err, row) => {
        if (err) {
          reject(err.message);
        } else if (!row) {
          reject("Incorrect previous password");
        } else {
          const updatePasswordQuery = `UPDATE admin SET password = ? WHERE id = ?`;
          db.run(updatePasswordQuery, [newPass, id], function (err) {
            if (err) {
              reject(err.message);
            } else {
              if (this.changes > 0) {
                resolve("Password updated successfully");
              } else {
                reject("No matching user found");
              }
            }
          });
        }
      });
    });

    db.close();
  });
}

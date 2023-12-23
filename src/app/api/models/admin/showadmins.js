import cdb from "../../conn";
import {comparePassword,hashPassword} from "../../secure"
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
      const checkPasswordQuery = `SELECT * FROM admin WHERE id = ?`;
      db.get(checkPasswordQuery, [id], (err, row) => {
        if (err) {
          reject(err.message);
          db.close()
        } else if (!row) {
          reject("User not Found");
          db.close()
        } else {
          comparePassword(prevPass,row.password).then(x=>{
              hashPassword(newPass).then(hash=>{
              let query = `UPDATE admin SET password = '${hash}' WHERE id=${id}`;
                db.run(query,(err)=>{
                  if(err){
                    reject("Something went wrong!:73")
                  }else{
                    resolve("Password Changed Succesfully!")
                  }
                  db.close()
                })
              }).catch(err=>{
                reject(err.message)
                db.close()
              })
          }).catch(err=>{
            db.close()
            reject(err.message)
          })
          
        }
      });
    });
  });
}

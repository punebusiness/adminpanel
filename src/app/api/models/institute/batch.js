import cdb from "../../conn";

export function addbatch(obj) {
    return new Promise((resolve, reject) => {
        let db = cdb();
        let createquery = `
            CREATE TABLE IF NOT EXISTS course (
                id INTEGER PRIMARY KEY,
                instituteName TEXT,
                batchSize TEXT,
                batchType TEXT,
                courseName TEXT,
                courseDuration TEXT,
                batchStart TEXT,
                batchEnd TEXT,
                batchNumber TEXT,
                batchFees TEXT,
                addedBy TEXT,
                createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        db.run(createquery, (err) => {
            if (err) {
                reject(err);
                db.close();
            } else {
                let addquery = `
                    INSERT INTO course 
                        (instituteName, batchSize, batchType, courseName, courseDuration, batchStart, batchEnd, batchNumber, batchFees, addedBy) 
                    VALUES 
                        (?, ?, ?,?, ?, ?, ?, ?, ?, ?)
                `;
                let values = [
                    obj.instituteName,
                    obj.batchSize,
                    obj.batchType,
                    obj.courseName,
                    obj.courseDuration,
                    obj.batchStart,
                    obj.batchEnd,
                    obj.batchNumber,
                    obj.batchFees,
                    obj.addedBy
                ];

                db.run(addquery, values, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("Batch added successfully");
                    }
                    db.close();
                });
            }
        });
    });
}


export function getallbatches() {
    return new Promise((resolve, reject) => {
        let db = cdb();
        let getquery = `
            SELECT * FROM course
        `;

        db.all(getquery, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            db.close();
        });
    });
}
export function deletebatch(id) {
    return new Promise((resolve, reject) => {
        let db = cdb();
        let getquery = `
            DELETE FROM course WHERE id ='${id}'
        `;

        db.run(getquery, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Data Deleted Succesfully!");
            }
            db.close();
        });
    });
}

export function updatebatch(updatedObj) {
    return new Promise((resolve, reject) => {
      let db = cdb();
  
      let updateQuery = `
          UPDATE course 
          SET 
              instituteName = ?,
              batchSize = ?,
              batchType = ?,
              courseName = ?,
              courseDuration = ?,
              batchStart = ?,
              batchEnd = ?,
              batchNumber = ?,
              batchFees = ?
          WHERE id = ?
      `;
  
      let values = [
        updatedObj.instituteName,
        updatedObj.batchSize,
        updatedObj.batchType,
        updatedObj.courseName,
        updatedObj.courseDuration,
        updatedObj.batchStart,
        updatedObj.batchEnd,
        updatedObj.batchNumber,
        updatedObj.batchFees,
        updatedObj.id, // Assuming id is present in the updatedObj
      ];
  
      db.run(updateQuery, values, (err) => {
        if (err) {
          reject(err);
          db.close();
        } else {
          resolve("Batch updated successfully");
          db.close();
        }
      });
    });
  }
  
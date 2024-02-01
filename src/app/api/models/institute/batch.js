import cdb from "../../conn";
export function addBatch(obj) {
    return new Promise((resolve, reject) => {
        const db = cdb();
        const createQuery = `
            CREATE TABLE IF NOT EXISTS course (
                id INT AUTO_INCREMENT PRIMARY KEY,
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
        
        db.query(createQuery, (err) => {
            if (err) {
                reject(err);
                db.end();
            } else {
                const addQuery = `
                    INSERT INTO course 
                        (instituteName, batchSize, batchType, courseName, courseDuration, batchStart, batchEnd, batchNumber, batchFees, addedBy) 
                    VALUES 
                        (?, ?, ?,?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
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

                db.query(addQuery, values, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("Batch added successfully");
                    }
                    db.end();
                });
            }
        });
    });
}

export function getAllBatches() {
    return new Promise((resolve, reject) => {
        const db = cdb();
        const getQuery = `
            SELECT * FROM course
        `;

        db.query(getQuery, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            db.end();
        });
    });
}

export function deleteBatch(id) {
    return new Promise((resolve, reject) => {
        const db = cdb();
        const deleteQuery = `
            DELETE FROM course WHERE id = ?
        `;

        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.affectedRows > 0) {
                    resolve("Data Deleted Successfully!");
                } else {
                    reject(`No matching batch found with ID ${id}`);
                }
            }
            db.end();
        });
    });
}

export function updateBatch(updatedObj) {
    return new Promise((resolve, reject) => {
        const db = cdb();
        const updateQuery = `
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
        const values = [
            updatedObj.instituteName,
            updatedObj.batchSize,
            updatedObj.batchType,
            updatedObj.courseName,
            updatedObj.courseDuration,
            updatedObj.batchStart,
            updatedObj.batchEnd,
            updatedObj.batchNumber,
            updatedObj.batchFees,
            updatedObj.id
        ];

        db.query(updateQuery, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.affectedRows > 0) {
                    resolve("Batch updated successfully");
                } else {
                    reject(`No matching batch found with ID ${updatedObj.id}`);
                }
            }
            db.end();
        });
    });
}

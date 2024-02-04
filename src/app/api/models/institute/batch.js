import cdb from "../../conn";
export async function addBatch(obj) {
    try {
        const db = await cdb();

        // Create the course table if not exists
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

        await db.query(createQuery);

        // Insert data into the course table
        const addQuery = `
            INSERT INTO course 
                (instituteName, batchSize, batchType, courseName, courseDuration, batchStart, batchEnd, batchNumber, batchFees, addedBy) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

        await db.query(addQuery, values);

        // Close the database connection
        db.end();

        return "Batch added successfully";
    } catch (error) {
        console.log("Error in addBatch:", error.message);
        throw error;
    }
}

export async function getAllBatches() {
    try {
        const db = await cdb();

        // Select all batches from the course table
        const getQuery = 'SELECT * FROM course';
        const [rows] = await db.query(getQuery);

        // Close the database connection
        db.end();

        return rows;
    } catch (error) {
        console.log("Error in getAllBatches:", error.message);
        throw error;
    }
}

export async function deleteBatch(id) {
    try {
        const db = await cdb();

        // Construct delete query
        const deleteQuery = 'DELETE FROM course WHERE id = ?';

        // Execute the delete query with parameters
        const [result] = await db.query(deleteQuery, [id]);

        // Close the database connection
        db.end();

        // Check the affected rows and resolve/reject accordingly
        if (result.affectedRows > 0) {
            return "Data Deleted Successfully!";
        } else {
            throw new Error(`No matching batch found with ID ${id}`);
        }
    } catch (error) {
        console.log("Error in deleteBatch:", error.message);
        throw error;
    }
}

export async function updateBatch(updatedObj) {
    try {
        const db = await cdb();

        // Construct the update query
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

        // Define the parameter values
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

        // Execute the update query with parameters
        const [result] = await db.query(updateQuery, values);

        // Close the database connection
        db.end();

        // Check the affected rows and resolve/reject accordingly
        if (result.affectedRows > 0) {
            return "Batch updated successfully";
        } else {
            throw new Error(`No matching batch found with ID ${updatedObj.id}`);
        }
    } catch (error) {
        console.log("Error in updateBatch:", error.message);
        throw error;
    }
}
import cdb from "../../conn";
import {hashPassword} from "../../secure"
export async function showInstitute() {
  try {
      const db = await cdb();

      // Fetch table columns
      const tableName = 'institute';
      const columnsQuery = `SHOW COLUMNS FROM ${tableName}`;

      const [columns] = await db.query(columnsQuery);

      const columnNames = columns
          .filter(column => column.Field !== 'password')
          .map(column => column.Field);

      const selectColumns = columnNames.join(', ');
      const query = `SELECT ${selectColumns} FROM ${tableName}`;

      // Fetch data from the table
      const [rows] = await db.query(query);

      // Close the database connection
      db.end();

      return rows;
  } catch (error) {
      console.log("Error in showInstitute:", error.message);
      throw error;
  }
}
export async function deleteInstitute(id) {
    try {
        const db = await cdb();

        // Construct delete query
        const deleteQuery = 'DELETE FROM institute WHERE id = ?';

        // Execute the delete query
        const [result] = await db.query(deleteQuery, [id]);

        // Close the database connection
        db.end();

        // Check the affected rows and resolve/reject accordingly
        if (result.affectedRows > 0) {
            return `Institute with ID ${id} deleted successfully`;
        } else {
            throw new Error(`No matching institute found with ID ${id}`);
        }
    } catch (error) {
        console.log("Error in deleteInstitute:", error.message);
        throw error;
    }
}
export async function updateInstitute(obj) {
  try {
      const db = await cdb();

      // Construct the update query
      const query = 'UPDATE institute SET name=?, email=?, phone=?, address=?, tcnumber=?, logo=? WHERE id=?';

      // Execute the update query with parameters
      const [result] = await db.query(query, [
          obj.name,
          obj.email,
          obj.phone,
          obj.address,
          obj.tcnumber,
          obj.logo,
          obj.id
      ]);

      // Close the database connection
      db.end();

      // Check the affected rows and resolve/reject accordingly
      if (result.affectedRows > 0) {
          return 'Institute updated successfully!';
      } else {
          throw new Error(`No matching institute found with ID ${obj.id}`);
      }
  } catch (error) {
      console.log("Error in updateInstitute:", error.message);
      throw error;
  }
}
export async function updatePassword(id, pass) {
  try {
      const db = await cdb();

      // Hash the new password
      const hash = await hashPassword(pass);

      // Construct the update query
      const query = 'UPDATE institute SET password=? WHERE id=?';

      // Execute the update query with parameters
      const [result] = await db.query(query, [hash, id]);

      // Close the database connection
      db.end();

      // Check the affected rows and resolve/reject accordingly
      if (result.affectedRows > 0) {
          return 'Password updated successfully!';
      } else {
          throw new Error(`No matching institute found with ID ${id}`);
      }
  } catch (error) {
      console.log("Error in updatePassword:", error.message);
      throw error;
  }
}
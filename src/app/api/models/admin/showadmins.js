import cdb from "../../conn";
import {comparePassword,hashPassword} from "../../secure"
export async function showAdmins(id) {
  try {
      const db = await cdb();

      // Get column information from the 'admin' table
      const [columnsInfo] = await db.query('SHOW COLUMNS FROM admin');

      // Extract column names excluding 'password'
      const columnNames = columnsInfo
          .filter((column) => column.Field !== 'password')
          .map((column) => column.Field);

      // Generate SELECT columns string
      const selectColumns = columnNames.join(', ');

      // Construct the query to select all columns from 'admin' excluding the user with the specified ID
      const query = `SELECT ${selectColumns} FROM admin WHERE id != ?`;

      // Execute the query with the provided ID
      const [rows] = await db.query(query, [id]);

      // Close the database connection
      db.end();

      return rows;
  } catch (error) {
      console.log("Error in showAdmins:", error.message);
      throw error;
  }
}

export async function deleteAdmin(id) {
  try {
      const db = await cdb();

      // Construct the DELETE query with a parameterized query for better security
      const query = 'DELETE FROM admin WHERE id = ?';

      // Execute the query with the provided ID
      const [result] = await db.query(query, [id]);

      // Close the database connection
      db.end();

      // Check if any rows were affected
      if (result.affectedRows > 0) {
          return `Admin Deleted Successfully! Affected rows: ${result.affectedRows}`;
      } else {
          throw new Error(`Admin with ID ${id} not found`);
      }
  } catch (error) {
      console.log("Error in deleteAdmin:", error.message);
      throw error;
  }
}

export async function changePassword(prevPass, newPass, id) {
  try {
      const db = await cdb();

      // Check if the user with the specified ID exists
      const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);

      // Check if the result is not empty
      if (rows.length === 0) {
          db.end();
          throw new Error('User not found');
      }

      // Extract user information
      const row = rows[0];

      // Compare the provided previous password with the stored password
      const isMatch = await comparePassword(prevPass, row.password);

      // Check if the previous password is valid
      if (!isMatch) {
          db.end();
          throw new Error('Invalid previous password');
      }

      // Hash the new password
      const hash = await hashPassword(newPass);

      // Update the user's password
      const [updateResult] = await db.query('UPDATE admin SET password = ? WHERE id = ?', [hash, id]);

      // Check if the update was successful
      if (updateResult.affectedRows === 0) {
          db.end();
          throw new Error('Something went wrong!');
      }

      // Close the database connection
      db.end();

      return 'Password Changed Successfully!';
  } catch (error) {
      console.log("Error in changePassword:", error.message);
      throw error;
  }
}
import cdb from "../../api/conn"
export async function saveStudentData(studentData) {
  try {
      const db = await cdb();

      // Create the students table if not exists
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS students (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255),
              email VARCHAR(255) UNIQUE,
              contactNumber VARCHAR(15),
              fatherName VARCHAR(255),
              motherName VARCHAR(255),
              district VARCHAR(255),
              taluka VARCHAR(255),
              state VARCHAR(255),
              aadhar VARCHAR(12),
              pincode VARCHAR(10),
              postOffice VARCHAR(255),
              address TEXT,
              courseName VARCHAR(255),
              courseDuration VARCHAR(255),
              selectInstitute VARCHAR(255),
              selectBatch VARCHAR(255),
              documents TEXT,
              passphoto TEXT,
              payId VARCHAR(255),
              paymentProff TEXT,
              approved VARCHAR(10),
              created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              password VARCHAR(255),
              verified VARCHAR(10)
          )
      `;

      await db.query(createTableQuery);

      const {
          name, email, contactNumber, fatherName, motherName,
          district, taluka, state, courseName, courseDuration,
          selectInstitute, selectBatch, documents, passphoto,
          payId, paymentProff, approved, created_on, password, verified, aadhar, pincode, postOffice, address
      } = studentData;

      // Insert data into the students table
      const insertQuery = `
          INSERT INTO students (
              name, email, contactNumber, fatherName, motherName,
              district, taluka, state, aadhar, pincode, postOffice, address,
              courseName, courseDuration, selectInstitute, selectBatch,
              documents, passphoto, payId, paymentProff, approved, created_on, password, verified
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
          name, email, contactNumber, fatherName, motherName,
          district, taluka, state, aadhar, pincode, postOffice, address,
          courseName, courseDuration, selectInstitute, selectBatch,
          documents, passphoto, payId, paymentProff, approved, created_on, password, verified
      ];

      // Execute the insert query with parameters
      await db.query(insertQuery, values);

      // Close the database connection
      db.end();

      return 'Student data saved successfully';
  } catch (error) {
      console.log("Error in saveStudentData:", error.message);
      throw error;
  }
}
export async function isExistTable() {
  try {
      const db = await cdb();

      // Construct the query to check if the table 'students' exists
      const query = "SHOW TABLES LIKE 'students'";

      // Execute the query
      const [results] = await db.query(query);

      // Check if the table exists
      const tableExists = results.length > 0;

      // Close the database connection
      db.end();

      return tableExists;
  } catch (error) {
      console.log("Error in isExistTable:", error.message);
      throw error;
  }
}
export async function doesEmailExist(email) {
  try {
      const db = await cdb();

      // Construct the query to check if the email exists in the 'students' table
      const query = "SELECT * FROM students WHERE email = ?";

      // Execute the query with the email parameter
      const [results] = await db.query(query, [email]);

      // Check if the email exists
      const emailExists = results.length > 0;

      // Close the database connection
      db.end();

      return emailExists;
  } catch (error) {
      console.log("Error in doesEmailExist:", error.message);
      throw error;
  }
}
export async function checkEmail(email) {
  try {
      // Check if the 'students' table exists
      const tableExists = await isExistTable();

      if (tableExists) {
          // If the table exists, check if the email exists
          const emailExists = await doesEmailExist(email);
          return emailExists;
      } else {
          return false; // Assuming email doesn't exist when the table doesn't exist
      }
  } catch (error) {
      console.log("Error in checkEmail:", error.message);
      throw error;
  }
}
export async function getStudentsAfterId(startingId, ins = false) {
  try {
      const db = await cdb();
      let query;

      if (ins) {
          query = "SELECT * FROM students WHERE LOWER(selectInstitute) = LOWER(?) AND id > ? LIMIT 10";
      } else {
          query = "SELECT * FROM students WHERE id > ? LIMIT 10";
      }

      const [results] = await db.query(query, ins ? [ins, startingId] : [startingId]);

      const hasMore = results.length === 10;
      const response = {
          data: results,
          hasMore: hasMore,
      };

      return response;
  } catch (error) {
      console.log("Error in getStudentsAfterId:", error.message);
      throw error;
  }
}

export async function approveStudent(id) {
  try {
      const db = await cdb();
      const query = "UPDATE students SET approved = ? WHERE id = ?";
      
      await db.query(query, [true, id]);

      return "Student approved successfully";
  } catch (error) {
      console.error("Error in approveStudent:", error.message);
      throw new Error("Error approving student");
  }
}
export async function deleteStudent(id) {
  try {
      const db = await cdb();
      const query = "DELETE FROM students WHERE id = ?";

      await db.query(query, [id]);

      return "Student deleted successfully";
  } catch (error) {
      console.error("Error in deleteStudent:", error.message);
      throw new Error("Error deleting student");
  }
}
export async function updateStudent(studentData) {
  try {
      const db = await cdb();
      const { id, aadhar, address, contactNumber, district, email, fatherName, motherName, name, pincode, postOffice, state, taluka } = studentData;
      const query = `
          UPDATE students
          SET aadhar = ?, address = ?, contactNumber = ?, district = ?, email = ?, 
              fatherName = ?, motherName = ?, name = ?, pincode = ?, postOffice = ?, 
              state = ?, taluka = ?
          WHERE id = ?
      `;

      await db.query(
          query,
          [aadhar, address, contactNumber, district, email, fatherName, motherName, name, pincode, postOffice, state, taluka, id]
      );

      return 'Student data updated successfully';
  } catch (error) {
      console.error('Error in updateStudent:', error.message);
      throw new Error('Error updating student data');
  }
}

export async function getStudentByAadhar(aadhar) {
  try {
      const db = await cdb();
      const query = "SELECT name, fatherName, id, courseName, courseDuration, passphoto FROM students WHERE aadhar = ?";
      const [results] = await db.query(query, [aadhar]);

      if (results.length === 0) {
          throw new Error('No student found with the provided Aadhar number');
      }

      const result = results[0];
      return result;
  } catch (error) {
      console.error('Error in getStudentByAadhar:', error.message);
      throw new Error('Error getting student by Aadhar');
  }
}
import cdb from "../../api/conn"
export function saveStudentData(studentData) {
  return new Promise((resolve, reject) => {
    let db = cdb();

    db.query(`
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
    `, (err) => {
      if (err) {
        reject(err.message);
        db.end();
      } else {
        const {
          name, email, contactNumber, fatherName, motherName,
          district, taluka, state, courseName, courseDuration,
          selectInstitute, selectBatch, documents, passphoto,
          payId, paymentProff, approved, created_on, password, verified, aadhar, pincode, postOffice, address
        } = studentData;

        const insertQuery = `
          INSERT INTO students (
            name, email, contactNumber, fatherName, motherName,
            district, taluka, state, courseName, courseDuration,
            selectInstitute, selectBatch, documents, passphoto,
            payId, paymentProff, approved, created_on, password, verified, aadhar, pincode, postOffice, address
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          name, email, contactNumber, fatherName, motherName,
          district, taluka, state, courseName, courseDuration,
          selectInstitute, selectBatch, documents, passphoto,
          payId, paymentProff, approved, created_on, password, verified, aadhar, pincode, postOffice, address
        ];

        db.query(insertQuery, values, (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve('Student data saved successfully');
          }
          db.end();
        });
      }
    });
  });
}
function isExistTable() {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = "SHOW TABLES LIKE 'students'";
    
    db.query(query, (error, results) => {
      if (error) {
        reject(false);
      } else {
        const tableExists = results.length > 0;
        resolve(tableExists);
      }
      db.end();
    });
  });
}

function doesEmailExist(email) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = "SELECT * FROM students WHERE email = ?";
    
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error(error);
        resolve(false);
      } else {
        const emailExists = results.length > 0;
        resolve(emailExists);
      }
      db.end();
    });
  });
}

export function checkEmail(email) {
  return new Promise((resolve, reject) => {
    isExistTable()
      .then((tableExists) => {
        if (tableExists) {
          doesEmailExist(email)
            .then((emailExists) => {
              resolve(emailExists);
            })
            .catch((error) => {
              resolve(error);
            });
        } else {
          resolve(false); // Assuming email doesn't exist when the table doesn't exist
        }
      })
      .catch((error) => {
        resolve(error);
      });
  });
}
export function getStudentsAfterId(startingId,ins=false) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query; 
    if (ins) {
      query = "SELECT * FROM students WHERE LOWER(selectInstitute) = LOWER(?) AND id > ? LIMIT 10";
    } else {
      query = "SELECT * FROM students WHERE id > ? LIMIT 10";
    }
    
    
    db.query(query, ins?[ins,startingId]:[startingId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const hasMore = results.length === 10;
        const response = {
          data: results,
          hasMore: hasMore,
        };

        resolve(response);
      }
      db.end();
    });
  });
}

export function approveStudent(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = "UPDATE students SET approved = ? WHERE id = ?";
    
    db.query(query, [true, id], (error) => {
      if (error) {
        console.error(error);
        reject("Error approving student");
      } else {
        resolve("Student approved successfully");
      }
      db.end();
    });
  });
}
export function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = "DELETE FROM students WHERE id = ?";
  
    db.query(query, [id], (error) => {
      if (error) {
        console.error(error);
        reject("Error deleting student");
      } else {
        resolve("Student deleted successfully");
      }
      db.end();
    });
  });
}

export function updateStudent(studentData) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    const { id, aadhar, address, contactNumber, district, email, fatherName, motherName, name, pincode, postOffice, state, taluka } = studentData;
    const query = `
      UPDATE students
      SET aadhar = ?, address = ?, contactNumber = ?, district = ?, email = ?, 
          fatherName = ?, motherName = ?, name = ?, pincode = ?, postOffice = ?, 
          state = ?, taluka = ?
      WHERE id = ?
    `;

    db.query(
      query,
      [aadhar, address, contactNumber, district, email, fatherName, motherName, name, pincode, postOffice, state, taluka, id],
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve('Student data updated successfully');
        }
        db.end();
      }
    );
  });
}

export function getStudentByAadhar(aadhar) {
  return new Promise((resolve, reject) => {
    let db = cdb();
    let query = "SELECT name, fatherName, id, courseName, courseDuration, passphoto FROM students WHERE aadhar = ?";
    db.query(query, [aadhar], (err, results) => {
      if (err) {
        reject(err.message);
      } else {
        const result = results[0]; // Assuming you only expect one result
        resolve(result);
      }
      db.end();
    });
  });
}
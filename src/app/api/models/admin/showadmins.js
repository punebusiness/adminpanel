import cdb from "../../conn";

export default function showAdmins() {
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
          const query = `SELECT ${selectColumns} FROM admin`;

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

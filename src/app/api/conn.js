import mysql from "mysql2/promise";

export default async function cdb() {
    try {
        const con = await mysql.createConnection({
            host: "103.143.46.252",
            user: "jnps23_admin",
            password: "Deepak@3370",
            database: "jnps23_admin",
            port:2082,
        });

        console.log("Database connected!");
        return con;
    } catch (err) {
        console.log("Error connecting to the database");
        throw err;
    }
}

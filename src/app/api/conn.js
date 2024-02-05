import mysql from "mysql2/promise";

export default async function cdb() {
    try {
        const con = await mysql.createConnection({
            host: "103.143.46.252",
            user: "jnps23_ndb",
            password: "}cB~+5mKV@vviHF",
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

import mysql from "mysql2/promise";

export default async function cdb() {
    try {
        const con = await mysql.createConnection({
            host: "monorail.proxy.rlwy.net",
            user: "root",
            password: "FhEc2h5A4Ce-cbc5ag15dG44behDfF-b",
            database: "railway",
            port: 55609,
        });

        console.log("Database connected!");
        return con;
    } catch (err) {
        console.log("Error connecting to the database");
        throw err;
    }
}

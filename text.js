const mysql = require("mysql");

function cdb() {
    try {
        // Parse the connection URL
        const url = new URL("mysql://root:FhEc2h5A4Ce-cbc5ag15dG44behDfF-b@monorail.proxy.rlwy.net:3306/railway");

        // Extract connection options from the URL
        const connectionOptions = {
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.substring(1), // Remove the leading "/"
            port: url.port
        };

        // Create the connection
        let con = mysql.createConnection(connectionOptions);

        con.connect(err => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log("Database connected!");
        });

        return con;
    } catch (err) {
        console.error(err.message);
        console.error("Error establishing database connection");
    }
}

// It's a good practice to handle the returned connection object appropriately,
// such as using it to execute queries or closing the connection when done.
const connection = cdb();

// Example: Execute a query
// connection.query("SELECT * FROM your_table", (err, results) => {
//     if (err) {
//         console.error(err.message);
//         return;
//     }
//     console.log(results);
// });

// Example: Close the connection when done
// connection.end();

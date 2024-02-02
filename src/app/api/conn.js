import mysql from "mysql";

export default function cdb() {
    try{
      let con = mysql.createConnection({
        host: "sql6.freemysqlhosting.net",
        user: "sql6681601",
        password: "8LYCtbwrMw",
        database: "sql6681601",
        port:'3306'
    });

    con.connect(err => {
        if (err) {
            console.log(err);
        }
        console.log("database connected!");
    });

    return con;
    }catch(err){
console.log("error db connection");
    }
}

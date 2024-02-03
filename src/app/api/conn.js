import mysql from "mysql";

export default function cdb() {
    try{
      let con = mysql.createConnection({
        host: "monorail.proxy.rlwy.net",
        user: "root",
        password: "FhEc2h5A4Ce-cbc5ag15dG44behDfF-b",
        database: "railway",
        port:55609
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
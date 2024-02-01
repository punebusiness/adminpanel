import mysql from "mysql"
export default function cdb(){
    let con = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'pune-panel'
    })
    con.connect(err=>{
      if(err){
        console.log(err);
      }
      console.log("database connected!")
    })

    return con;
}
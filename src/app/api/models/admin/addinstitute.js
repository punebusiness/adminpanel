import cdb from "../../conn"
export function addInstitute(obj){
return new Promise((resolve,reject)=>{
    let db = cdb()
    db.run(
        `CREATE TABLE IF NOT EXISTS institute(
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            address TEXT,
            logo TEXT,
            tcnumber TEXT,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
    db.run(
        `INSERT INTO institute (name,email,phone,address,logo,tcnumber,password,created_at) VALUES(?,?,?,?,?,?,?,?)`,
        [
            obj.name,
            obj.email,
            obj.phone,
            obj.address,
            obj.logo,
            obj.tcnumber,
            obj.password,
            obj.created_at
        ],
        (err)=>{
            if(err){
                reject(err.message)
            }else{
                resolve("Institute Saved succesfully!")
            }
        }
    )
})
}
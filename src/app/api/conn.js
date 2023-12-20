import sqlite3 from 'sqlite3';
import path from "path"
export default function cdb(){
    let pth = path.resolve(process.cwd(),'a.sqlite')
    let db = new sqlite3.Database(pth);
    return db;
  }
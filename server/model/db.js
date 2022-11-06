import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(`./blog.db`, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("Connection Successful!!");
});

db.run(`CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT UNIQUE, password TEXT UNIQUE, img TEXT)`);
//db.run(`SELECT * FROM users`);
db.run(`CREATE TABLE posts(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT, img TEXT, date DATETIME, uid INTEGER, cat TEXT, FOREIGN KEY (uid) REFERENCES users(id))`);


db.close((err) => {
    if (err)
        return console.error(err.message);
});
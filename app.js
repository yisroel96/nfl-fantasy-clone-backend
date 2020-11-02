const express = require("express");
const userRoute = require("./app/routes/userRoute");
const teamRoute = require("./app/routes/teamRoute");
const playerRoute = require("./app/routes/playerRoute");
const gameRoute = require("./app/routes/gameRoute");
const sqlite3 = require('sqlite3').verbose();

const app = express();

// create a new database file users.db or open existing users.db
const db = new sqlite3.Database('./nfl-fantasy-clone.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the nfl-fantasy-clone.db database.');
});

// db.serialize let us run sqlite operations in serial order
db.serialize(() => {
    // 1rst operation (run create table statement)
    db.run('CREATE TABLE IF NOT EXISTS users(email text, password text)', (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});


// Always close the connection with database
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});

app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);
app.use("/api/player", playerRoute);
app.use("/api/game", gameRoute);

app.use("/", (req, res) => res.send("<h1>Heyyy</h1>"));
app.listen(3000, () => console.log("server running... good"));

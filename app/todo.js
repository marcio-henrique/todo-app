const db = require("../db/db.config");

//Create new tasks
exports.create = (req, res) => {
    db.run("INSERT INTO tasks (title, date) VALUES (?, ?)",
        [req.body.title, req.body.date], function (err) {
            if(err){
                console.log(err.message);
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
                });
            } else {
                let response = {};
                response['id'] = this.lastID;
                console.log(response);
                res.send(response);
            }
    });
};

//get all tasks
exports.getAll = (req, res) => {
    db.all("SELECT * FROM tasks",
        (err, rows) => {
            if(err){
                console.log(err.message);
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
                });
            } else {
                res.send(rows);
            }
    });
};
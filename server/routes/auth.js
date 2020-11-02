const express = require('express')
const router = express.Router()

const mysqlConnection = require("../models/db.js");

router.post('/login', (req, res) => {
    // let user = req.body;

    let data = req.body;
    console.log(data)
    let sql = "SELECT password, forces from project where id = ?";
    // mysqlConnection.query(sql,[user.fullname,user.forces,user.username,user.password],(err)=>{
    mysqlConnection.query(sql, [data.id], (err, result) => {
        if (!err) {
            if (result.length > 0) {
                if (data.password === result[0].password) {
                    res.json({
                        status: true,
                        message: "Successfully Authenticated",
                        forces : result[0].forces
                    });
                }
                else {
                    res.json({
                        status: false,
                        message: "Email and password don't match"
                    });
                }
            }
            else{
                res.json({
                    status: false,
                    message:"Email not found"
                });
            }
        }
        else {
           res.json({
               status:false,
               message: 'authentication failed'
           });
        }
    });

});

router.post('/register', (req, res) => {
    let data = req.body;
    console.log(data);

    let sql = "Insert into project  set ?";

    mysqlConnection.query(sql, data, (err, result) => {
        if (!err) {
            res.json({
                message: "Successfull"
            });
            console.log('Inserted succesfully');
            
        }
        else {
            res.json({
                message: "Not Successfull"
            });
            console.log('Error:' + JSON.stringify(err, undefined, 2));
        }
    });

    //res.end();

})

router.get('/:id', (req, res)=> {
    let id = req.params.id;
    console.log(id)
    const sqlQuery = "SELECT forces FROM project where id = ?"
    mysqlConnection.query(sqlQuery, [id], (err, result) => {

        if(!err)
        {
            if (result.length > 0) {
                res.json({
                    codeforces: result[0].forces
                })
            }
        }

    })
})

module.exports = router
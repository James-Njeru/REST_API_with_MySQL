const { genSaltSync, hashSync, compareSync } = require("bcrypt");//for pwd encryption
const { create, getUserByUserId,
    getUsers, updateUser, 
    deleteUser, getUserByEmail } = require("./userservice");
//create json web token(JWT)
const {sign} = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        //encrypt password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        //call create service
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
    login: (req, res)=>{
        const body = req.body;
        getUserByEmail(body.email, (err, results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                //set pwd to undefined
                //so that its not sent to the token
                results.password = undefined;
                const jsontoken = sign({result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successful",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "invalid email or password"
                });
            }
        });
    }
}
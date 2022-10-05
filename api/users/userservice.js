const pool = require("../../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO customers(name,email,password) VALUES(?,?,?)',
            [
                data.name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            'SELECT id,name,email FROM customers',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            'SELECT id,name,email FROM customers WHERE id=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            'UPDATE customers SET name=?, email=?, password=? WHERE id=?',
            [
                data.name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'DELETE FROM customers WHERE id=?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    //login
    getUserByEmail: (email, callBack) => {
        pool.query(
            'SELECT * FROM customers WHERE email=?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};
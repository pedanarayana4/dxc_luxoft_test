/*
 * API to authenticate user
 */
let poolConn = require(__base).pool;

module.exports = function (req, res) {
    (async function () {
        try {
            if (!req.body) {

                res.send({"status": 412, error: "request must have body"});
                return;
            }
            if (!req.body.email) {

                res.send({"status": 412, error: "request body must have email"});
                return;
            }
            if (!req.body.password) {

                res.send({"status": 412, error: "request body must have password"});
                return;
            }
            conn = await poolConn.getConnection();
            let query = "SELECT * from users where email = '" + req.body.email + "' and password = '" + req.body.password + "'";

            let user = await conn.query(query);

            conn.end;
            if (user && user[0]) {
                res.send({status: 200, user: user})

            } else {
                res.send({status: 204, usersList: "Users not found with provided email and password "})

            }


        } catch (E) {
            console.log("Exception in getting user by id ", E)
            res.send({status: 500, error: "The server has encountered a situation it doesn't know how to handle, We will fix soon"})
        }
    })();
};
 
/*
 * API to get sser details by user id
 */
let poolConn = require(__base).pool;

module.exports = function (req, res) {
    (async function () {
        try {
            if (!req.query.id) {

                res.send({"status": 412, error: "request must have id"});
                return;
            }
            conn = await poolConn.getConnection();
            let user = await conn.query("SELECT * from users where id = " + req.query.id);
            conn.end;
            if (user) {
                res.send({status: 200, user: user})

            } else {
                res.send({status: 204, usersList: "Users not found with id : " + req.query.id})

            }


        } catch (E) {
            console.log("Exception in getting user by id ", E)
            res.send({status: 500, error: "The server has encountered a situation it doesn't know how to handle, We will fix soon"})
        }
    })();
};
 
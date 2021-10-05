/*
 * API to get all the users list 
 */
let changeTesting;
let thischangeonlyForMain;
let changeswithmainandchangedforBranch
let poolConn = require(__base).pool;
//var _ = require("underscore")
module.exports = function (req, res) {
    (async function () {
        try {
            conn = await poolConn.getConnection();
            let usersList = await conn.query("SELECT * from users;");
            conn.end();

            //            console.log("usersList ", usersList)
            if (usersList && usersList.length > 0) {
                /*
                 * with underscore js functions
                 */
                //                usersList = _.sortBy(usersList, "name")
                /*
                 * with own functions
                 */
                let sortedData = usersList.sort(function (a, b) {
                    return compareStrings(a.name, b.name);
                })
                res.send({ status: 200, usersList: sortedData })

            } else {
                res.send({ status: 204, usersList: "Users Not Found" })

            }

        } catch (E) {
            console.log("exception in getting users list ", E)

            res.send({ status: 500, error: "The server has encountered a situation it doesn't know how to handle, We will fix soon" })
        }
    })();
    function compareStrings(a, b) {
        // Assuming you want case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
};

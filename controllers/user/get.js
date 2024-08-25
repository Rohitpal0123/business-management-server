const Users = require("../../models/users.models");

class getUsers {
    async process(req, res) {
        try {
            const users = await Users.findAll();
            console.log("🚀 ~ users:", users)
            res.status(200).json(users);
        } catch (error) {
            console.log("🚀 ~ error:", error)
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new getUsers()
//test

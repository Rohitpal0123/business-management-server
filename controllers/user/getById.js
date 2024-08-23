const Users = require("../../models/users.models");

class getUserById {
    async process(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ where: { id: id } });
            console.log("🚀 ~ user:", user)
            res.status(200).json(user);
        } catch (error) {
            console.log("🚀 ~ error:", error)
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new getUserById();
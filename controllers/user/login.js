const Users = require("../../models/users.models");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

class Login {
  async userExists(email) {
    const userExists = await Users.findOne({ email: email });
    if (userExists == null) throw "User doesn't exists !";
    return userExists;
  }
  process = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await this.userExists(email);
      console.log("🚀 ~ user:", user);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invalid password !";

      const token = generateToken(user._id);

      res.status(200).send({
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          token: token,
        },
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send(error);
    }
  };
}

module.exports = new Login();

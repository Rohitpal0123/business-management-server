const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken.js");
const Users = require("../../models/users.models");

class SignUp {
  async userNameExists(userName) {
    const userNameExists = await Users.findOne({ userName: userName });
    if (userNameExists != null) throw new Error("Username already exists !");
  }
  async emailExists(email) {
    const emailExists = await Users.findOne({ email: email });
    if (emailExists != null) throw new Error("Email is already used !");
  }
  process = async (req, res) => {
    try {
      const { firstName, lastName, userName, email, password } = req.body;
      console.log("🚀 ~ req.body:", req.body);

      await this.emailExists(email);
      await this.userNameExists(userName);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Users.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword,
      });
      console.log("🚀 ~ newUser:", newUser)

      if (!newUser) throw "User not signed up !";

      const token = generateToken(newUser._id);
      console.log("🚀 ~ token:", token);

      console.log(token);
      res.status(200).send({
        data: {
          _id: newUser._id,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: newUser.email,
          token: token,
        },
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send(error);
    }
  };
}

module.exports = new SignUp();

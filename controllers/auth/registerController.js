const Joi = require("joi");

const bcrypt = require("bcryptjs");

const CustomErrorHandler = require("../../services/CustomErrorHandler");

const { User } = require("../../models/user");

const JwtService = require("../../services/JwtService");

//Register controller
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  //Check if email already taken or not
  try {
    const exists = await User.exists({ email: email });

    if (exists) {
      return next(
        CustomErrorHandler.alreadyExists("This email is already taken.")
      );
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  let access_token;
  try {
    const result = await user.save();
    // Generate Token
    access_token = JwtService.sign({
      _id: result._id,
      role: result.role,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: access_token,
    });
  } catch (error) {
    // console.log(error);
    return next(error);
  }
};

module.exports = { registerController };

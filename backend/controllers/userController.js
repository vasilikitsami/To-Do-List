import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Login User" });
};

//signup user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Signup User" });
};

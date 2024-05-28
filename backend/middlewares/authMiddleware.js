import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log("RequireSignIn Error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const user = await userModel.findById(req.user._id);
    console.log("User:", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.log("isAdmin Error:", error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};

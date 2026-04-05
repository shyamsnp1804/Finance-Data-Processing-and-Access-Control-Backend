const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateTokens");
const redis = require("../config/redis");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullname,
      username,
      email,
      password,
    });

    const accessToken = await generateTokens(res, user);

    res.status(201).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = await generateTokens(res, user);

    res.json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// REFRESH ACCESS TOKEN (IMPORTANT FIX)
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate NEW access token WITH jti
    const { v4: uuidv4 } = require("uuid");

    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        jti: uuidv4(),
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token expired" });
  }
};

// GET CURRENT USER
const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT (REDIS BLACKLIST ADDED)
const logoutUser = async (req, res) => {
  try {
    // 1️⃣ Blacklist ACCESS TOKEN
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.decode(token);

      if (decoded?.jti && decoded?.exp) {
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);

        if (ttl > 0) {
          await redis.set(
            `bl:${decoded.jti}`,
            "true",
            "EX",
            ttl // auto remove after token expiry
          );
        }
      }
    }

    // Remove refresh token from DB
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
      );
    }

    //  Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  me,
};
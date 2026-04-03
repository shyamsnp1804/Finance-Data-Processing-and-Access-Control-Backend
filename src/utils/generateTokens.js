const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateTokens = async (res, user) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      jti: uuidv4(),
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

module.exports = generateTokens;
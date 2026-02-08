const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { users } = require("../data/users");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { employeeCode, password } = req.body || {};

    if (!employeeCode || !password) {
      console.log("Login failed: missing credentials");
      return res
        .status(400)
        .json({ success: false, message: "Thiếu mã nhân viên hoặc mật khẩu" });
    }

    const user = users.find((u) => u.employeeCode === employeeCode);
    if (!user) {
      console.log(`Login failed: user not found (${employeeCode})`);
      return res.status(401).json({
        success: false,
        message: "Mã nhân viên hoặc mật khẩu không đúng",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failed: wrong password (${employeeCode})`);
      return res.status(401).json({
        success: false,
        message: "Mã nhân viên hoặc mật khẩu không đúng",
      });
    }

    const safeUser = {
      id: user.id,
      employeeCode: user.employeeCode,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "24h",
    });

    console.log(`Login success: ${user.employeeCode} (${user.role})`);
    return res.json({ success: true, data: { token, user: safeUser } });
  } catch (error) {
    console.log("Login error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi server khi đăng nhập" });
  }
});

router.get("/me", auth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;

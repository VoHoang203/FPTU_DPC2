const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");
const roleCheck = require("./middleware/roleCheck");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);

app.get("/api/test/admin-only", auth, roleCheck(["admin"]), (req, res) => {
  res.json({ message: "Chào Admin - Bạn có quyền quản lý hệ thống" });
});

app.get("/api/test/bt-only", auth, roleCheck(["bt"]), (req, res) => {
  res.json({ message: "Chào Bí thư - Bạn có quyền duyệt nghị quyết" });
});

app.get("/api/test/pbt-only", auth, roleCheck(["pbt"]), (req, res) => {
  res.json({ message: "Chào Phó Bí thư - Bạn có quyền duyệt nhận xét" });
});

app.get("/api/test/cu-only", auth, roleCheck(["cu"]), (req, res) => {
  res.json({ message: "Chào Chi ủy - Bạn có quyền quản lý đảng viên" });
});

app.get("/api/test/dashboard", auth, roleCheck(["bt", "pbt"]), (req, res) => {
  res.json({ message: "Dashboard - Dành cho BT và PBT" });
});

app.get("/api/test/all-users", auth, (req, res) => {
  res.json({ message: "Chào mừng tất cả đảng viên" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

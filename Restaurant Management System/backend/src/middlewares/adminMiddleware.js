const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // Include role
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};


// const verifyAdmin = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id, role: decoded.role }; // Include role
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }

//   try {
//     const admin = await Admin.findById(req.user.id).select("-password");
//     res.json({ user: { id: admin._id, name: admin.name } });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { verifyAdmin };

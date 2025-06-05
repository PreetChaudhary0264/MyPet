const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(" Token found:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decode);
      req.user = decode;
    } catch (error) {
      console.error(" Token verification error:", error);
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Token expired. Please login again."
            : "Token is invalid.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};


// //dono middlware role check kr rhe hai basically wo authorization ke liye use ho rhe hai
// exports.isStudent = (req,res,next)=>{
//       try {
//           if(req.user.role !== "Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"this is a protected routes for students",
//             })
//           }

//           next();
//       } catch (error) {
//          return res.status(500).json({
//             success:false,
//             message:"user role is not matching",
//          })
//       }
// }

// exports.isAdmin = (req,res,next)=>{
//       try {
//           if(req.user.role !== "Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"this is a protected routes for admin",
//             })
//           }

//           next();
//       } catch (error) {
//          return res.status(500).json({
//             success:false,
//             message:"user role is not matching",
//          })
//       }
// }
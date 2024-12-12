const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        // Retrieve the token from cookies, body, or header
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token received:", token);

        // If token is missing, return an error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing. Authorization denied.",
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
            req.user = decoded; // Attach decoded payload to req.user
        } catch (error) {
            // Token verification error
            return res.status(401).json({
                success: false,
                message: "Invalid token. Authorization denied.",
            });
        }

        next(); // Pass control to the next middleware/route
    } catch (error) {
        console.error("Error during authentication middleware:", error.message);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during authentication.",
        });
    }
};

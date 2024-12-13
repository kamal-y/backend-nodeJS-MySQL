const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        // Retrieve the token from cookies, body, or header
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");


        // If token is missing, return an error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing. Authorization denied.",
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

exports.authCurrentUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token not provided' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Invalid token' });
        }

        // Token is valid
        res.json({ success: true, message: 'Token is valid' });
    });


};

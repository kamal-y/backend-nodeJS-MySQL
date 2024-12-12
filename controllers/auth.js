const pool = require("../config/dbConnect")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const authController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body
            const [user, ] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })
            

            const hash = await bcrypt.hash(password, 10)

            const sql = "insert into users (email, password, name) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [email, hash, name])

            if (rows.affectedRows) {
                return res.json({ message: "Ok" })
            } else {
                return res.json({ error: "Error" })
            }
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Fetch user by email
            const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            if (!user[0]) {
                return res.status(404).json({ error: "Invalid email!" });
            }
    
            const { password: hash, id, name } = user[0];
    
            // Compare hashed password
            const check = await bcrypt.compare(password, hash);
    
            if (check) {
                const payload = {
                    email: user[0].email,
                    id: user[0].id,
                    accountType: user[0].accountType,
                };
    
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    
                // Hide sensitive data before returning response
                user[0].token = token;
                user[0].password = undefined;
    
                // Set cookie options
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };
    
                // Send success response
                return res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user: user[0],
                    message: "Logged in Successfully",
                });
            }
    
            // Password mismatch
            return res.status(401).json({ error: "Wrong password!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    
}

module.exports = authController
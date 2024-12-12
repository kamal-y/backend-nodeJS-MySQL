const pool = require("../config/dbConnect");

// User constructor
// class User {
//     constructor(id, email, password) {
//         this.id = id;
//         this.email = email;
//         this.password = password;
//     }
// }

const userModel = {
    findByEmail: async (email) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length === 0) {
                return { error: "User not found" };
            }
            return new User(rows[0].id, rows[0].email, rows[0].password);
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw error;
        }
    },

    create: async (newUser) => {
        try {
            const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
            const [rows, fields] = await pool.query(sql, [newUser.email, newUser.password]);
            return new User(rows.insertId, newUser.email, newUser.password);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
};

module.exports = userModel;

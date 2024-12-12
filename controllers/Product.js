const pool = require("../config/dbConnect");


const productsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM products");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Failed to retrieve products." 
            });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Product not found."
                });
            }
            res.json({
                data: rows[0]
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Failed to retrieve the product."
            });
        }
    },

    create: async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const sql = "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [name, price, description]);
            res.json({
                message: "Product created successfully.",
                data: {
                    id: rows.insertId,
                    name,
                    price,
                    description
                }
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Failed to create the product."
            });
        }
    },

    update: async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const { id } = req.params;
            const sql = "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [name, price, description, id]);

            if (rows.affectedRows === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Product not found."
                });
            }

            res.json({
                message: "Product updated successfully.",
                data: {
                    id,
                    name,
                    price,
                    description
                }
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Failed to update the product."
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

            if (rows.affectedRows === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Product not found."
                });
            }

            res.json({
                message: "Product deleted successfully."
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Failed to delete the product."
            });
        }
    }
};

module.exports = productsController;

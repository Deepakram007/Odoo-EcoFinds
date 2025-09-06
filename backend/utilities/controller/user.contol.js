import pool from '../database/db.js'; 
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (rows.length > 0) {
            return res.status(400).json({ message: "Account Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );

        if (result.rowCount === 1) {
            const newUser = { id: result.rows[0].id, email: email, username: username };
            
            // JWT token creation is removed.
            
            return res.status(201).json({ 
                message: "Account Creation Successful",
                user: newUser
            });
            
        } else {
             return res.status(500).json({ message: "Failure in Creation" });
        }

    } catch (error) {
        console.error("Sign Up Error:", error);
        res.status(500).json({ message: "Server error during sign up." });
    }
};

export const login = async (req, res) => {
    console.log("Login function called");
    try {
        const { email, password } = {email:"ala@gmail.com",password:"ala12345"}; //req.body;
        console.log(email,password);
        
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        
        // JWT token creation is removed.

        res.status(200).json({
            message: "Login Successful",
            user: { id: user.id, email: user.email, username: user.username }
        });

    } catch (error){
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
};



export const getGoatData = async (req, res) => {
    try {
    
        const {rows} = await pool.query('SELECT * FROM products');

        
        if (rows.length === 0) {
            return res.status(404).json({ message: "No data found in goat table." });
        }

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error retrieving data from goat table:", error);
        res.status(500).json({ message: "Server error while retrieving data." });
    }
};
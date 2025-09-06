import pool from '../database/db.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length > 0) {
            return res.status(400).json({
                message: "Account Exists"
            });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const [result] = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

     
        if (result.affectedRows === 1) {
            const newUser = { id: result.insertId, email: email };
            
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            
            return res.status(201).json({ 
                message: "Account Creation Successful",
                user: { id: newUser.id, email: newUser.email },
                token
            });
        } else {
             return res.status(500).json({ 
                message: "Failure in Creation"
            });
        }

    } catch (error) {
        console.error("Sign Up Error:", error);
        res.status(500).json({ message: "Server error during sign up." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ 
                message: "User not found"
            });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

     
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: "Login Successful",
            user: { id: user.id, email: user.email },
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
};



export const getGoatData = async (req, res) => {
    try {
    
        const {rows} = await pool.query('SELECT * FROM goat');

        
        if (rows.length === 0) {
            return res.status(404).json({ message: "No data found in goat table." });
        }

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error retrieving data from goat table:", error);
        res.status(500).json({ message: "Server error while retrieving data." });
    }
};
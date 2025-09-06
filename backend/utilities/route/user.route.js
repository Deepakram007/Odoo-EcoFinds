import express from 'express';
import { signUp, login, getGoatData } from '../controller/user.contol.js';

console.log("✅ user.route.js file has been loaded."); // <-- ADD THIS

const router = express.Router();

// This middleware will run for every request to this router
router.use((req, res, next) => {
    console.log(`➡️ Request received for: ${req.method} ${req.originalUrl}`); // <-- ADD THIS
    next(); // Pass control to the next handler
});

router.post('/signup', signUp); 
router.post('/login', login);
router.get('/goat', getGoatData);

export default router;
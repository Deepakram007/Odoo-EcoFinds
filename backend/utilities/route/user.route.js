import express from 'express';
import { signUp,login ,getGoatData} from '../controller/user.contol.js';

const router = express.Router();

router.post('/checkUser',signUp)
router.post('/login',login)
router.get('/goatData',getGoatData)


export default router;
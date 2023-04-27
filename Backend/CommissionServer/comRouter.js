import express  from "express";
const router = express.Router();
import {addCommission, getAll} from './comController.js'


router.post('/add',addCommission);
router.get('/get',getAll);


export default router
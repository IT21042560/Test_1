import  express  from 'express';
const router = express.Router();
import {Addcart, getCart,deleteCart,deleteCartM} from '../controller/cartController.js'



router.post('/addcart',Addcart);
router.get('/getCart',getCart);
router.post('/deleteCart',deleteCart);
router.post('/deleteCartM',deleteCartM);


export default router
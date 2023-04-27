import  express  from 'express';
import {AdminRegister, Signin, Signout, tokenRefresh, getAllAdmins ,deleteAdmin} from '../controllers/AdminController.js'
import multer from 'multer';
// import requireSignIn from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'uploadImages')
    },
    filename: function(req, file,cb){
        cb(null,Date.now() + '_' + file.originalname);
    }
})

const upload = multer({storage});



router.post('/Signup',upload.single('ProfilePicture'),AdminRegister);
router.post('/Signin',Signin);
router.delete('/Signout',Signout);
router.post('/Token',tokenRefresh);
router.get('/admins', getAllAdmins);
router.post('/deleteAdmin', deleteAdmin);


export default router
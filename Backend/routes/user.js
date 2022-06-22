const router = require('express').Router();
const authMiddleware = require('../middlewares/auth/authMiddleware')

const {userRegister,userLogin,allusers, deleteuser,userdetails, userProfile, updateuser} = require('../controllers/user')

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/',authMiddleware,allusers);
router.delete('/:id',deleteuser);
router.get('/:id',userdetails);
router.get('/profile/:id',authMiddleware,userProfile);
router.put('/update/:id',authMiddleware,updateuser)
module.exports = router 
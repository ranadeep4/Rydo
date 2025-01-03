const exports = require('express');

const router = express.Router()

const {body} = require('express-validator')

const userConstroller = require('../controllers/user.controller')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name length must be atleast 3 char long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 chars long'),

], userConstroller.registerUser)




module.exports = router;
const {Router} = require('express');
const router = Router();
const {signupUser, loginUser, updateUser, deleteUser, getUser, getAllUsers} = require('../controllers/userController');
const {auth} = require('../middleware/auth');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.put('/:userId', auth, updateUser);
router.get('/', auth, getAllUsers);
router.get('/:userId', auth, getUser);
router.delete('/:userId', auth, deleteUser);

module.exports = router;
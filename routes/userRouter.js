const {Router} = require('express');
const router = Router();
const {signupUser, loginUser, updateUser, deleteUser, getUser, getAllUsers} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllUsers);

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.put('/:userId', auth, updateUser);

router.get('/:userId', auth, getUser);

router.delete('/:userId', auth, deleteUser);

module.exports = router;
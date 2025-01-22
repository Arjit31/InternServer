const {Router} = require('express');
const router = Router();
const {signupUser, loginUser} = require('../controllers/userController');

router.get('/', async (req, res) => {
    res.json('user Route');
});

router.post('/signup', signupUser);

router.post('/login', loginUser);

module.exports = router;
const {Router} = require('express');
const router = Router();
const signupUser = require('../controllers/userController');

router.get('/', async (req, res) => {
    res.send('user Route');
});

router.post('/signup', signupUser);

module.exports = router;
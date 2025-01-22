const {Router} = require('express');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, async (req, res) => {
    console.log(req.user);
    res.json('vendor Route');
});



module.exports = router;
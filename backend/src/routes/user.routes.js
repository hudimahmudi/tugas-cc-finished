const router = require('express').Router();
const auth = require('../middleware/auth');
const { listEditors } = require('../controllers/user.controller');

router.use(auth);
router.get('/editors', listEditors);

module.exports = router;

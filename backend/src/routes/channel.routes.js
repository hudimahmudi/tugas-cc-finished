const router = require('express').Router();
const auth = require('../middleware/auth');
const { listChannels, createChannel } = require('../controllers/channel.controller');

router.use(auth);

router.get('/', listChannels);
router.post('/', createChannel);

module.exports = router;
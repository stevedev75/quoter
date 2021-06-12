const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/posts', likeRoutes);

module.exports = router;
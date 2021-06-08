const { Likes } = require('../models');

const likesData = [
    {
        likes_id: '1',
    },
    {
        likes_post_id: '1',
    },
    {
        likes_user_id: 'ClarkKent@email.com',
    },
];

const seedLikes = () => Likes.bulkCreate(likesData);

module.exports = seedLikes;
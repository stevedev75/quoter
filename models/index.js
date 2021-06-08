const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Like.belongsTo(User, {
    foreignKey: 'user_id',
});


Post.hasMany(Like, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Like.belongsTo(Post, {
    foreignKey: 'post_id',
});


module.exports = { User, Post, Like}
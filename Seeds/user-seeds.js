const { User } = require('../models');

const userData = [
    {
        userName: 'Steve',
        email: 'steve@gmail.com',
        password: 'password1',

    },

    {
        userName: 'Joe',
        email: 'joe@gmail.com',
        password: 'password1',

    },

    {
        userName: 'Nick',
        email: 'nick@gmail.com',
        password: 'password1',

    },

    {
        userName: 'Ant',
        email: 'ant@gmail.com',
        password: 'password1',

    },

    {
        userName: 'Kevin',
        email: 'kevin@gmail.com',
        password: 'password1',

    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
const { User } = require('../models');

const userData = [
    {
        username: 'Steve',
        email: 'steve@gmail.com',
        password: 'password1',

    },

    {
        username: 'Joe',
        email: 'joe@gmail.com',
        password: 'password1',

    },

    {
        username: 'Nick',
        email: 'nick@gmail.com',
        password: 'password1',

    },

    {
        username: 'Ant',
        email: 'ant@gmail.com',
        password: 'password1',

    },

    {
        username: 'Kevin',
        email: 'kevin@gmail.com',
        password: 'password1',

    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
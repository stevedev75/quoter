const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Like } = require('../models');


router.get('/',  (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'content',
            'date_created',
            'user_id',
        ],
        order: [['date_created', 'DESC']],

        include: [
            {
                model: User,
                attributes: ['username']
            },
         /*{ 
                model: Post,
                attributes: ['id', 'content', 'date_created', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }    
         
            },*/
            {
                model: Like,
                attributes: ['id', 'post_id', 'user_id',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })

        .then(dbPostData => {

            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'date_created',
            'user_id',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },

        /*{
                model: Post,
                attributes: ['id', 'content', 'date_created', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },*/
            {
                model: Like,
                attributes: ['id', 'post_id', 'user_id',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;

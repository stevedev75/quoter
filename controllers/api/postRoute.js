const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// GET ALL POSTS //

router.get('/', (req, res) => {
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
            {
                model: Post,
                attributes: ['id', 'content', 'date_created', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET A SINGLE POST BY ID //

router.get('/:id', (req, res) => {
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
            {
                model: Post,
                attributes: ['id', 'content', 'date_created', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

// CREATE A POST //

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.userId
    })
    .then(dbPostData=> res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// UPDATE A POST //

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// DELETE A POST //

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'NO post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
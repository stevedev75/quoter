const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_id',
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
        .then(dbLikeData => res.json(dbLikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },

        attributes: [
            'id',
            'post_id',
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
        .then(dbLikeData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Nothing found with this id' });
                return;
            }
            res.json(dbLikeData);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });



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
            res.status(404).json({ message: 'Nothing with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Nothin found with this id' });
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
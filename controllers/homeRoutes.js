const router = require('express').Router();
const { User, Post, Like } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    try{
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['userName'],},],
            order: [['date_created', 'DESC']],
        });
        //console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));
        //console.log(allPosts);
        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) =>{

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['userName'],
                },
                {
                    model: Like,
                    include: [
                        {
                            model: User,
                            attributes: ['userName'],
                        },
                    ],                    
                   // order: [['date_created','DESC']],
                },
            ] ,  

        });
        const post = postData.get({ plain: true});
        //console.log(post);

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    }catch (err){
        res.status(500).json(err);  
    }
});

router.get('/home', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk( req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [
                {
                    model: Post,
                    order: [['date_created', 'DESC']],
                },
            ],
        })

        const user = userData.get({plain: true });
        console.log(user);

        res.render('homepage', {
            user,
            logged_in: true,
            Dash: true,
        });
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newpost', withAuth, async (req, res) => {

    if(req.session.logged_in) {
        res.render('newpost', {
            logged_in: req.session.logged_in,
            Dash: true,
        });
        return;
    }
    res.redirect('login');
});

router.get('/editpost/:id', withAuth, async (req, res) =>{
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['userName'],
                },
            ],
        });
        const post = postData.get({ plain: true});
        res.render('editpost', {
            post,
            logged_in: req.session.logged_in,
            Dash: true,
        });
    }catch (err){
        res.status(500).json(err);  
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
})

module.exports = router;
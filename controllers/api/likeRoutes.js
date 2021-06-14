const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res)=>{
    try {
        const isLiked = await Like.findOne({
            where: {
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            }
        });

        if(isLiked) {
            res.status(400).json({message: "one like per user per post. " });
            return;
        }

        const newLike = await Like.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(newLike);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) =>{
    try {
        const like = await Like.destroy({
            where:{
                post_id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!like) {
            res.status(404).json({ message: `You didn't liked this quoter.`});
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

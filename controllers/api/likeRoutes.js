const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res)=>{
    try {
        const newLike = await Comment.create({
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
                id: req.params.id,
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

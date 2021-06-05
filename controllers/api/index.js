const router = require('express').Router();

/* update these routes and routers to the relate to the 
"new" routes" that will reside in the api directory too...*/

const userRoutes = require('./userRoutes');
/*const projectRoutes = require('./projectRoutes');*/

router.use('/users', userRoutes);
/*router.use('/projects', projectRoutes); */

module.exports = router;
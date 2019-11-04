import * as express from 'express';

const router = express.Router({mergeParams: true});

router.route('/getRequest/:id')
.get((req, res) => {
    res.json({ success: true, id: req.params.id });
});

export default router;

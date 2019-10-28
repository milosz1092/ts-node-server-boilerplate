import * as express from 'express';

const router = express.Router({mergeParams: true});

router.route('/getRequest')
.get((req, res) => {
    res.json({ success: true });
});

export default router;

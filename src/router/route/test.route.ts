import * as express from 'express';
import checkController from '../../controller/check/check.controller';

const router: express.Router = express.Router({mergeParams: true});

router.use('/check', [/*Auth.ensureAuthorized ,*/checkController]);

router.all(`*/*`, (req: express.Request, res: express.Response) => {
    res.sendStatus(404);
});

export default router;

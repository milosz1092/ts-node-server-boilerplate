import * as path from 'path';
import * as express from 'express';
import testRouting from './route/test.route';

const root = path.join(__dirname, '../../../ts-pwa-boilerplate/dist');

export default class Router {
    static injectTo(app: express.Application) {
        app.use((req, res, next) => {
            res.header("Content-Type", 'application/json');
            next();
        });

        app.use('/test/api/v1', testRouting);
    }
}

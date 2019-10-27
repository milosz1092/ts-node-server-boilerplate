import * as path from 'path';
import * as express from 'express';
import * as provideGzipped from 'express-static-gzip';
import { parseBodySet } from './middleware/body';
import { redirectUnsecureConnection } from './middleware/redirect';
import { addResponseHeaders } from './middleware/header';
import { handleSyntaxError, handleOtherError } from './middleware/error';
import Router from './router/Router';

export const clientPath = path.join(__dirname, '../../ts-pwa-boilerplate/dist');

export default class App {
    static getInstance(): express.Application {
        const app: express.Application = express();

        app.use(
            redirectUnsecureConnection,
            ...parseBodySet,
            // addResponseHeaders,
            handleSyntaxError,
            handleOtherError
        );

        app.use(provideGzipped(clientPath));

        Router.injectTo(app);

        app.all('*', (req, res) => {
            res.header("content-encoding",'gzip');
            res.header("Content-Type",'text/html');
            res.sendfile(clientPath + '/index.html.gz');
        });

        app.listen(8080, () => {
            console.log('Redirecting unsecure connections');
        });

        return app;
    }
}

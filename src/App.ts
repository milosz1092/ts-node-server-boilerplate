import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import * as provideGzipped from 'express-static-gzip';
import { parseBodySet } from './middleware/body';
import { redirectUnsecureConnection } from './middleware/redirect';
import { addResponseHeaders } from './middleware/header';
import { handleSyntaxError, handleOtherError } from './middleware/error';
import Router from './router/Router';

const clientPath = path.join(__dirname, '../../ts-pwa-boilerplate/dist');
const isClientIndexGzipped = fs.existsSync(`${clientPath}/index.html.gz`);

const clientIndexFilename = isClientIndexGzipped ? 'index.html.gz' : 'index.html';

export default class App {
    static getInstance(): express.Application {
        const app: express.Application = express();

        app.use(
            redirectUnsecureConnection,
            ...parseBodySet,
            addResponseHeaders,
            handleSyntaxError,
            handleOtherError
        );

        app.use(provideGzipped(clientPath));

        Router.injectTo(app);

        app.all('*', (req, res) => {
            if (isClientIndexGzipped) {
                res.header("content-encoding", 'gzip');
            }
            res.header("Content-Type", 'text/html');
            res.sendFile(`${clientPath}/${clientIndexFilename}`);
        });

        app.listen(8080, () => {
            console.log('Redirecting unsecure connections');
        });

        return app;
    }
}

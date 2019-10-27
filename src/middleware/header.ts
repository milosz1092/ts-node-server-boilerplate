import * as express from 'express';

export const addResponseHeaders: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json');
    next();
}

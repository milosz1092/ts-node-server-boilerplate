import * as express from 'express';

export const redirectUnsecureConnection: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.secure) {
        next();
    } else {
        res.redirect(`https://${req.headers.host}${req.url}`.replace('8080', '8443'));
    }
}

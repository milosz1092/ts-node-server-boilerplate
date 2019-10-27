import * as express from 'express';
import Config from '../config/Config';

export const handleSyntaxError: express.ErrorRequestHandler = (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.statusCode = 400;
        res.json({
            error: [
                Config.api_errors.EJ001
            ]
        });
    } else {
        next();
    }
}

export const handleOtherError: express.ErrorRequestHandler = (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    res.status(err.status || 500);
    let errorMessage: string;

    if (err instanceof Error) {
        errorMessage = `${err.name} :: ${errorMessage}`;
    } else {
        errorMessage = JSON.stringify(err);
    }

    res.json({
        errors: [
            errorMessage
        ]
    });
}

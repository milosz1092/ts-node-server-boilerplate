import * as bodyParser from 'body-parser';
import * as express from 'express';

const bodyJSONParser: express.RequestHandler = bodyParser.json();
const bodyUrlEncodedParser: express.RequestHandler = bodyParser.urlencoded({extended: false});

export const parseBodySet = [bodyJSONParser, bodyUrlEncodedParser];

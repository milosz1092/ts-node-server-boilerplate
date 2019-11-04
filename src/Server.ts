import * as fs from 'fs';
import { createServer, Server as HTTP2Server } from 'spdy';
import App from './App';

export default class Server {
    static instance: HTTP2Server = null;

    static init() {
        const privateKey  = fs.readFileSync('97481052_localhost.key', 'utf8');
        const certificate = fs.readFileSync('97481052_localhost.cert', 'utf8');

        const credentials = { key: privateKey, cert: certificate };

        const port: number = 8443;

        Server.instance = createServer({
            ...credentials,
        }, App.getInstance());

        Server.instance.listen(port, () => {
            console.log(`Server listen on port ${port}`)
        });
    }
}

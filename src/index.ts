import Config from './config/Config';
import Server from './Server';

(async () => {
    try {
        await Config.init();
        Server.init();
    } catch (error) {
        console.error(error);
    }
})()

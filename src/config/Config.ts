import * as path from 'path';
import * as fs from 'fs';

interface IApiErrors {
    [key: string]: string;
}

interface IBaseConfig {
    development: {
        [key: string]: string;
    }
}

export default class Config {
    public static base: IBaseConfig = null;
    public static api_errors: IApiErrors = null;

    public static async init(): Promise<boolean> {
        const env = process.env.NODE_ENV || 'development';

        const config = JSON.parse(fs.readFileSync(path.join(__dirname,'../../config/base.json'), 'UTF-8'));
        Config.base = config[env];

        Config.api_errors = JSON.parse(fs.readFileSync(path.join(__dirname,'../../config/api-errors.json'), 'UTF-8'));

        return true;
    }
}

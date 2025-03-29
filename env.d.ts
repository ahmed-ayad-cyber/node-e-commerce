declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: 'development' | 'production';
        readonly JWT_KEY: string;
        readonly JWT_KEY_RESET: string;
        readonly JWT_Expire: string|any;
        readonly JWT_Expire_RESET: string|any;
        readonly EMAIL_HOST:string;
        readonly EMAIL_USERNAME:string;
        readonly EMAIL_PASSWORD:string;
        readonly APP_NAME:string;
        readonly GOOGLE_CLIENT_ID: string;
        readonly GOOGLE_CLIENT_SECRET: string;
        readonly GOOGLE_CALLBACK: string;
    }
}
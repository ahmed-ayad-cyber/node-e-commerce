declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: 'development' | 'production';
        readonly BASE_URL: 'development' | 'production';
        readonly JWT_KEY: string;
        readonly JWT_Expire: string;
    }
}
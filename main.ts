import dotenv from 'dotenv';
import { Server } from 'http';
import express from 'express';
import path from 'path';
import i18n from 'i18n'
import dbConnection from "./src/config/database";
import mountRoutes from "./src";
import hpp from 'hpp';

const app: express.Application = express();
app.use(express.json({limit: '10kb'}));
let server:Server;
dotenv.config();
i18n.configure({
    locales:['en','ar'],
    directory: path.join(__dirname,'locales'),
    defaultLocale:'en',
    queryParameter:'lang'
})
app.use(i18n.init)
app.use(hpp({whitelist:['price']}))
app.use(express.static('uploades'))
dbConnection();
mountRoutes(app);

server = app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
})

process.on('unhandledRejection', (err: Error) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('shutting the application down');
        process.exit(1);
    })
});



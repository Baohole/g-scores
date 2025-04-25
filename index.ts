import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

const app: Express = express();
const server = http.createServer(app);
dotenv.config()

const port: number | string = process.env.PORT || 8000;

// Import database and router if needed
import Router from './routes/index.routes';
import * as database from './config/database';

// app.use(cors({ origin: process.env.FE_URL, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('612Gasd0q'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

Router(app);         // Setup routes

app.get('/', (req: Request, res: Response) => {
    res.redirect('/dashboard')
});


// app.get('*', function (req: Request, res: Response) {
//     res.status(404).render('error', {
//         title: '404 Page Not Found',
//         message: '404 Not Found'
//     })
// })

database.connect();  // Ensure database connection

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

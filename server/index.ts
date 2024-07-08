import express, { Express } from 'express';
import cors from 'cors';
require('dotenv').config();
import passport from 'passport';
const app: Express = express();
import { applyPassportStrategy } from './src/service/passport';
import routes from "./src/route/index"
import './src/config/db-connection'

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
applyPassportStrategy(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use('/api/V1',routes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 8080.`);
  });
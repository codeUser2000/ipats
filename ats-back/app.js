import createError from "http-errors";
import express from "express";
import compression from "compression";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import headers from "./middlewares/headers.js";
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { rateLimit } from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import {BlockedIp} from "./models/index.js";
import swaggerDocument from './openapi.json' assert { type: 'json' }
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(compression({
  threshold: 0,
  brotli: { enabled: true }
}));
app.use(logger('dev'));
app.use(express.json({limit: '40mb',}));
app.use(express.urlencoded({limit: '40mb',extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(headers);

const corsOptions ={
  origin:['http://10.226.0.71:4001','https://account.ats.am','https://ucom-acc.ats.am','http://localhost:3002','http://localhost:3001','http://localhost:3000','https://5.77.240.221','https://ats.am','http://5.77.240.221:1080','http://ats.am:1080'],
  credentials:true,
  optionSuccessStatus:200
}
async function blockIp(ip) {
  await BlockedIp.create({ip:ip})
}

async function checkBlockedIp(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.remoteAddress;
  const checkIp = await BlockedIp.findOne({where: {ip}})
  if (checkIp) {
    return res.status(403).send('Your IP is blocked due to too many requests.');
  }
  next();
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 150,
  handler:async (req, res, options) => {
    try {
      await blockIp(req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.remoteAddress);
    } catch (error) {
      console.error('Error blocking IP on limit reached:', error);
    }
  },
  message: 'Too many requests from this IP, please try again later.',
});

app.use(checkBlockedIp);
app.use(cors(corsOptions));

export default app;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
const adminBuildPath = path.join(__dirname, '../ats-admin/build')
// const newAtsBuild = path.join(__dirname, '../ats-new/build')
const finalAtsBuild = path.join(__dirname, '../ats/build')
app.use('/ats-admin', express.static(adminBuildPath))
// app.use('/final', express.static(newAtsBuild ))
app.use('/', express.static(finalAtsBuild))

app.get('/ats-admin/*', function(req,res) {
  res.sendFile(adminBuildPath + '/index.html');
})
// app.get('/final/*', function(req,res) {
//   res.sendFile(newAtsBuild + '/index.html');
// })
app.get('/*', function(req,res) {
  res.sendFile(finalAtsBuild + '/index.html')
})

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
});

import express from 'express';
import user from './users.js';
import home from "./home.js";
import MemberController from "../controller/MemberController.js";
import authorization from "../middlewares/authorization.js";
import service from "./service.js";
import slider from "./slider.js";
import app from "./app.js";
import apiDoc from "./apiDoc.js";
import question from "./question.js";
import HomeController from "../controller/HomeController.js";
import AppController from "../controller/AppController.js";
import uploader from "../middlewares/fileUploader.js";
import partner from "./partner.js";
import pluses from "./pluses.js";
import needs from "./needs.js";
import price from "./price.js";

const router = express.Router();

router.use('/member', user);
router.use('/home', home);
router.use('/service', service);
router.use('/app', app);
router.use('/slide', slider);
router.use('/pluses', pluses);
router.use('/needs', needs);
router.use('/price', price);
router.get('/menu', AppController.getMenu);
router.get('/menu_single', AppController.getMenuSingle);
router.use('/question', question);
router.use('/api', apiDoc);
router.use('/partner', partner);
router.get('/profile',authorization, MemberController.profile);
router.post('/login', MemberController.login);
router.post('/image',authorization,uploader.single('image'), HomeController.image);



export default router;

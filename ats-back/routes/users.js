import express from 'express';
import MemberController from "../controller/MemberController.js";
import uploader from "../middlewares/fileUploader.js";
import HomeController from "../controller/HomeController.js";
import {limiter} from "../middlewares/limit.js";



const router = express.Router();

router.post('/create',uploader.single('image'), MemberController.create);
router.post('/register', limiter, HomeController.register);
router.post('/delete', MemberController.deleteMember);
router.post('/edit',uploader.single('newImage'), MemberController.edit);
router.get('/get', MemberController.get);


export default router;

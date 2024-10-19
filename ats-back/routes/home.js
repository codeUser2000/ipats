import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import HomeController from "../controller/HomeController.js";
import authorization from "../middlewares/authorization.js";
import QuestionController from "../controller/QuestionController.js";
import PartnersController from "../controller/PartnersController.js";
import {limiter} from "../middlewares/limit.js";



const router = express.Router();

//----ABOUT----//
router.get('/getHome', HomeController.getHome);
router.get('/getVideo', HomeController.getVideo);


router.get('/getService', HomeController.getService);


router.get('/get', HomeController.get);
router.get('/get_contact', HomeController.getContact);
router.get('/get_about', HomeController.getAbout);
router.post('/contact_us',limiter, HomeController.contactUs);
router.get('/app_get', HomeController.appGet);
router.get('/counter_get', HomeController.getCounter);
router.get('/counter_get_single', HomeController.getCounterSingle);
router.post('/contact_us_data',authorization, HomeController.createContactUsDesc);
router.post('/contact_us_edit',authorization, HomeController.editContact);
router.get('/contact_us_get',authorization, HomeController.contactUsGet);
router.get('/crm', HomeController.getCrm);


//-----PARTNER--------//
router.get('/partner', QuestionController.getPartner);

//----Image----//
router.get('/about_img', HomeController.getAboutImage);
export default router;

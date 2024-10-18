import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import HomeController from "../controller/HomeController.js";
import authorization from "../middlewares/authorization.js";
import QuestionController from "../controller/QuestionController.js";
import PartnersController from "../controller/PartnersController.js";
import {limiter} from "../middlewares/limit.js";



const router = express.Router();

//----ABOUT----//
router.post('/createAbout',authorization,uploader.single('image'), HomeController.createAbout);
router.post('/editAbout',authorization,uploader.single('image'), HomeController.editAbout);
router.post('/createHome',authorization,uploader.single('image'), HomeController.createHome);
router.post('/editHome',authorization,uploader.single('image'), HomeController.editHome);
router.get('/getHome', HomeController.getHome);
router.post('/createVideo',authorization, HomeController.createVideo);
router.post('/editVideo',authorization,HomeController.editVideo);
router.get('/getVideo', HomeController.getVideo);
//----CAROUSEL----//
router.post('/createCarousel',authorization,uploader.single('image'), HomeController.createBigCarousel);
router.post('/editCarousel',authorization,uploader.single('newImage'), HomeController.editBigCarousel);
router.post('/editReview',authorization,uploader.single('newImage'), HomeController.editReview);
router.post('/deleteCarousel',authorization, HomeController.deleteBigCarousel);

//----CLIENT---//

router.post('/editClient',authorization,uploader.single('image'), HomeController.editClient);
router.post('/createClientImage',authorization,uploader.single('image'), HomeController.createClientImage);
router.post('/createReview',authorization,uploader.single('image'), HomeController.createReview);
router.post('/editClientReview',authorization, HomeController.editClientReview);
router.post('/createClientReview',authorization, HomeController.createClientReview);
router.post('/deleteReview',authorization, HomeController.deleteReview);
router.post('/deleteClientImage',authorization, HomeController.deleteClientImage);
router.post('/createClient',authorization, HomeController.createClient);


router.post('/createAts',authorization, HomeController.createAtsWork);
router.post('/editAts',authorization, HomeController.editAts);
router.post('/createInterested',authorization,uploader.single('image'), HomeController.createInterested);
router.post('/createService',authorization, HomeController.createServices);
router.get('/getService', HomeController.getService);
router.post('/createPricing',authorization, HomeController.createPricing);
router.post('/editPricing',authorization, HomeController.editPricing);
router.post('/editInterested',authorization,uploader.single('image'), HomeController.editInterested);


router.post('/createWho',authorization, HomeController.createWhoUse);
router.post('/editWho',authorization, HomeController.editWhoUse);
router.post('/deleteWho',authorization, HomeController.deleteWhoUse);
router.post('/createBenefit',authorization, HomeController.createBenefit);
router.post('/editBenefit',authorization, HomeController.editBenefit);
router.post('/deleteBenefit',authorization, HomeController.deleteBenefit);
router.post('/deleteService',authorization, HomeController.deleteServices);
router.get('/get', HomeController.get);
router.get('/get_contact', HomeController.getContact);
router.get('/get_about', HomeController.getAbout);
router.post('/contact_us',limiter, HomeController.contactUs);
router.post('/app',authorization,uploader.single('image'), HomeController.app);
router.post('/app_edit',authorization,uploader.single('image'), HomeController.appUpdate);
router.get('/app_get', HomeController.appGet);
router.post('/counter',authorization,uploader.single('image'), HomeController.createCounter);
router.post('/counter_edit',authorization,uploader.single('image'), HomeController.editCounter);
router.get('/counter_get', HomeController.getCounter);
router.get('/counter_get_single', HomeController.getCounterSingle);
router.post('/contact_us_data',authorization, HomeController.createContactUsDesc);
router.post('/contact_us_edit',authorization, HomeController.editContact);
router.get('/contact_us_get',authorization, HomeController.contactUsGet);
router.get('/client', HomeController.getClient);
router.get('/crm', HomeController.getCrm);


//-----PARTNER--------//
router.post('/editPartner',authorization, PartnersController.editPartner);
router.post('/editPartnerImage',authorization,uploader.single('image'), PartnersController.editPartnerImage);
router.post('/createPartnerImage',authorization,uploader.single('image'), PartnersController.createPartnerImage);
router.post('/createPartner',authorization, PartnersController.createPartner);
router.post('/deletePartnerImage',authorization, PartnersController.deletePartnerImage);
router.get('/partner', QuestionController.getPartner);

//----Image----//
router.post('/createAboutImage',authorization,uploader.single('image'), HomeController.createAboutImage);
router.post('/deleteAboutImage',authorization, HomeController.deleteAboutImage);
router.get('/about_img', HomeController.getAboutImage);
export default router;

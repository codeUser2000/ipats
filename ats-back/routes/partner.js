import express from 'express';
import authorization from "../middlewares/authorization.js";
import PartnersController from "../controller/PartnersController.js";
import uploader from "../middlewares/fileUploader.js";
const router = express.Router();

router.post('/create',authorization,uploader.single('image'), PartnersController.createPartnerBlock);
router.post('/create_partnership',authorization, PartnersController.createPartnerShip);
router.post('/create_partner_integration',authorization, PartnersController.createPartnerIntegration);
router.post('/create_soc',authorization,uploader.single('image'), PartnersController.createSocImage);
router.post('/edit',authorization,uploader.single('image'), PartnersController.editPartnerBlock);
router.post('/edit_partner_integration',authorization, PartnersController.editPartnerIntegration);
router.post('/edit_partnership',authorization, PartnersController.editPartnerShip);
router.post('/deleteSocImage',authorization, PartnersController.deleteSocImage);
// router.post('/delete',authorization, QuestionController.deleteQuest);
router.get('/get_partnership', PartnersController.getPartnerShip);
router.get('/get_partner_integration', PartnersController.getPartnerIntegration);
router.get('/get', PartnersController.get);
router.get('/get_soc', PartnersController.getSoc);
router.get('/get_single', PartnersController.getSingleP);
router.get('/getSingle',authorization, PartnersController.getSingle);


export default router;

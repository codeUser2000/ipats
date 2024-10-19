import express from 'express';
import authorization from "../middlewares/authorization.js";
import PartnersController from "../controller/PartnersController.js";
const router = express.Router();

router.get('/get_partnership', PartnersController.getPartnerShip);
router.get('/get_partner_integration', PartnersController.getPartnerIntegration);
router.get('/get', PartnersController.get);
router.get('/get_soc', PartnersController.getSoc);
router.get('/get_single', PartnersController.getSingleP);
router.get('/getSingle',authorization, PartnersController.getSingle);


export default router;

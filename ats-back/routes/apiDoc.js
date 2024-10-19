import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import authorization from "../middlewares/authorization.js";
import ApiDocController from "../controller/ApiDocController.js";



const router = express.Router();

router.get('/get', ApiDocController.get);
router.get('/getDev', ApiDocController.getDev);
router.get('/get_crm_integration', ApiDocController.getCrmIntag);
router.get('/crm_integration', ApiDocController.getCrmIntagFront);
router.get('/get_single', ApiDocController.getSingle);
router.get('/get_single_crm_integration', ApiDocController.getSingleCrmIntag);


export default router;

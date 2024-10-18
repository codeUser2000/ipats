import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import authorization from "../middlewares/authorization.js";
import ApiDocController from "../controller/ApiDocController.js";



const router = express.Router();

router.post('/create',authorization, ApiDocController.create);
router.post('/createDev',authorization, ApiDocController.createDev);
router.post('/create_crm',authorization,uploader.single('image'), ApiDocController.createCrm);
router.post('/create_crm_integration',authorization,uploader.single('image'), ApiDocController.createCrmIntag);
router.post('/create_crm_integrator',authorization,uploader.single('image'), ApiDocController.createCrmIntagor);
router.post('/edit_crm',authorization,uploader.single('image'), ApiDocController.editCrm);
router.post('/edit_crm_integration',authorization,uploader.single('image'), ApiDocController.editCrmInteg);
router.post('/edit_crm_integrator',authorization,uploader.single('image'), ApiDocController.editCrmIntegor);
router.post('/edit',authorization, ApiDocController.edit);
router.post('/editDev',authorization, ApiDocController.editDev);
router.post('/delete',authorization, ApiDocController.delete);
router.post('/delete_param',authorization, ApiDocController.deleteParams);
router.get('/get', ApiDocController.get);
router.get('/getDev', ApiDocController.getDev);
router.get('/get_crm_integration', ApiDocController.getCrmIntag);
router.get('/crm_integration', ApiDocController.getCrmIntagFront);
router.get('/get_single', ApiDocController.getSingle);
router.get('/get_single_crm_integration', ApiDocController.getSingleCrmIntag);


export default router;

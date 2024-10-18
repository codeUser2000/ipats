import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import ServiceController from "../controller/ServiceController.js";
import authorization from "../middlewares/authorization.js";



const router = express.Router();
router.post('/create',authorization,uploader.single('icon'), ServiceController.create);
router.post('/edit',authorization,uploader.single('icon'), ServiceController.edit);
router.post('/delete',authorization, ServiceController.delete);
router.get('/get', ServiceController.get);
router.get('/get_for_pbx', ServiceController.get_for_pbx);
router.get('/get_single', ServiceController.getSingle);
router.get('/get_last', ServiceController.getLast);
router.get('/get_array', ServiceController.getArr);
router.get('/get_preview', ServiceController.getPreview);
router.post('/create_preview', ServiceController.createPreview);
router.post('/edit_preview', ServiceController.editPreview);
router.get('/get_preview_local', ServiceController.getPreviewLocal);
router.post('/create_preview_local', ServiceController.createPreviewLocal);
router.post('/edit_preview_local', ServiceController.editPreviewLocal);
router.get('/get_local', ServiceController.getLocal);
router.post('/create_local', ServiceController.createLocal);
router.post('/edit_local', ServiceController.editLocal);


export default router;

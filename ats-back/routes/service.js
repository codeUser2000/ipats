import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import ServiceController from "../controller/ServiceController.js";
import authorization from "../middlewares/authorization.js";



const router = express.Router();
router.get('/get', ServiceController.get);
router.get('/get_for_pbx', ServiceController.get_for_pbx);
router.get('/get_single', ServiceController.getSingle);
router.get('/get_last', ServiceController.getLast);
router.get('/get_array', ServiceController.getArr);
router.get('/get_preview', ServiceController.getPreview);
router.get('/get_preview_local', ServiceController.getPreviewLocal);
router.get('/get_local', ServiceController.getLocal);


export default router;

import express from 'express';
import uploader from "../middlewares/fileUploader.js";
import authorization from "../middlewares/authorization.js";
import SliderController from "../controller/SliderController.js";



const router = express.Router();

router.post('/create',authorization,uploader.single('image'), SliderController.create);
router.post('/edit',authorization,uploader.single('newImage'), SliderController.edit);
router.post('/delete',authorization, SliderController.delete);
router.get('/get', SliderController.get);
router.get('/result', SliderController.getResult);


export default router;

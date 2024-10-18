import express from 'express';
import authorization from "../middlewares/authorization.js";
import PriceController from "../controller/PriceController.js";



const router = express.Router();

router.post('/create',authorization, PriceController.create);
router.post('/delete',authorization, PriceController.delete);
router.get('/get', PriceController.get);
router.post('/edit',authorization, PriceController.edit);



export default router;

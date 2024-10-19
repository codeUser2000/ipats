import express from 'express';
import authorization from "../middlewares/authorization.js";
import PriceController from "../controller/PriceController.js";



const router = express.Router();

router.get('/get', PriceController.get);



export default router;

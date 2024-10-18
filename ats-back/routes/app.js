import express from 'express';
import ServiceController from "../controller/ServiceController.js";
import authorization from "../middlewares/authorization.js";
import AppController from "../controller/AppController.js";



const router = express.Router();

router.post('/create',authorization, AppController.create);
router.post('/delete',authorization, ServiceController.delete);
router.get('/get', ServiceController.get);


export default router;

import express from 'express';
import authorization from "../middlewares/authorization.js";
import PlusesController from "../controller/PlusesController.js";

const router = express.Router();

router.get('/get', PlusesController.get);


export default router;

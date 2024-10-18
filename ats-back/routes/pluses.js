import express from 'express';
import authorization from "../middlewares/authorization.js";
import PlusesController from "../controller/PlusesController.js";

const router = express.Router();

router.post('/create',authorization, PlusesController.create);
router.post('/edit',authorization, PlusesController.edit);
router.post('/delete',authorization, PlusesController.delete);
router.get('/get', PlusesController.get);


export default router;

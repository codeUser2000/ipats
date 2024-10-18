import express from 'express';
import authorization from "../middlewares/authorization.js";
import PlusesController from "../controller/PlusesController.js";



const router = express.Router();

router.post('/create',authorization, PlusesController.createNeeds);
router.post('/edit',authorization, PlusesController.editNeeds);
router.post('/delete',authorization, PlusesController.deleteNeeds);
router.get('/get', PlusesController.getNeeds);


export default router;

import express from 'express';

import authorization from "../middlewares/authorization.js";
import QuestionController from "../controller/QuestionController.js";



const router = express.Router();

router.post('/create',authorization, QuestionController.create);
router.post('/edit',authorization, QuestionController.edit);
router.post('/delete',authorization, QuestionController.deleteQuest);
router.get('/get', QuestionController.get);
router.get('/getSingle',authorization, QuestionController.getSingle);


export default router;

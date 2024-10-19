import express from 'express';
import ServiceController from "../controller/ServiceController.js";

const router = express.Router();

router.get('/get', ServiceController.get);


export default router;

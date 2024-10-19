import Home from "../models/Home.js";
import {lang} from "../services/lang.js";
import {HomeTranslate, PartnerChild, PartnerChildTranslate, Partners, Soc} from "../models/index.js";
import path from "path";
import {v4 as uuidV4} from "uuid";
import imgPng from "../services/imagePng.js";
import fs from "fs";
import _ from "lodash";
import imgPromise from "../services/imgPromise.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class PartnersController {
    static getSingle = async (req, res, next) => {
        try {
            const {id} = req.query
            const partnerImages = await Partners.findOne({
                where: {id},
                include: [
                    {
                        model: PartnerChild,
                        as: 'partner_data',
                        required: false,
                        include: [
                            {
                                model: PartnerChildTranslate,
                                as: 'partner_data_translate',
                                required: false,
                            },
                        ],
                    },
                ],
            });

            res.json({
                status: 'ok',
                partnerImages
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getSingleP = async (req, res, next) => {
        try {
            const {id} = req.query
            const partnerImages = await PartnerChild.findOne({
                where: {id},
                include: [
                    {
                        model: PartnerChildTranslate,
                        as: 'partner_data_translate',
                        required: false,
                    },
                ],
            });

            res.json({
                status: 'ok',
                partnerImages
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static get = async (req, res, next) => {
        try {
            const {lang} = req.query
            let langId = {}
            if(lang){
                langId.langId = lang
            }
            const partnerImages = await PartnerChild.findAll({
                where: {status:1},
                include: [
                    {
                        model: PartnerChildTranslate,
                        as: 'partner_data_translate',
                        where:langId,
                        required: false,
                    },
                ],
            });

            res.json({
                status: 'ok',
                partnerImages
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getPartnerShip = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const partnerImages = await Home.findOne({
                where: { type: 'partnership'},
                attributes:['id'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            });

            res.json({
                status: 'ok',
                partnerImages
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getPartnerIntegration = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const integration = await Home.findOne({
                where: { type: 'partner_integration'},
                attributes:['id'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            });

            res.json({
                status: 'ok',
                integration
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getSoc = async (req, res, next) => {
        try {
            const soc = await Soc.findAll();
            res.json({
                status: 'ok',
                soc
            });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}

export default PartnersController;

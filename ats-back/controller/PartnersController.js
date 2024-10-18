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
    static createPartner = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: '', image: '', type: 'partner'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc:req.body['desc' + langElement.lang]
                })
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPartnerShip = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: '', image: '', type: 'partnership'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc:req.body['desc' + langElement.lang]
                })
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPartnerIntegration = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: '', image: '', type: 'partner_integration'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc:req.body['desc' + langElement.lang]
                })
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPartnerBlock = async (req, res, next) => {
        try {
            const {file} = req
            const {status, link, id} = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/clients', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const about = await PartnerChild.create({ status, link, image: avatar})
            const partnerChildId = about.id;
            const uid = uuidV4()
            for (let langElement of lang) {
                await PartnerChildTranslate.create({
                    partnerChildId,
                    langId: langElement.id,
                    transID: uid,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang],
                })
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPartnerBlock = async (req, res, next) => {
        try {
            const {file} = req
            const {status, link, id, transID} = req.body
            let avatar
            const ex = await PartnerChild.findOne({where: {id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', ex.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/members', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await PartnerChild.update({status, link, image: avatar}, {where: {id},})
            for (let langElement of lang) {
                await PartnerChildTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang],
                }, {where: {partnerChildId: id, transID, langId: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPartnerImage = async (req, res, next) => {
        try {
            const {file} = req
            const {status} = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/clients', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            await Partners.create({
                path: avatar,
                status
            })
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createSocImage = async (req, res, next) => {
        try {
            const {file} = req
            const {status} = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/clients', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            await Soc.create({
                path: avatar,
                status
            })
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deletePartnerImage = async (req, res, next) => {
        try {
            const {id} = req.body
            const client = await Partners.findOne({where: {id}})
            const oldFile = path.join(__dirname, '../public', client.path)
            fs.unlinkSync(oldFile)
            await Partners.destroy({where: {id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteSocImage = async (req, res, next) => {
        try {
            const {id} = req.body
            const client = await Soc.findOne({where: {id}})
            const oldFile = path.join(__dirname, '../public', client.path)
            fs.unlinkSync(oldFile)
            await Soc.destroy({where: {id}})
            res.json({
                status: 'ok',
            });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPartnerImage = async (req, res, next) => {
        try {
            const {id, status} = req.body

            await Partners.update({status}, {where: {id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPartner = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'partner'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'partner'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: about.id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPartnerShip = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'partnership'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'partnership'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: about.id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPartnerIntegration = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'partner_integration'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'partner_integration'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: about.id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
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

import path from "path";
import fs from "fs";
import _ from "lodash";
import {v4 as uuidV4} from 'uuid';
import {
    ApiDoc,
    ApiDocTranslate,
    ApiTitleTranslate,
    CrmIntegration,
    CrmIntegrationTranslate,
    CrmIntegratorTranslate,
    HomeTranslate,
} from "../models/index.js";
import {lang} from "../services/lang.js";
import imgPng from "../services/imagePng.js";
import Home from "../models/Home.js";
import CrmIntegratorer from "../models/CrmIntegrator.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class ApiDocController {

    static create = async (req, res, next) => {
        try {

            const {link, type, response, status, data} = req.body

            const api = await ApiDoc.create({link, status, type, res: response})
            let uniq
            for (let datum of data) {
                uniq = uuidV4()
                for (let langElement of lang) {
                    await ApiDocTranslate.create({
                        paramId: uniq,
                        type: datum.type,
                        param: datum.param,
                        dataType: datum.dataType,
                        langId: langElement.id,
                        apiId: api.id,
                        desc: datum['desc' + langElement.lang]
                    },)
                }
            }
            for (let langElement of lang) {
                const title = await ApiTitleTranslate.create({
                    langId: langElement.id,
                    apiId: api.id,
                    desc: req.body['desc' + langElement.lang],
                    title: req.body['title' + langElement.lang]
                },)
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static edit = async (req, res, next) => {
        try {
            const {link, type, status, data, response, id} = req.body
            let uniq

            const api = await ApiDoc.findOne({where: {id}})
            await ApiDoc.update({link, type, res: response, status}, {where: {id}})
            for (let datum of data) {
                uniq = uuidV4()
                if (datum.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                    for (let langElement of lang) {
                        await ApiDocTranslate.create({
                            paramId: uniq,
                            type: datum.type,
                            param: datum.param,
                            dataType: datum.dataType,
                            langId: langElement.id,
                            apiId: api.id,
                            desc: datum['desc' + langElement.lang]
                        },)
                    }
                } else {
                    for (let langElement of lang) {
                        await ApiDocTranslate.update({
                            dataType: datum.dataType,
                            param: datum.param,
                            type: datum.type,
                            desc: datum['desc' + langElement.lang]
                        }, {where: {langId: langElement.id, apiId: api.id, paramId: datum.id}})
                    }
                }
            }
            for (let langElement of lang) {
                await ApiTitleTranslate.update({
                    langId: langElement.id,
                    apiId: api.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {langId: langElement.id, apiId: api.id}})
            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static get = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            let where = {}
            if (lang) {
                whereOptions = {langId: lang}
                where = {status: 1}
            }
            const api = await ApiDoc.findAll({
                where,
                include: [
                    {
                        model: ApiDocTranslate,
                        as: 'api_doc_translate',
                        where: whereOptions,
                        required: false
                    }, {
                        model: ApiTitleTranslate,
                        as: 'api_title_translate',
                        where: whereOptions,
                        required: false
                    },
                ]
            })

            res.json({
                status: 'ok',
                api
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createDev = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const dev = await Home.create({title: titleEng, desc: descEng, image: '', type: 'dev'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: dev.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
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
    static editDev = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body

            await Home.update({title: titleEng, desc: descEng, image: ''}, {where: {id, type: 'dev'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getDev = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const dev = await Home.findOne({
                where: {type: 'dev'},
                attributes: ['id',],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })


            res.json({
                status: 'ok',
                dev,
            });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createCrm = async (req, res, next) => {
        try {
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const about = await Home.create({title: '', desc: '', image: avatar, type: 'crm'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                })
            }
            // if (!_.isEmpty(file)) {
            //     const oldFile = path.join(__dirname, '../public', image.path)
            //     if (fs.existsSync(oldFile) && image.path !== '/uploads/user_image/user_employee.jpg') {
            //         fs.unlinkSync(oldFile)
            //     }
            //     const originalName = file.originalname.replace(/\..+$/, '.jpg');
            //     avatar = path.join('/uploads/user_image', uuidV4() + '-' + originalName);
            //     await imgPromise('../public', file, avatar)
            // }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createCrmIntag = async (req, res, next) => {
        try {
            const {file} = req
            const {link, status} = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const about = await CrmIntegration.create({image: avatar, link, status})
            for (let langElement of lang) {
                await CrmIntegrationTranslate.create({
                    crmIntId: about.id,
                    langId: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
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
    static createCrmIntagor = async (req, res, next) => {
        try {
            const {file} = req
            const {link, status, id} = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const about = await CrmIntegratorer.create({image: avatar, crmIntagId: id, link, status})
            let param = uuidV4()
            for (let langElement of lang) {
                await CrmIntegratorTranslate.create({
                    crmIntorId: about.id,
                    crmId: param,
                    langId: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
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
    static editCrm = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const {file} = req
            let avatar

            const about = await Home.findOne({where: {id, type: 'crm'}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }
            await Home.update({title: '', desc: '', image: avatar}, {where: {id, type: 'crm'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editCrmInteg = async (req, res, next) => {
        try {
            const {id, link, status} = req.body
            const {file} = req
            let avatar

            const about = await CrmIntegration.findOne({where: {id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }
            await CrmIntegration.update({image: avatar, link, status}, {where: {id}})
            for (let langElement of lang) {
                await CrmIntegrationTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {crmIntId: id, langId: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editCrmIntegor = async (req, res, next) => {
        try {
            const {id, link, status, crmId} = req.body
            const {file} = req
            let avatar

            const about = await CrmIntegratorer.findOne({where: {id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }
            await CrmIntegratorer.update({image: avatar, link, status}, {where: {id}})
            for (let langElement of lang) {
                await CrmIntegratorTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {crmIntorId: id, crmId, langId: langElement.id,}})
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
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const api = await ApiDoc.findOne({
                where: {id},
                include: [
                    {
                        model: ApiDocTranslate,
                        as: 'api_doc_translate',
                        where: whereOptions,
                        required: false
                    }, {
                        model: ApiTitleTranslate,
                        as: 'api_title_translate',
                        where: whereOptions,
                        required: false
                    },
                ]
            })

            const modifiedApi = {
                ...api.get(),
                api_doc_translate: api.api_doc_translate || null,
                api_title_translate: api.api_title_translate || null,
            };

            res.json({
                status: 'ok',
                api: modifiedApi
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getSingleCrmIntag = async (req, res, next) => {
        try {
            const {id} = req.query
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const api = await CrmIntegration.findOne({
                where: {id},
                include: [
                    {
                        model: CrmIntegratorer,
                        as: 'crm_integration_integrator',
                        attributes: ['id', 'image', 'status', 'link'],
                        include: [
                            {
                                model: CrmIntegratorTranslate,
                                as: 'crm_integrator_translate',
                                where: whereOptions,
                                required: false
                            },
                        ],
                        required: false
                    }, {
                        model: CrmIntegrationTranslate,
                        as: 'crm_integration_translate',
                        where: whereOptions,
                        required: false
                    },
                ]
            })


            res.json({
                status: 'ok',
                api
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getCrmIntag = async (req, res, next) => {
        try {
            const {id} = req.query
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const crm = await CrmIntegration.findAll({
                include: [
                    {
                        model: CrmIntegratorer,
                        as: 'crm_integration_integrator',
                        where: whereOptions,
                        required: false
                    }, {
                        model: CrmIntegrationTranslate,
                        as: 'crm_integration_translate',
                        where: whereOptions,
                        required: false
                    },
                ]
            })


            res.json({
                status: 'ok',
                crm
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getCrmIntagFront = async (req, res, next) => {
        try {
            const {id} = req.query
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const crm = await CrmIntegration.findAll({
                where: {status: 1},
                attributes: ['id', 'link', 'image','name'],
                include: [{
                    model: CrmIntegrationTranslate,
                    as: 'crm_integration_translate',
                    where: whereOptions,
                    required: false
                },
                ]
            })


            res.json({
                status: 'ok',
                crm
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static delete = async (req, res, next) => {
        try {
            const {id} = req.query
            await ApiDoc.destroy({where: {id}})

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteParams = async (req, res, next) => {
        try {
            const {id} = req.query
            const data = await ApiDocTranslate.findAll({where: {paramId: id}, limit: 3})
            for (let datum of data) {
                await ApiDocTranslate.destroy({where: {id: datum.id}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export default ApiDocController;

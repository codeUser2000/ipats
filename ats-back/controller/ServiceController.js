import path from "path";
import fs from "fs";
import _ from "lodash";
import sequelize from "../services/sequelize.js";
import {v4 as uuidV4} from 'uuid';
import {HomeTranslate, Menu, MenuTranslate, NewService, NewServiceTranslate, Price,} from "../models/index.js";
import {lang} from "../services/lang.js";
import imgPng from "../services/imagePng.js";
import Home from "../models/Home.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class ServiceController {

    static create = async (req, res, next) => {
        try {
            const {file} = req
            let avatar = ''
            if(file){
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }

            const service = await NewService.create({icon:avatar,status:req.body.status,link:req.body.link})
            for (let langElement of lang) {
                await NewServiceTranslate.create({
                    serviceId:service.id,
                    langId:langElement.id,
                    title:req.body['title'+langElement.lang],
                    desc:req.body['desc'+langElement.lang],
                    descShort:req.body['descShort'+langElement.lang]
                })
            }

            const menu1 = await Menu.create({
                link:req.body.link,
                parent_id:1,
                icon:avatar
            })
            const menu2 = await Menu.create({
                link: req.body.link,
                parent_id: 2,
                icon:avatar

            })

            for (let langElement of lang) {
                await MenuTranslate.create({
                     menuId:menu1.id,
                    langId:langElement.id,
                    title:req.body['title'+langElement.lang],
                })
                await MenuTranslate.create({
                    menuId:menu2.id,
                    langId:langElement.id,
                    title:req.body['title'+langElement.lang],
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
    static get = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            let status = {}
            if(lang){
                whereOptions = {langId:lang}
            }
            if(lang){
                status = {status:1}
            }
            const service = await NewService.findAll({
                where:status,
                include:[
                    {
                        model:NewServiceTranslate,
                        attributes:['id','descShort','title', !lang ? 'desc' : [sequelize.literal('NULL'), 'desc']],
                        as:'new_service_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                service
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static get_for_pbx = async (req, res, next) => {
        try {
            const {lang,parent_id} = req.query
            let whereOptions = {}
            let status = {}

            if(lang){
                whereOptions = {langId:lang}
            }


            if(parent_id){
                let parent = await Menu.findOne({where:{link:parent_id}})

                status = {parent_id:parent.id}
            }
            const service = await Menu.findAll({
                where:status,
                include:[
                    {
                        model:MenuTranslate,
                        attributes:['id','title',],
                        as: 'menu_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                service
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getSingle = async (req, res, next) => {
        try {
            const {lang,link} = req.query
            let whereOptions = {}
            let status = {}
            if(lang){
                whereOptions = {langId:lang}
            }
            if(lang){
                status = {link}
            }
            const service = await NewService.findOne({
                where:status,
                include:[
                    {
                        model:NewServiceTranslate,
                        as:'new_service_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                service
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getArr = async (req, res, next) => {
        try {
            const {lang,link} = req.query
            let whereOptions = {}
            let status = {}
            if(lang){
                whereOptions = {langId:lang}
            }

            let recieved = JSON.parse(link);
            let service = []
            for (let linkElement of recieved) {
                const s = await NewService.findOne({
                    where: {link: linkElement},
                    include:[
                        {
                            model:NewServiceTranslate,
                            as:'new_service_translate',
                            where:whereOptions
                        }
                    ]
                })
                service.push(s)
            }

            res.json({
                status: 'ok',
                service
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static getPreview = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const preview = await Home.findOne({
                where: {type: 'service_prev'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            res.json({
                status: 'ok',
                preview
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPreview = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body

            const prev = await Home.create({title: titleEng, desc: descEng, image: '', type: 'service_prev'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: prev.id,
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
    static editPreview = async (req, res, next) => {
        try {

            const {id, titleEng, descEng, users} = req.body
            const about = await Home.findOne({where: {id, type: 'service_prev'}})
            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'service_prev'}})
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
    static getPreviewLocal = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const preview = await Home.findOne({
                where: {type: 'service_prev_local'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            res.json({
                status: 'ok',
                preview
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPreviewLocal = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body

            const prev = await Home.create({title: titleEng, desc: descEng, image: '', type: 'service_prev_local'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: prev.id,
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
    static editPreviewLocal = async (req, res, next) => {
        try {

            const {id, titleEng, descEng, users} = req.body
            const about = await Home.findOne({where: {id, type: 'service_prev_local'}})
            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'service_prev_local'}})
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
    static getLocal = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const local = await Home.findOne({
                where: {type: 'service__local'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            res.json({
                status: 'ok',
                local
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createLocal = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body

            const prev = await Home.create({title: titleEng, desc: descEng, image: '', type: 'service__local'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: prev.id,
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
    static editLocal = async (req, res, next) => {
        try {

            const {id, titleEng, descEng, users} = req.body
            const about = await Home.findOne({where: {id, type: 'service__local'}})
            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'service__local'}})
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

    static getLast = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            let status = {}
            if(lang){
                whereOptions = {langId:lang}
            }
            if(lang){
                // status = {status:1}
            }

            const service = await NewService.findAll({
                order:[['updatedAt', 'DESC']],
                where:status,
                include:[
                    {
                        model:NewServiceTranslate,
                        attributes:['id','descShort','title'],
                        as:'new_service_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                service
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static delete = async (req, res, next) => {
        try {
            const {id} = req.query
            const client = await NewService.findOne({where:{id}})
            const oldFile = path.join(__dirname, '../public', client.icon)
            fs.unlinkSync(oldFile)
            let all = await Menu.findAll({where:{link:client.link}})
            for (let menu of all) {
                await menu.destroy()
            }
            await client.destroy()
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
            const {file} = req

            let avatar

            const about = await NewService.findOne({where: {id:req.body.id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.icon)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }
            let service = await NewService.findOne({where: {id:about.id}})


            await NewService.update({icon: avatar,link:req.body.link, status:req.body.status}, {where: {id:about.id}})
            for (let langElement of lang) {
                await NewServiceTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang],
                    descShort:req.body['descShort'+langElement.lang]
                }, {where: {serviceId: about.id, langId: langElement.id}})
            }
            const menu1 = await Menu.update({
                icon:avatar
            },{where:{link:service.link}})
            const menu2 = await Menu.create({
                icon:avatar
            },{where:{link:service.link}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}

export default ServiceController;

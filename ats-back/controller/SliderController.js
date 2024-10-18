import path from "path";
import fs from "fs";
import _ from "lodash";
import {v4 as uuidV4} from 'uuid';
import {
   Sliders, SliderTranslate,

} from "../models/index.js";
import {lang} from "../services/lang.js";
import imgPng from "../services/imagePng.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class SliderController {

    static create = async (req, res, next) => {
        try {
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';
            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const service = await Sliders.create({image:avatar,linkTo:req.body.link,where:req.body.where, status:req.body.status})
            for (let langElement of lang) {
                await SliderTranslate.create({
                    sliderId:service.id,
                    langId:langElement.id,
                    title:req.body['title'+langElement.lang],
                    desc:req.body['desc'+langElement.lang],
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
    static edit = async (req, res, next) => {
        try {
            const {file} = req
            const {id} = req.query

            let avatar

            const about = await Sliders.findOne({where: {id:req.body.id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPng('../public', file, avatar)
            }else{
                avatar = about.image
            }
            await Sliders.update({image: avatar,linkTo:req.body.link, status:req.body.status,where:req.body.where,}, {where: {id:req.body.id}})
            for (let langElement of lang) {
                await SliderTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {sliderId: about.id, langId: langElement.id}})
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
                status = {status:1,where:'home'}
            }
            const slide = await Sliders.findAll({
                where:status,
                include:[
                    {
                        model:SliderTranslate,
                        as:'slider_data_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                slide
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getResult = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            let status = {}
            if(lang){
                whereOptions = {langId:lang}
            }
            if(lang){
                status = {status:1,where:'result'}
            }
            const slide = await Sliders.findAll({
                where:status,
                include:[
                    {
                        model:SliderTranslate,
                        as:'slider_data_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                slide
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static delete = async (req, res, next) => {
        try {
            const {id} = req.query
            const client = await Sliders.findOne({where:{id}})
            const oldFile = path.join(__dirname, '../public', client.image)
            fs.unlinkSync(oldFile)
            await Sliders.destroy({where:{id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export default SliderController;

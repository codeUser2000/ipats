import path from "path";
import fs from "fs";
import _ from "lodash";
import {v4 as uuidV4} from 'uuid';
import {AppDownload, Menu, MenuTranslate, Sliders, SliderTranslate} from "../models/index.js";
import {lang} from "../services/lang.js";
import imgPng from "../services/imagePng.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class AppController {

    static create = async (req, res, next) => {
        try {

            const {link, type} = req.body

            await AppDownload.create({link, type})

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

            const about = await Sliders.findOne({where: {id: req.body.id}})
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
            await Sliders.update({image: avatar, status: req.body.status}, {where: {id: req.body.id}})
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
            if (lang) {
                whereOptions = {langId: lang}
            }
            const slide = await Sliders.findAll({
                include: [
                    {
                        model: SliderTranslate,
                        as: 'slider_data_translate',
                        where: whereOptions
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
            const client = await Sliders.findOne({where: {id}})
            const oldFile = path.join(__dirname, '../public', client.icon)
            fs.unlinkSync(oldFile)
            await Sliders.destroy({where: {id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static getMenu = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const menu = await Menu.findAll({
                include: [
                    {
                        model: MenuTranslate,
                        as: 'menu_translate',
                        where: whereOptions
                    }
                ]
            })
            res.json({
                status: 'yes',
                menu,
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getMenuSingle = async (req, res, next) => {
        try {
            const {link, lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {langId: lang}
            }
            const menuSingle = await Menu.findOne({where: {link}})
            const menu = await Menu.findAll({
                where: {parent_id: menuSingle.id},
                include:[{
                    model: MenuTranslate,
                    as: 'menu_translate',
                    where: whereOptions
                }]
            })
            res.json({
                status: 'ok',
                menu
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}

export default AppController;

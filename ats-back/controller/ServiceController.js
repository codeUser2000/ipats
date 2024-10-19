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

}

export default ServiceController;

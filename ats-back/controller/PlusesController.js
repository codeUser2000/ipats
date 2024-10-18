import {
 Needs, NeedsTranslate,
 Pluses, PlusesTranslate,
} from "../models/index.js";
import {lang} from "../services/lang.js";

class PlusesController {

    static create = async (req, res, next) => {
        try {

            const plus = await Pluses.create({name:req.body.descEng,status:req.body.status})
            for (let langElement of lang) {
                await PlusesTranslate.create({
                    plusesId:plus.id,
                    langId:langElement.id,
                    title:req.body['desc'+langElement.lang],
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
            console.log(req.body)
            await Pluses.update({status:req.body.status}, {where: {id:req.body.id}})
            for (let langElement of lang) {
                await PlusesTranslate.update({
                    title: req.body['desc' + langElement.lang],
                }, {where: {plusesId: req.body.id, langId: langElement.id}})
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
            const pluses = await Pluses.findAll({
                where:status,
                include:[
                    {
                        model:PlusesTranslate,
                        as:'plus_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                pluses
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static delete = async (req, res, next) => {
        try {
            const {id} = req.query
            await Pluses.destroy({where:{id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createNeeds = async (req, res, next) => {
        try {
            const plus = await Needs.create({name:req.body.descEng,status:req.body.status})
            for (let langElement of lang) {
                await NeedsTranslate.create({
                    needsId:plus.id,
                    langId:langElement.id,
                    title:req.body['desc'+langElement.lang],
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
    static editNeeds = async (req, res, next) => {
        try {
            await Needs.update({status:req.body.status}, {where: {id:req.body.id}})
            for (let langElement of lang) {
                await NeedsTranslate.update({
                    title: req.body['desc' + langElement.lang],
                }, {where: {needsId: req.body.id, langId: langElement.id}})
            }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getNeeds = async (req, res, next) => {
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
            const pluses = await Needs.findAll({
                where:status,
                include:[
                    {
                        model:NeedsTranslate,
                        as:'need_translate',
                        where:whereOptions
                    }
                ]
            })

            res.json({
                status: 'ok',
                pluses
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteNeeds = async (req, res, next) => {
        try {
            const {id} = req.query
            await Needs.destroy({where:{id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export default PlusesController;

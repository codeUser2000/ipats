import {
 Needs, NeedsTranslate,
 Pluses, PlusesTranslate,
} from "../models/index.js";
import {lang} from "../services/lang.js";

class PlusesController {

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
}

export default PlusesController;

import {
    Needs,  Price, PriceTranslate,
} from "../models/index.js";
import {lang} from "../services/lang.js";
import Discount from "../models/Discount.js";


class PriceController {

    static create = async (req, res, next) => {
        try {
            const {day,status} = req.body
            const plus = await Price.create({sname:req.body.descEng,status,days:day})
            for (let langElement of lang) {
                await PriceTranslate.create({
                    priceId:plus.id,
                    langId:langElement.id,
                    title:req.body['desc'+langElement.lang],
                    price:req.body['price'+langElement.lang],
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
            await Price.update({status:req.body.status,days:req.body.day}, {where: {id:req.body.id}})
            for (let langElement of lang) {
                await PriceTranslate.update({
                    title: req.body['desc' + langElement.lang],
                    price: req.body['price' + langElement.lang],
                }, {where: {priceId: req.body.id, langId: langElement.id}})
            }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static delete = async (req, res, next) => {
        try {
            const {id} = req.query
            await Price.destroy({where:{id}})
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
            let price = await Price.findAll({
                where:{...status},
                include:[
                    {
                        model:PriceTranslate,
                        as:'price_translate',
                        where:whereOptions,
                        // required:false
                    }
                ],
                raw:true
            })
            for (let price1 of price) {
                let discount = await Discount.findAll({where: {snum:price1.id},attributes:['sqanak','discount']})

                if(discount){
                    price1.discount = discount
                }else{
                    price1.discount = []
                }
            }

            res.json({
                status: 'ok',
                price
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

export default PriceController;

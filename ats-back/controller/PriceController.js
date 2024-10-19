import {
    Needs,  Price, PriceTranslate,
} from "../models/index.js";
import {lang} from "../services/lang.js";
import Discount from "../models/Discount.js";


class PriceController {

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

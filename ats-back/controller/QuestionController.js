import {
    Clients,
    HomeTranslate,
    PartnerChild,
    PartnerChildTranslate,
    Partners,
    Questions,
    QuestionsTranslate,
    Reviews
} from "../models/index.js";
import {lang} from "../services/lang.js";
import Home from "../models/Home.js";

const {JWT_SECRET_ACCESS, JWT_SECRET_REFRESH} = process.env;

class QuestionController {
    static get = async (req, res, next) => {
        try {
            const {lang} = req.query
            const whereOp = {}
            const status = {}
            if (lang) {
                whereOp.langId = lang
                status.status = 1
            }
            let questions = await Questions.findAll({
                where:status,
                include: [
                    {
                        model: QuestionsTranslate,
                        as: 'question_data_translate',
                        where: whereOp
                    }
                ]
            })

            res.json({
                status: 'ok',
                questions
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getPartner = async (req, res, next) => {
        try {
            const {lang} = req.query
            const whereOp = {}
            const status = {}
            if (lang) {
                whereOp.lang = lang
                status.status = 1
            }
            const partner = await Home.findOne({
                where: {type: 'partner'},
                attributes: ['id'], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: lang?{lang:whereOp.lang}:{},
                    },
                ],
            });
            const partnerImages = await Partners.findAll({
                where:status,
                include: [
                    {
                        model: PartnerChild,
                        where:status,
                        as: 'partner_data',
                        required:false,
                        include: [
                            {
                                model: PartnerChildTranslate,
                                as: 'partner_data_translate',
                                required:false,
                                where:lang? {langId:whereOp.lang}:{},
                            },
                        ],
                    },
                ],
            });


            res.json({
                status: 'ok',
                partner,
                partnerImages
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getSingle = async (req, res, next) => {
        try {
            const {lang, id} = req.query
            let question = await Questions.findOne({
                where: {id},
                include: [
                    {
                        model: QuestionsTranslate,
                        as: 'question_data_translate',
                    }
                ]
            })

            res.json({
                status: 'ok',
                question
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }


}

export default QuestionController;

import {
    ApiDoc,
    ApiDocTranslate,
    ApiTitleTranslate,
    CrmIntegration,
    CrmIntegrationTranslate,
    CrmIntegratorTranslate,
    HomeTranslate,
} from "../models/index.js";

import Home from "../models/Home.js";
import CrmIntegratorer from "../models/CrmIntegrator.js";


class ApiDocController {

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
}

export default ApiDocController;

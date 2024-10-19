import path from "path";
import fs from "fs";
import _ from "lodash";
import imgPromise from "../services/imgPromise.js";
import {v4 as uuidV4} from 'uuid';
import {
    AppDownload,
    Clients,
    ContactUs,
    Counter,
    HomeTranslate, Image,
    Member,
    MemberTranslate,
    Reviews,
    WhoUse,IpATSRegister
} from "../models/index.js";
import {lang} from "../services/lang.js";
import Home from "../models/Home.js";
import imgPng from "../services/imagePng.js";
import Email from "../services/Email.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class HomeController {
    //----HOME----//


    //----CLIENT-----//
    static editContact = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'contact'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'contact'}})
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


    //----SERVICE-----//
    static register = async (req, res, next) => {
        try {
            const {message,phone,email,company,fullName} = req.body
            await IpATSRegister.create({fullName:fullName.toString(),message:message.toString(),phone:phone.toString(),email:email.toString(),company:company.toString()})
            Email.sendCompanyEmail(fullName,message,email,phone,company)
            let whereOptions = {}




        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static contactUs = async (req, res, next) => {
        try {
            const {page = 1, limit = 10, search='',startTime,endTime} = req.query
            const {name,contact_number,email,message,company} = req.body
            await ContactUs.create({name:name.toString(),sms:message.toString(),web:contact_number.toString(),email:email.toString(),company:company.toString()})
            Email.sendCompanyEmail(name,message,email,contact_number,company)
            let whereOptions = {}

            if(search){
                whereOptions = {
                    email: {$like: "%" + search + "%",},
                }
            }
            if (startTime && endTime) {
                const start = new Date(startTime).toISOString()
                const end = new Date(endTime).toISOString()
                const newStart = start.split('T')[0] + ' 00:00:00'
                const newEnd = end.split('T')[0] + ' 23:59:59'

                whereOptions = {
                    ...whereOptions,
                    createdAt:{
                        $between: [newStart,newEnd]
                    }
                }
            }

            const contact = await ContactUs.findAll({
                where: whereOptions,
                offset: (+page - 1) * +limit,
                limit: +limit,
            });




            const total = await ContactUs.count({where:whereOptions});
            res.json({
                status: 'ok',
                contact,
                total,
                page: +page,
                totalPages: Math.ceil(total / +limit)
            });



        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createContactUsDesc = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'contact'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
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
    static contactUsGet = async (req, res, next) => {
        try {

            const {page = 1, limit = 10, search='',startTime,endTime} = req.query
            let whereOptions = {}

            if(search){
                whereOptions = {
                    email: {$like: "%" + search + "%",},
                }
            }
            if (startTime && endTime) {
                const start = new Date(startTime).toISOString()
                const end = new Date(endTime).toISOString()
                const newStart = start.split('T')[0] + ' 00:00:00'
                const newEnd = end.split('T')[0] + ' 23:59:59'

                whereOptions = {
                    ...whereOptions,
                    createdAt:{
                        $between: [newStart,newEnd]
                    }
                }
            }

            const contact = await ContactUs.findAll({
                where: whereOptions,
                offset: (+page - 1) * +limit,
                limit: +limit,
            });



            const total = await ContactUs.count({where:whereOptions});
            res.json({
                status: 'ok',
                contact,
                total,
                page: +page,
                totalPages: Math.ceil(total / +limit)
            });

        } catch (e) {
            console.log(e)
            next(e)
        }
    }


    static getHome = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const home = await Home.findOne({
                where: {type: 'home'},
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
                home,
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getVideo = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const video = await Home.findOne({
                where: {type: 'video'},
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
                video,
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getService = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const updatedServiceTranslate = await Home.findOne({
                where: {type: 'service'},
                attributes: ['id', 'image',],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                ],
            });


            res.json({
                status: 'ok',
                updatedServiceTranslate,
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
                whereOptions = {lang: +lang}
            }
            const about = await Home.findOne({
                where: {type: 'about'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const home = await Home.findOne({
                where: {type: 'home'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const video = await Home.findOne({
                where: {type: 'video'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const interested = await Home.findOne({
                where: {type: 'interested'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const carousel = await Home.findAll({
                where: {type: 'car'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const how = await Home.findOne({
                where: {type: 'how'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }]
            })
            const who = await Home.findOne({
                where: {type: 'who'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }, {
                        model: WhoUse,
                        as: 'who_use_translate',
                        where: whereOptions
                    },

                ]
            })
            const member = await Member.findAll({
                attributes: ['id', 'image'],
                include: [
                    {
                        model: MemberTranslate,
                        as: 'member_translate',
                        where: whereOptions
                    }

                ]
            })
            const benefit = await Home.findOne({
                where: {type: 'benefit'},
                attributes: ['id', 'image'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    }, {
                        model: WhoUse,
                        as: 'who_use_translate',
                        where: whereOptions
                    },]
            })
            const contact = await Home.findOne({
                where: {type: 'contact'},
                attributes: ['id'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    },]
            })
            const reviewData = await Home.findOne({
                where: {type: 'review'},
                attributes: ['id'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    },]
            })
            const updatedServiceTranslate = await Home.findOne({
                where: {type: 'service'},
                attributes: ['id', 'image',], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                ],
            });
            const updatedPricingTranslate = await Home.findOne({
                where: {type: 'pricing'},
                attributes: ['id', 'image',], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                ],
            });
            const client = await Home.findOne({
                where: {type: 'client'},
                attributes: ['id'], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                ],
            });
            const dev = await Home.findOne({
                where: {type: 'dev'},
                attributes: ['id'], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                ],
            });
            const clientImages = await Clients.findAll({});
            const service = await Home.findAll({
                where: {type: 'subService'},
                attributes: ['id', 'image',], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                    {
                        model: WhoUse,
                        as: 'who_use_translate',
                        where: whereOptions
                    },
                ],
            });
            const pricing = await Home.findAll({
                where: {type: 'subPricing'},
                attributes: ['id', 'image',], // Include the attributes you need, including 'home_translate'
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions,
                    },
                    {
                        model: WhoUse,
                        as: 'who_use_translate',
                        where: whereOptions
                    },
                ],
            });
            const review = await Reviews.findAll({
                where: whereOptions,
            });

            res.json({
                status: 'ok',
                home,
                carousel,
                interested,
                about,
                clientImages,
                how,
                updatedPricingTranslate,
                pricing,
                client,
                who,
                member,
                reviewData,
                benefit,
                service,
                review,
                contact,
                updatedServiceTranslate,
                video,
                dev
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getContact = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const contact = await Home.findOne({
                where: {type: 'contact'},
                attributes: ['id'],
                include: [
                    {
                        model: HomeTranslate,
                        as: 'home_translate',
                        where: whereOptions
                    },]
            })

            res.json({
                status: 'ok',
                contact,
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static appGet = async (req, res, next) => {
        try {

            const {admin} = req.query

            const image = await Home.findOne({where:{type:'app'}})
            const app = await AppDownload.findAll({where:!admin?{status:1}:{}})


            res.json({
                status: 'ok',
                image,
                app
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getAbout = async (req, res, next) => {
        try {

            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const about = await Home.findOne({
                where: {type: 'about'},
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
                about
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getCrm = async (req, res, next) => {
        try {

            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const crm = await Home.findOne({
                where: {type: 'crm'},
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
                crm
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getCounter = async (req, res, next) => {
        try {

            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const count = await Home.findAll({
                where: {type: 'count'},
                attributes: ['id', 'image','status'],
                include: [
                    {
                        model: Counter,
                        as: 'counter_translate',
                        where: whereOptions
                    }]
            })

            res.json({
                status: 'ok',
                count
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static getCounterSingle = async (req, res, next) => {
        try {

            const {lang,id} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
            const count = await Home.findOne({
                where: {type: 'count',id},
                attributes: ['id', 'image','status'],
                include: [
                    {
                        model: Counter,
                        as: 'counter_translate',
                        where: whereOptions
                    }]
            })

            res.json({
                status: 'ok',
                count
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static image = async (req, res, next) => {
        try {
            const {file} = req
            let avatar

            if (!_.isEmpty(file)) {
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
                await Image.create({path:avatar,})

            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    //------ABOUT IMAGE------//

    static getAboutImage = async (req, res, next) => {
        try {
            const image = await Home.findAll({where:{type:'about',is_image:1}})
            res.json({
                status: 'ok',
                image
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }






}

export default HomeController;

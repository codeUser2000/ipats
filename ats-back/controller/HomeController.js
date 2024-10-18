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
    WhoUse
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
    static createHome = async (req, res, next) => {
        try {
            const {file} = req
            const {
                titleEng,
                descEng,
            } = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            const about = await Home.create({title: titleEng, desc: descEng, image: avatar, type: 'home'})
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
    static editHome = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const {file} = req
            let avatar

            const about = await Home.findOne({where: {id, type: 'home'}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/,extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Home.update({title: titleEng, desc: descEng, image: avatar}, {where: {id, type: 'home'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createAbout = async (req, res, next) => {
        try {
            const {file} = req
            const {
                titleEng,
                descEng,
            } = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            const about = await Home.create({title: titleEng, desc: descEng, image: avatar, type: 'about'})
            for (let langElement of lang) {
                await HomeTranslate.create({
                    blockId: about.id,
                    lang: langElement.id,
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                })
            }
            // if (!_.isEmpty(file)) {
            //     const oldFile = path.join(__dirname, '../public', image.path)
            //     if (fs.existsSync(oldFile) && image.path !== '/uploads/user_image/user_employee.jpg') {
            //         fs.unlinkSync(oldFile)
            //     }
            //     const originalName = file.originalname.replace(/\..+$/, '.jpg');
            //     avatar = path.join('/uploads/user_image', uuidV4() + '-' + originalName);
            //     await imgPromise('../public', file, avatar)
            // }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createVideo = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'video'})
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
    static editAbout = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const {file} = req
            let avatar

            const about = await Home.findOne({where: {id, type: 'about'}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Home.update({title: titleEng, desc: descEng, image: avatar}, {where: {id, type: 'about'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editVideo = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body

            await Home.update({title: titleEng, desc: descEng, image: 'avatar'}, {where: {id, type: 'video'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createInterested = async (req, res, next) => {
        try {
            const {file} = req
            const {
                titleEng,
                descEng,
            } = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/,extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            const about = await Home.create({title: titleEng, desc: descEng, image: avatar, type: 'interested'})
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
    static editInterested = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const {file} = req
            let avatar

            const interested = await Home.findOne({where: {id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', interested.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Home.update({title: titleEng, desc: descEng, image: avatar}, {where: {id: interested.id}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: interested.id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createBigCarousel = async (req, res, next) => {
        try {
            const {file} = req
            const {
                titleEng,
                descEng,
            } = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            const about = await Home.create({title: titleEng, desc: descEng, image: avatar, type: 'car'})
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
    static editBigCarousel = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const {file} = req
            let avatar

            const about = await Home.findOne({where: {id, type: 'car'}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', about.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension
                );
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Home.update({title: titleEng, desc: descEng, image: avatar}, {where: {id, type: 'car'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteBigCarousel = async (req, res, next) => {
        try {
            const {id} = req.body

            const about = await Home.findOne({where: {id}})
            const oldFile = path.join(__dirname, '../public', about.image)
            fs.unlinkSync(oldFile)

            await Home.destroy({where: {id, type: 'car'}})

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createAtsWork = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'how'})
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
    static editAts = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'how'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'how'}})
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


    //----CLIENT-----//
    static createClient = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'client'})
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
    static createClientReview = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
            } = req.body
            const about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'review'})
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
    static createClientImage = async (req, res, next) => {
        try {
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/clients', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            await Clients.create({
                path:avatar
            })
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteClientImage = async (req, res, next) => {
        try {
            const {id} = req.body
            const client = await Clients.findOne({where:{id}})
            const oldFile = path.join(__dirname, '../public', client.path)
            fs.unlinkSync(oldFile)
            await Clients.destroy({where:{id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteReview = async (req, res, next) => {
        try {
            const {id} = req.body
            const client = await Reviews.findAll({where:{translateId:id}})
            const oldFile = path.join(__dirname, '../public', client[0].image)
            fs.unlinkSync(oldFile)
            for (let review of client) {
                await review.destroy()
            }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editClient = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'client'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'client'}})
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
    static editClientReview = async (req, res, next) => {
        try {
            const {id, titleEng, descEng,} = req.body
            const about = await Home.findOne({where: {id, type: 'review'}})
            await Home.update({title: titleEng, desc: descEng,}, {where: {id, type: 'review'}})
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
    static createReview = async (req, res, next) => {
        try {
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/review', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            let num = uuidV4()
            for (let langElement of lang) {
                await Reviews.create({
                    lang:langElement.id,
                    fullName:req.body['fullName'+langElement.lang],
                    translateId:num,
                    company:req.body['company'+langElement.lang],
                    message:req.body['message'+langElement.lang],
                    image:avatar
                })
            }



            // if (!_.isEmpty(file)) {
            //     const oldFile = path.join(__dirname, '../public', image.path)
            //     if (fs.existsSync(oldFile) && image.path !== '/uploads/user_image/user_employee.jpg') {
            //         fs.unlinkSync(oldFile)
            //     }
            //     const originalName = file.originalname.replace(/\..+$/, '.jpg');
            //     avatar = path.join('/uploads/user_image', uuidV4() + '-' + originalName);
            //     await imgPromise('../public', file, avatar)
            // }
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editReview = async (req, res, next) => {
        try {
            const {id} = req.body
            const {file} = req
            let avatar
            const {
                fullNameEng,
                roleEng,
            } = req.body

            const member = await Reviews.findAll({where:{translateId:id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', member[0].image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/review', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }

            for (let review of member) {
                for (let langElement of lang) {
                    await Reviews.update({
                        fullName:req.body['fullName'+langElement.lang],
                        company:req.body['company'+langElement.lang],
                        message:req.body['message'+langElement.lang],
                        image:avatar
                    },{where:{lang:langElement.id,translateId:id}})
                }
            }


            res.json({
                status: 'ok',
            });

        } catch (e) {
            console.log(e)
            next(e)
        }
    }
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
    static createWhoUse = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
                users
            } = req.body

            const exist = await Home.findOne({where: {type: 'who'}})
            let about
            if (!exist) {
                about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'who'})
                for (let langElement of lang) {
                    await HomeTranslate.create({
                        blockId: about.id,
                        lang: langElement.id,
                        title: req.body['title' + langElement.lang],
                        desc: req.body['desc' + langElement.lang]
                    })
                }
                let num
                for (let user of users) {
                    num = uuidV4()
                    for (let langElement of lang) {
                        await WhoUse.create({
                            translateId: num,
                            blockId: about.id,
                            lang: langElement.id,
                            title: user['desc' + langElement.lang],
                        })
                    }
                }
            } else {
                let num
                for (let user of users) {
                    num = uuidV4()
                    if (user.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        for (let langElement of lang) {
                            await WhoUse.create({
                                translateId: num,
                                blockId: exist.id,
                                lang: langElement.id,
                                title: user['desc' + langElement.lang],
                            })
                        }
                    }

                }
            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editWhoUse = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body

            const about = await Home.findOne({where: {id, type: 'who'}})
            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'who'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }


            for (let user of users) {
                for (let langElement of lang) {
                    await WhoUse.update({
                        title: user['desc' + langElement.lang],
                    }, {where: {translateId: user.id, lang: langElement.id, blockId: about.id,}})
                }
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteWhoUse = async (req, res, next) => {
        try {
            const {id} = req.body

            const who = await WhoUse.findAll({where: {translateId: id}})

            for (let whoUse of who) {
                await WhoUse.destroy({where: {translateId: whoUse.translateId}})
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
    static createServices = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
                arr
            } = req.body.form

            const exist = await Home.findOne({where: {type: 'service'}})
            let about
            if (!exist) {
                about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'service'})
                for (let langElement of lang) {
                    await HomeTranslate.create({
                        blockId: about.id,
                        lang: langElement.id,
                        title: req.body.form['title' + langElement.lang],
                        desc: req.body.form['desc' + langElement.lang]
                    })
                }
                let num

                for (let user of arr) {
                    if (user.serviceBlock.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        const h = await Home.create({title: user.serviceBlock.titleEng, image: '', type: 'subService'})
                        for (let langElement of lang) {
                            await HomeTranslate.create({
                                blockId: h.id,
                                lang: langElement.id,
                                title: user.serviceBlock['title' + langElement.lang],
                            })


                        }

                        for (let useElement of user.use) {
                            num = uuidV4()

                            for (let langElement of lang) {
                                await WhoUse.create({
                                    blockId: h.id,
                                    translateId: num,
                                    lang: langElement.id,
                                    title: useElement['desc' + langElement.lang],
                                })
                            }

                        }

                    }
                }
            } else {
                let num
                for (let user of arr) {
                    if (typeof user.serviceBlock.id === 'string' && user.serviceBlock.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        const h = await Home.create({title: user.serviceBlock.titleEng, image: '', type: 'subService'})
                        for (let langElement of lang) {
                            await HomeTranslate.create({
                                blockId: h.id,
                                lang: langElement.id,
                                title: user.serviceBlock['title' + langElement.lang],
                            })

                        }

                        for (let useElement of user.use) {
                            num = uuidV4()
                            for (let langElement of lang) {
                                await WhoUse.create({
                                    blockId: h.id,
                                    translateId: num,
                                    lang: langElement.id,
                                    title: useElement['desc' + langElement.lang],
                                })
                            }


                        }

                    } else {
                        for (let useElement of user.use) {
                            num = uuidV4()
                            if (typeof useElement.id === 'string' && useElement.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                                for (let langElement of lang) {
                                    await WhoUse.create({
                                        blockId: user.serviceBlock.id,
                                        translateId: num,
                                        lang: langElement.id,
                                        title: useElement['desc' + langElement.lang],
                                    })
                                }
                            }
                        }
                    }
                }

            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createPricing = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
                arr
            } = req.body.form

            const exist = await Home.findOne({where: {type: 'pricing'}})
            let about
            if (!exist) {
                about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'pricing'})
                for (let langElement of lang) {
                    await HomeTranslate.create({
                        blockId: about.id,
                        lang: langElement.id,
                        title: req.body.form['title' + langElement.lang],
                        desc: req.body.form['desc' + langElement.lang]
                    })
                }
                let num

                for (let user of arr) {
                    if (user.serviceBlock.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        const h = await Home.create({title: user.serviceBlock.titleEng, image: '', type: 'subPricing'})
                        for (let langElement of lang) {
                            await HomeTranslate.create({
                                blockId: h.id,
                                lang: langElement.id,
                                title: user.serviceBlock['title' + langElement.lang],
                            })


                        }

                        for (let useElement of user.use) {
                            num = uuidV4()

                            for (let langElement of lang) {
                                await WhoUse.create({
                                    blockId: h.id,
                                    translateId: num,
                                    lang: langElement.id,
                                    title: useElement['desc' + langElement.lang],
                                })
                            }

                        }

                    }
                }
            } else {
                let num
                for (let user of arr) {
                    if (typeof user.serviceBlock.id === 'string' && user.serviceBlock.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        const h = await Home.create({title: user.serviceBlock.titleEng, image: '', type: 'subPricing'})
                        for (let langElement of lang) {
                            await HomeTranslate.create({
                                blockId: h.id,
                                lang: langElement.id,
                                title: user.serviceBlock['title' + langElement.lang],
                            })

                        }

                        for (let useElement of user.use) {
                            num = uuidV4()
                            for (let langElement of lang) {
                                await WhoUse.create({
                                    blockId: h.id,
                                    translateId: num,
                                    lang: langElement.id,
                                    title: useElement['desc' + langElement.lang],
                                })
                            }


                        }

                    } else {
                        for (let useElement of user.use) {
                            num = uuidV4()
                            if (typeof useElement.id === 'string' && useElement.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                                for (let langElement of lang) {
                                    await WhoUse.create({
                                        blockId: user.serviceBlock.id,
                                        translateId: num,
                                        lang: langElement.id,
                                        title: useElement['desc' + langElement.lang],
                                    })
                                }
                            }
                        }
                    }
                }

            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editPricing = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body


            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'pricing'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteServices = async (req, res, next) => {
        try {
            const {id} = req.body
            const {type} = req.query
            if (type === 'item') {
                const who = await WhoUse.findAll({where: {translateId: id}})

                for (let whoUse of who) {
                    await WhoUse.destroy({where: {translateId: whoUse.translateId}})
                }
            } else {
                console.log(id)
                await Home.destroy({where: {id}})
            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static createBenefit = async (req, res, next) => {
        try {
            const {
                titleEng,
                descEng,
                users
            } = req.body

            const exist = await Home.findOne({where: {type: 'benefit'}})
            let about
            if (!exist) {
                about = await Home.create({title: titleEng, desc: descEng, image: '', type: 'benefit'})
                for (let langElement of lang) {
                    await HomeTranslate.create({
                        blockId: about.id,
                        lang: langElement.id,
                        title: req.body['title' + langElement.lang],
                        desc: req.body['desc' + langElement.lang]
                    })
                }
                let num
                for (let user of users) {
                    num = uuidV4()
                    for (let langElement of lang) {
                        await WhoUse.create({
                            translateId: num,
                            blockId: about.id,
                            lang: langElement.id,
                            title: user['desc' + langElement.lang],
                        })
                    }
                }
            } else {
                let num
                for (let user of users) {
                    num = uuidV4()
                    if (user.id.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        for (let langElement of lang) {
                            await WhoUse.create({
                                translateId: num,
                                blockId: exist.id,
                                lang: langElement.id,
                                title: user['desc' + langElement.lang],
                            })
                        }
                    }

                }
            }


            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static editBenefit = async (req, res, next) => {
        try {
            const {id, titleEng, descEng, users} = req.body

            const about = await Home.findOne({where: {id, type: 'benefit'}})
            await Home.update({title: titleEng, desc: descEng}, {where: {id, type: 'benefit'}})
            for (let langElement of lang) {
                await HomeTranslate.update({
                    title: req.body['title' + langElement.lang],
                    desc: req.body['desc' + langElement.lang]
                }, {where: {blockId: id, lang: langElement.id,}})
            }


            for (let user of users) {
                for (let langElement of lang) {
                    await WhoUse.update({
                        title: user['desc' + langElement.lang],
                    }, {where: {translateId: user.id, lang: langElement.id, blockId: about.id,}})
                }
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteBenefit = async (req, res, next) => {
        try {
            const {id} = req.body

            const who = await WhoUse.findAll({where: {translateId: id}})

            for (let whoUse of who) {
                await WhoUse.destroy({where: {translateId: whoUse.translateId}})
            }

            res.json({
                status: 'ok',
            });


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
    static getClient = async (req, res, next) => {
        try {
            const {lang} = req.query
            let whereOptions = {}
            if (lang) {
                whereOptions = {lang: +lang}
            }
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
            const clientImages = await Clients.findAll({});

            const review = await Reviews.findAll({
                where: whereOptions,
            });


            res.json({
                status: 'ok',

                clientImages,

                client,

                reviewData,

                review,

            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static app = async (req, res, next) => {
        try {
            const {android,ios,windows,mac,windowsStatus,iosStatus,androidStatus,macStatus} = req.body
            let arr = [
                {link:android,type:'android',status:androidStatus},
                {link:ios,type:'ios',status:iosStatus},
                {link:windows,type:'windows',status:windowsStatus},
                {link:mac,type:'mac',status:macStatus},
            ]
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            await Home.create({title: '', desc: '', image: avatar, type: 'app'})
            for (let arrElement of arr) {
                await AppDownload.create({
                    link:arrElement.link,
                    status:arrElement.status,
                    type:arrElement.type,
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
    static appUpdate = async (req, res, next) => {
        try {
            const {android,ios,windows,mac,windowsStatus,iosStatus,androidStatus,macStatus} = req.body
            let arr = [
                {link:android,type:'android',status:androidStatus},
                {link:ios,type:'ios',status:iosStatus},
                {link:windows,type:'windows',status:windowsStatus},
                {link:mac,type:'mac',status:macStatus},
            ]
            const {file} = req
            let avatar
            const about = await Home.findOne({where:{type:'app'}})
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
            await Home.update({title: '', desc: '', image: avatar,},{where:{ id: about.id}})
            for (let arrElement of arr) {
                await AppDownload.update({
                    link:arrElement.link,
                    status:arrElement.status,
                },{where:{ type:arrElement.type,}})
            }


            res.json({
                status: 'ok',
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

    static createCounter = async (req, res, next) => {
        try {
            const {file} = req
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/home', uuidV4() + '-' + originalName);
            await imgPng('../public', file, avatar)
            const member = await Home.create({title:'',role:'',image:avatar,status:req.body.status,type:'count'})
            for (let langElement of lang) {
                await Counter.create({
                    blockId:member.id,
                    lang:langElement.id,
                    title:req.body['title'+langElement.lang],
                    desc:req.body.desc
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
    static editCounter = async (req, res, next) => {
        try {
            const {id,image} = req.body
            console.log(req.body)
            const {file} = req
            let avatar

            const member = await Home.findOne({where:{id,type:'count'}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', member.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/,extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Home.update({image:avatar,status:req.body.status},{where:{id,type:'count'}})
            for (let langElement of lang) {
                await Counter.update({
                    title:req.body['title'+langElement.lang],
                    desc:req.body.desc
                },{where:{blockId:id,lang:langElement.id,}})
            }

            res.json({
                status: 'ok',
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

    static createAboutImage = async (req, res, next) => {
        try {
            const {file} = req
            const {title} = req.body
            let avatar
            console.log(file)
            if (!_.isEmpty(file)) {
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/home', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
                await Home.create({type:'about',is_image:1,image:avatar,title:title})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteAboutImage = async (req, res, next) => {
        try {
            const {id} = req.query
            const client = await Home.findOne({where:{id}})
            const oldFile = path.join(__dirname, '../public', client.image)
            fs.unlinkSync(oldFile)
            await Home.destroy({where:{id}})
            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
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

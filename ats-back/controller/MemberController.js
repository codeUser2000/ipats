import path from "path";
import fs from "fs";
import _ from "lodash";
import imgPromise from "../services/imgPromise.js";
import {v4 as uuidV4} from 'uuid';
import {Admin, Member, MemberTranslate} from "../models/index.js";
import {lang} from "../services/lang.js";
import HttpError from "http-errors";
const {JWT_SECRET_ACCESS, JWT_SECRET_REFRESH} = process.env;
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class MemberController {
    static create = async (req, res, next) => {
        try {
            const {file} = req
            const {
                fullNameEng,
                roleEng,
                fb,twitter,instagram,linkedIn,googleplus
            } = req.body
            const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

            const originalName = file.originalname.replace(/\..+$/, extension);
            const avatar = path.join('/images/members', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            const member = await Member.create({fullName:fullNameEng,role:roleEng,image:avatar,fb,twitter,instagram,linkedIn,googleplus})
            for (let langElement of lang) {
                await MemberTranslate.create({
                    memberId:member.id,
                    lang:langElement.id,
                    fullName:req.body['fullName'+langElement.lang],
                    role:req.body['role'+langElement.lang]
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
    static edit = async (req, res, next) => {
        try {
            const {id,image} = req.body
            const {file} = req
            let avatar
            const {
                fullNameEng,
                roleEng,
                fb,twitter,instagram,linkedIn,googleplus
            } = req.body

            const member = await Member.findOne({where:{id}})
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', member.image)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const extension = file.mimetype === 'image/png'?'.png': file.mimetype === 'image/avif'  ? '.avif' : '.jpg';

                const originalName = file.originalname.replace(/\..+$/, extension);
                avatar = path.join('/images/members', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }
            await Member.update({fullName:fullNameEng,role:roleEng,image:avatar,fb,twitter,instagram,linkedIn,googleplus},{where:{id}})
            for (let langElement of lang) {
                await MemberTranslate.update({
                    fullName:req.body['fullName'+langElement.lang],
                    role:req.body['role'+langElement.lang]
                },{where:{memberId:id,lang:langElement.id,}})
            }

            res.json({
                status: 'ok',
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    static deleteMember = async (req, res, next) => {
        try {
            const {id} = req.body
            await Member.destroy({where: {id}})
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
            let members
            if(lang){
                members = await Member.findAll({include:[
                        {
                            model:MemberTranslate,
                            as:'member_translate',
                            where:{lang}
                        }
                    ]})
            }else{
                members = await Member.findAll({include:[
                        {
                            model:MemberTranslate,
                            as:'member_translate',
                        }
                    ]})
            }

            res.json({
                status: 'ok',
                members
            });


        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static login = async (req, res, next) => {
        try {
            const {login,password} = req.body
            const user = await Admin.findOne({
                where: {
                    login
                }
            })

            if (!user) {
                throw HttpError(403, 'We dont have such user')
            }

            if (user.status === 0) {
                throw HttpError(403, 'User is not active')
            }


            if (user.getDataValue('password') !== Admin.passwordHash(password)) {
                throw HttpError(403, "Password is wrong");
            }


            const access_token = jwt.sign({userId: user.id}, JWT_SECRET_ACCESS, {expiresIn: '7800000s'});
            const refresh_token = jwt.sign({userId: user.id}, JWT_SECRET_REFRESH);
            res.json({
                status: 'ok',
                access_token,
                refresh_token,
            });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static profile = async (req, res, next) => {
        try {
            const {userId} = req;
            let user = await Admin.findOne({
                where: {id: userId},

            })

            res.json({
                status: 'ok',
                user
            });

        } catch (e) {
            next(e)
        }
    }


}

export default MemberController;

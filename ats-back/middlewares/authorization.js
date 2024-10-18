import jwt from "jsonwebtoken";
import HttpError from "http-errors";
import {Admin} from "../models/index.js";

const {JWT_SECRET_ACCESS} = process.env;
const EXCLUDE = [
    '/login',
    '/member/get',
    '/home/get',
    '/home/contact_us',
    '/users/refresh',
];

export default async function authorization(req, res, next) {
    try {
        const {path, method} = req;

        if (method === 'OPTIONS' || EXCLUDE.includes(path)) {
            next();
            return;
        }
        const token = req.headers.authorization || req.query.token || '';

        let userId;


        try {
            const data = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET_ACCESS);
            userId = data.userId;
        } catch (e) {
            throw HttpError(401, 'Invalid token auth')
        }

        const user = await Admin.findOne({
            where:{id:userId}
        })

        if (!userId|| !user) {
            throw HttpError(401, 'Invalid token')
        }

        req.userId = userId;
        next();
    } catch (e) {
        next(e);
    }
}


import {BlockedIp} from "../models/index.js";
import { rateLimit } from 'express-rate-limit'

async function blockIp(ip) {
    await BlockedIp.create({ip:ip})
}

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 50,
    handler:async (req, res, options) => {
        try {
            await blockIp(req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.remoteAddress);
        } catch (error) {
            console.error('Error blocking IP on limit reached:', error);
        }
    },
    message: 'Too many requests from this IP, please try again later.',
});

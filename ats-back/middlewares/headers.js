export default function headers(req, res, next) {
    try {
        const allow = ['http://localhost:4000','http://localhost:3000','https://5.77.240.221','https://ats.am','http://5.77.240.221:1080','http://ats.am:1080'];
        if (allow.includes(req.headers.origin)) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
            res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your allowed origins
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            // res.setHeader('Access-Control-Allow-Credentials', true);
        }
        next();
    } catch (e) {
        next(e);
    }
}

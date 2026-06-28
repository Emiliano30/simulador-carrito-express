
const ALLOWED_ORIGIN = 'http://localhost:3000';

function corsMiddleware(req, res, next) {
    const origin = req.headers.origin;
    if (origin === ALLOWED_ORIGIN) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
}

module.exports = { corsMiddleware, ALLOWED_ORIGIN };
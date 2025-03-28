const {getUser} = require('../service/auth');

async function checkLoginStatus(req, res, next){
    const token  = req.cookies?.token;

    try {
        const user = getUser(token);
        next();
    } catch (error) {
        return res.status(400).json({"err": `Invalid User!!`});
    }
}

module.exports = checkLoginStatus;
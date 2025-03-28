require('dotenv').config({ path: '../.env' }); 
const jwt = require('jsonwebtoken');

const secretKey = String(process.env.JWT_SECRET);

function setUserSession(user){
    const payload = {
        id: user._id,
        name: user.name,
        email_id: user.email_id,
        phone_number: user.phone_number,
        gender: user.gender,
        designation: user.designation,
        country: user.country,
        profile_photo: user.profile_photo_path
    }
    
    return jwt.sign(payload, secretKey);
}

function getUser(token){
    try{
        return jwt.verify(token, secretKey);
    } catch(err){
        return null;
    }

}

module.exports = {
    getUser,
    setUserSession
}
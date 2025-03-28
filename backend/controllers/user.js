const path = require('path');
require('dotenv').config({ path: '../.env' });

const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');

const USERS = require('../models/user');

const { setUserSession, getUser } = require('../service/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: async (req, file, cb) => {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const token = req.headers.token;
            
            if (!token) {
                return cb(new Error("Token Not Provided!!"), null);
            }

            const user = getUser(token);
            if (!user) {
                return cb(new Error("User Not Found!!"), null);
            }

            const email_id = user.email_id;
            const fileName = `${email_id}.${fileExtension}`;

            cb(null, fileName);

            await USERS.findOneAndUpdate({ email_id }, { $set: { profile_photo_path: fileName } })
                .catch(console.error);
        } catch (error) {
            cb(error, null);
        }
    }
});

const upload = multer({ storage });

const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function handleGetProfilePhoto(req, res) {
    const name = req.query.photo_name;
    try {
        const filePath = path.join(__dirname, `../upload/${name}`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ "err": "Photo not found!!" });
        }

        return res.status(200).sendFile(filePath);
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function handleUserSignup(req, res) {
    try {
        const { name, email_id, password } = req.body;
        if (!name || !email_id || !password)
            return res.status(400).json({ "err": "All fields(Name, Email and password) required." });

        const user = await USERS.findOne({ email_id });
        if (user)
            return res.status(400).json({ "err": "User Already exists with same email id." });

        try {
            bcrypt.hash(password, saltRounds).then(async (hash) => {
                await USERS.create({ name, email_id, password: hash });
                return res.status(200).json({ "res": "User Creater Successfully!!" });
            });
        } catch (err) {
            return res.status(400).json({ "err": err });
        }
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function handleUpdateUserDetails(req, res) {
    const { token, name, phone_number, gender, designation, country } = req.body;

    if (!token || !name || !phone_number || !gender || !designation || !country) {
        return res.status(400).json({ "status": "Error", "msg": "All Fields are required." });
    }

    try {
        const user = getUser(token);
        if (!user) {
            return res.status(400).json({ "status": "Error", "msg": "Invalid Token!!" });
        }

        await USERS.findOneAndUpdate({ email_id: user.email_id },
            { $set: { name: name, phone_number: phone_number, gender: gender, designation: designation, country: country } }
        );

        const user_details = await USERS.findOne({ email_id: user.email_id });
        const user_obj = { "name": user_details.name, "email_id": user_details.email_id, "phone_number": user_details.phone_number, "gender": user_details.gender, "designation": user_details.designation, "country": user_details.country, "profile_photo": user_details.profile_photo_path };
        return res.status(200).json({ "status": "success", "msg": "User Details Updated SuccessFully", "user": user_obj });
    } catch (err) {
        return res.status(400).json({ "status": "Error", "msg": err });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email_id, password } = req.body;
        const user = await USERS.findOne({ email_id });
        if (!user)
            return res.status(400).json({ "err": `Email ${email_id} doesn't exixts.` });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            res.status(400).json({ "err": `Invalid Password.` });

        const token = setUserSession(user);
        res.cookie('token', token);
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function checkUserLoginStatus(req, res) {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ "status": "Error", "msg": "Token Missing." });
    }

    const user = getUser(token);
    if (!user) {
        return res.status(400).json({ "status": "Error", "msg": "Invalid Token!!" });
    }

    try {
        const user_details = await USERS.findOne({ email_id: user.email_id });
        if (!user_details) {
            return res.status(404).json({ status: "Error", msg: "User not found!" });
        }
        const user_obj = { "name": user_details.name, "email_id": user_details.email_id, "phone_number": user_details.phone_number, "gender": user_details.gender, "designation": user_details.designation, "country": user_details.country, "profile_photo": user_details.profile_photo_path };
        return res.status(200).json({ ...user_obj });
    } catch (err) {
        return res.status(400).json({ "status": "Error", "msg": err });
    }
}

async function handleUpdateUserPhoto(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ "status": "Error", "msg": "No File Attached!!" });
        }

        const token = req.headers.token;
            
        if (!token) {
            return res.status(400).json({ "status": "Error", "msg": "No Token Attached!!" });
        }

        const user = getUser(token);
        if (!user) {
            return res.status(400).json({ "status": "Error", "msg": "User Doesn't exists!!" });
        }

        const email_id = user.email_id;
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${email_id}.${fileExtension}`;

        return res.status(200).json({ "status": "Success", "msg": "Photo Uploaded Successfully!!", "fileName": fileName });
    } catch (error) {
        return res.status(500).json({ "status": "Error", "msg": "Internal Server Error!!", "error": error.message });
    }
}

async function handleGetUserDetails(req, res)  {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ status: "Error", msg: "No Token Attached!" });
    }

    try {
        const user = getUser(token);
        if (!user) {
            return res.status(404).json({ status: "Error", msg: "User doesn't exist!" });
        }

        const user_details = await USERS.findOne({ email_id: user.email_id });
        if (!user_details) {
            return res.status(404).json({ status: "Error", msg: "User not found!" });
        }

        const user_obj = { "name": user_details.name, "email_id": user_details.email_id, "phone_number": user_details.phone_number, "gender": user_details.gender, "designation": user_details.designation, "country": user_details.country, "profile_photo": user_details.profile_photo_path };
        return res.status(200).json({ status: "Success", msg: "User details fetched successfully!", user: user_obj });
    } catch (error) {
        console.error("Error in handleRemoveUserPhoto:", error);
        return res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
}

async function handleRemoveUserPhoto(req, res) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ status: "Error", msg: "No Token Attached!" });
    }

    try {
        const user = getUser(token);
        if (!user) {
            return res.status(404).json({ status: "Error", msg: "User doesn't exist!" });
        }

        const userDetails = await USERS.findOne({ email_id: user.email_id });
        if (!userDetails) {
            return res.status(404).json({ status: "Error", msg: "User not found!" });
        }

        if (userDetails.profile_photo_path === 'default_user_image.png') {
            return res.status(400).json({ status: "Error", msg: "User image deosn't exists!" });
        }

        const filePath = path.join(__dirname, '..', 'upload', userDetails.profile_photo_path);

        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            await fs.promises.unlink(filePath);
        } catch (err) {
            if (err.code !== 'ENOENT') { 
                console.error("Error deleting file:", err);
            }
        }

        await USERS.findOneAndUpdate(
            { email_id: user.email_id },
            { $set: { profile_photo_path: 'default_user_image.png' } },
            { new: true }
        );

        return res.status(200).json({ status: "Success", msg: "Profile photo removed successfully!" });

    } catch (error) {
        console.error("Error in handleRemoveUserPhoto:", error);
        return res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
}

module.exports = {
    upload,
    handleGetProfilePhoto,
    handleUserSignup,
    handleUpdateUserDetails,
    handleUserLogin,
    checkUserLoginStatus,
    handleUpdateUserPhoto,
    handleGetUserDetails,
    handleRemoveUserPhoto
}
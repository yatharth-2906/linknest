const express = require('express');
const { upload, handleUserSignup, handleUpdateUserDetails, handleUserLogin, checkUserLoginStatus, handleUpdateUserPhoto, handleGetUserDetails, handleRemoveUserPhoto } = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/')
.post(handleUserSignup)
.put(handleUpdateUserDetails);

userRouter.route('/login')
.get(checkUserLoginStatus)
.post(handleUserLogin);

userRouter.route('/update_photo')
.get(handleGetUserDetails)
.post(upload.single('file'), handleUpdateUserPhoto)
.delete(handleRemoveUserPhoto);

module.exports = userRouter;
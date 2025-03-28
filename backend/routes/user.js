const express = require('express');
const { upload, handleGetProfilePhoto, handleUserSignup, handleUpdateUserDetails, handleUserLogin, checkUserLoginStatus, handleUpdateUserPhoto, handleGetUserDetails, handleRemoveUserPhoto } = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/')
.get(handleGetProfilePhoto)
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
const express = require('express');
const {handleHomePage, handleCreateTree, handleEditTree, handleEditTreeName, handleDeleteTree, handleShowTreeUrls} = require('../controllers/static');

const staticRouter = express.Router();

staticRouter.route('/')
.get(handleHomePage)
.post(handleCreateTree)
.patch(handleEditTree)
.put(handleEditTreeName);

staticRouter.route('/trees')
.post(handleShowTreeUrls)
.delete(handleDeleteTree);

module.exports = staticRouter;
const shortid = require('shortid');

const URLS = require('../models/urls');
const TREES = require('../models/trees');
const USERS = require('../models/user');

const { getUser } = require('../service/auth');

async function handleHomePage(req, res) {
    const token = req.cookie?.token || req.query.token;
    try {
        const user = getUser(token) || null;
        if (!user)
            return res.status(400).json({ "err": `Invalid User.` });

        const email_id = user.email_id;
        const trees = await TREES.find({ email_id });

        return res.status(200).json(trees);
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function handleCreateTree(req, res) {
    try {
        const { token, tree_name } = req.body;

        if(!token || !tree_name)
            return res.status(400).json({ "status": "error", "msg": "All fields required." });

        const user = getUser(token) || null;
        if (!user)
            return res.status(400).json({ "err": "Invalid User." });

        const tree_id = shortid.generate();
        const email_id = user.email_id;
        await TREES.create({ email_id, tree_id, tree_name });

        return res.status(200).json({ tree_id });
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function handleEditTree(req, res) {
    const { token, tree_id, url_name, url_path, task } = req.body;

    const user = getUser(token) || null;
    if (!user)
        return res.status(400).json({ "err": `Invalid User.` });

    const tree = await TREES.findOne({ tree_id });
    if (user.email_id != tree.email_id)
        return res.status(400).json({ "err": `Unauthorized User Access!!` });

    if (task === "ADD") {
        try {
            await URLS.create({ tree_id, url_name, url_path });
            await TREES.findOneAndUpdate(
                { tree_id },
                { $set: { last_updated: new Date() } }
            );
            return res.status(200).json({ "res": "URL Added Successfully." });
        } catch (err) {
            return res.status(400).json({ "err": err });
        }
    }

    if (task === "DELETE") {
        try {
            await URLS.findOneAndDelete({ tree_id, url_name, url_path });
            await TREES.findOneAndUpdate(
                { tree_id },
                { $set: { last_updated: new Date() } }
            );
            return res.status(200).json({ "res": "URL Deleted Successfully!!" });
        } catch (err) {
            return res.status(400).json({ "err": err });
        }
    }
}

async function handleEditTreeName(req, res) {
    const { token, tree_id, new_tree_name } = req.body;

    try {
        const user = getUser(token);
        if (!user) {
            return res.status(400).json({ "err": "Invalid User." });
        }

        const tree = await TREES.findOne({ tree_id });
        if (!tree) {
            return res.status(404).json({ "err": "Tree not found." });
        }

        if (user.email_id !== tree.email_id) {
            return res.status(403).json({ "err": "Unauthorized User Access!" });
        }

        const updatedTree = await TREES.findOneAndUpdate(
            { tree_id },
            { $set: { tree_name: new_tree_name } },
            { new: true }
        );

        return res.status(200).json({ "res": "Tree Name Updated Successfully!", "updatedTree": updatedTree });
    } catch (err) {
        console.error("Error updating tree name:", err);
        return res.status(500).json({ "err": err.message || "Server error, please try again." });
    }
}

async function handleDeleteTree(req, res) {
    const { token, tree_id } = req.body;

    const user = getUser(token) || null;
    if (!user)
        return res.status(400).json({ "err": `Invalid User.` });

    const tree = await TREES.findOne({ tree_id });
    if (!tree)
        return res.status(400).json({ "err": `Tree doesn't exist.` });

    if (user.email_id != tree.email_id)
        return res.status(400).json({ "err": `Unauthorized User Access!!` });

    try {
        await URLS.deleteMany({ tree_id });
        await TREES.deleteOne({ tree_id });
        return res.status(200).json({ "res": "TREE Deleted Successfully!!" });
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

async function handleShowTreeUrls(req, res) {
    const { tree_id } = req.body;

    const tree = await TREES.findOne({ tree_id });
    if (!tree)
        return res.status(400).json({ "err": `Tree doesn't exist.` });

    const user = await USERS.findOne({ email_id: tree.email_id });
    if (!user)
        return res.status(400).json({ "err": `User doesn't exist.` });
    try {
        const urls = await URLS.find({ tree_id });
        return res.status(200).json({ urls, "tree_name": tree.tree_name, "user_name": user.name });
    } catch (err) {
        return res.status(400).json({ "err": err });
    }
}

module.exports = {
    handleHomePage,
    handleCreateTree,
    handleEditTree,
    handleEditTreeName,
    handleDeleteTree,
    handleShowTreeUrls
};
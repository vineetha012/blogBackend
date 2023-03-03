const express = require('express')
const router = express.Router()
const middleware = require('./middleware')
const blogModel = require('../models/blogModel')
const registerUser = require('../models/userSchema')
router.post('/', middleware, async (req, res) => {
    try {
        console.log("req from post blog", req.user)
        console.log(req.body)
        let { title, Image, Description } = req.body
        let date = new Date
        let originaldate = date.toLocaleString().split(",")
        const newBlog = await blogModel.create({
            title, Image, Description,
            created_at: originaldate[0],
            userref: req.user.id
        })
        res.json({
            message: "successfully added blog",
            newBlog: newBlog, status: "success"
        })
    } catch (error) {
        res.json({
            error: error,
            status: "failed"
        })
    }
})
router.get('/', middleware, async (req, res) => {
    try {
        console.log("req.user.id from get",req.user.id)
        let exist = await registerUser.findById((req.user.id)) //from middleware
        if (!exist) {
            return res.status(400).send('user not found')
        }
        let userref = req.user.id
        const allBlogs = await blogModel.find({ userref: userref })
        return res.json({
            username: exist.username,
            allBlogs
        })
    } catch (error) {
        return res.json(error)
    }
})
router.put('/put/:id', async (req, res) => {
    try {
        let id = req.params.id, comment = req.body.comment
        const blog = await blogModel.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
        // console.log(blog)
        res.json(blog)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router

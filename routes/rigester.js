const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const Users = require('../models/userSchema')

router.use(express.json())

router.post('/',
    body('email').isEmail()
    , async (req, res) => {
        try {
            console.log(req.body);
            const errors=validationResult(req)
            if(!errors.isEmpty){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const {email,password}=req.body
            let user_exist=await Users.findOne({email:email})
            if(user_exist){
                return res.status(400).json({
                    status:'registration Failed',
                    message:'Email is Already Existed',
                  

                })
            }
            bcrypt.hash(password,10,async function(err, hash){
                if(err){
                    return res.status(500).json({
                        error:err.message
                    })
                }
                if(hash){
                    let newUser=await Users.create({
                        email,
                        password:hash
                    })
                }
                return res.status(201).json({
                    status: "Success",
                    message: "User registered successfully"
                })
            })
        } catch (error) {
            return res.status(500).json({
                error: e.message
            })
        }
    }
)










module.exports = router
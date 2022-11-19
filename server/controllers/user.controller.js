const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async(req, res) => {
        try{
            const newUser = await User.create(req.body)
        
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email}, SECRET)

            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser})
        }catch(error){
            res.status(400).json(error)
        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({error:"Invalid email/password"})
            return
        }
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            console.log(isPasswordValid)
            if(!isPasswordValid) {
                res.status(400).json({error:"Invalid email/password"})
            }else{
                const userToken = jwt.sign({_id:user._id, email:user.email}, SECRET)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user})
            }
        }catch(error){
            res.status(400).json({error:"Invalid email/password"})
        }
    },

    getAllUsers: (req, res) => {
        User.find()
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    },

    getLogged: async (req, res) => {
        try {
            const user = jwt.verify(req.cookies.userToken, SECRET);
            const currentUser = await User.findOne({ _id: user._id });
            res.json(currentUser);
        } catch (error) {
            res.status(400).json({ errors: 'failed to get logged in user' })
        }
    },

    getOneUser:(req, res)=> {
        User.findById(req.params.id)
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    },

    updateUser:(req, res)=>{
        User.updateOne({_id:req.params.id}, req.body, {runValidators:true, new:true})
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    }, 

    deleteUser:(req, res)=>{
        User.deleteOne({_id:req.params.id})
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    },

    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({success:'User logged out'})
    }
}

// expires: new Date(Date.now() + 1200000)
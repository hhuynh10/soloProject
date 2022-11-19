const Pokemon = require('../models/pokemon.model');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY

module.exports = {
    getAllPokemons: (req, res) => {
        Pokemon.find()
        .populate('creator', 'username')
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    },

    getOnePokemon:(req, res)=> {
        Pokemon.findById(req.params.id)
        .populate('creator', 'username')
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    },

    addPokemon:(req, res)=> {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        Pokemon.create({ ...req.body, creator: user })
        .then((result)=> {
            console.log(result)
            res.json(result)
        }).catch((err)=> {
            console.log('bad')
            res.status(400).json(err)
        })
    },

    updatePokemon:(req, res)=>{
        Pokemon.updateOne({_id:req.params.id}, req.body, {runValidators:true, new:true})
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    }, 

    deletePokemon:(req, res)=>{
        Pokemon.deleteOne({_id:req.params.id})
        .then((result)=> {
            res.json(result)
        }).catch((err)=> {
            res.status(400).json(err)
        })
    }
}
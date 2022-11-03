const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 character long"],
        unique: true
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        minLength: [3, "Type must be at least 3 character long"]
    },
    generation: {
        type: String,
        enum: {
            values: ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6', 'Gen 7', 'Gen 8'],
            message: 'Please select a generation'
        }
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 character long"]
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
    }

}, {timestamps:true});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

PokemonSchema.plugin(uniqueValidator)

module.exports = Pokemon;
const PokemonController = require('../controllers/pokemon.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/allPokemons', PokemonController.getAllPokemons);
    app.get('/api/pokemon/:id', PokemonController.getOnePokemon);
    app.post('/api/addPokemon', PokemonController.addPokemon);
    app.put('/api/update/:id', PokemonController.updatePokemon);
    app.delete('/api/delete/:id', PokemonController.deletePokemon);
}
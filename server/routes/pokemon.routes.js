const PokemonController = require('../controllers/pokemon.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/allPokemons', authenticate, PokemonController.getAllPokemons);
    app.get('/api/pokemon/:id', authenticate, PokemonController.getOnePokemon);
    app.post('/api/addPokemon', authenticate, PokemonController.addPokemon);
    app.put('/api/update/:id', authenticate, PokemonController.updatePokemon);
    app.put('/api/obtain/:id', authenticate, PokemonController.obtainPokemon);
    app.delete('/api/delete/:id', authenticate, PokemonController.deletePokemon);
}
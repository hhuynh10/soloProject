import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/User/Register';
import Login from './components/User/Login';
import Home from './components/NavBar/Home';
import AddPokemon from './components/Pokemon/AddPokemon';
import ViewPokemon from './components/Pokemon/ViewPokemon';
import EditPokemon from './components/Pokemon/EditPokemon';
import Room from './components/NavBar/Room';
import About from './components/NavBar/About';
import ViewUser from './components/User/ViewUser';
import AllUsers from './components/User/AllUsers';
import EditUser from './components/User/EditUser';
import LoggedUser from './components/User/LoggedUser';
import Generation from './components/Pokemon/Generation';
import PokemonType from './components/Pokemon/PokemonType';
import Creator from './components/Pokemon/Creator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/liveChat" element={<Room />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addPokemon" element={<AddPokemon />} />
          <Route path="/viewPokemon/:id" element={<ViewPokemon />} />
          <Route path="/gen/:num" element={<Generation />} />
          <Route path="/:type" element={<PokemonType />} />
          <Route path="/pokemonCreator/:creator" element={<Creator />} />
          <Route path="/editPokemon/:id" element={<EditPokemon />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/viewUser/:id" element={<ViewUser />} />
          <Route path="/loggedUser/:id" element={<LoggedUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

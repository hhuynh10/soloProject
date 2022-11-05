import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddPokemon from './components/AddPokemon';
import ViewPokemon from './components/ViewPokemon';
import EditPokemon from './components/EditPokemon';
import Room from './components/Room';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/liveChat" element={<Room />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addPokemon" element={<AddPokemon />} />
          <Route path="/viewPokemon/:id" element={<ViewPokemon />} />
          <Route path="/editPokemon/:id" element={<EditPokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

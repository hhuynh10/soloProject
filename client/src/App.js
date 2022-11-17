import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/liveChat" element={<Room />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addPokemon" element={<AddPokemon />} />
          <Route path="/viewPokemon/:id" element={<ViewPokemon />} />
          <Route path="/editPokemon/:id" element={<EditPokemon />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/viewUser/:id" element={<ViewUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

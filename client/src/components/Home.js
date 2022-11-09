import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import Swal from 'sweetalert2'

const Home = () => {

    const [pokemon, setPokemon] = useState([])

    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    const [socket] = useState(() => io(':8000'));

    const sortPokemon = [...pokemon].sort((a, b) =>
    a.generation > b.generation ? 1 : -1
    );

    

    useEffect(()=>{
        console.log('use effect')
        axios.get('http://localhost:8000/api/allPokemons', {withCredentials:true})
        .then((res)=> {
            console.log(res)
            setPokemon(res.data)
        }).catch((err)=> {
            console.log(err)
        })
        
        socket.on('pokemonDeleted', (payload)=>{
            deletePokemon(payload)
        })
        
        return () => {socket.disconnect(true)
        console.log('unmounted')
        }
    }, [])

    const deletePokemon =([id, name])=>{
        // const filterPokemon = pokemon.filter((pokemon)=>(pokemon._id !== id))
        // console.log(filterPokemon)
        setPokemon(filterPokemon =>{
            return filterPokemon.filter((pokemon)=>(pokemon._id !== id))
        })
        
        Swal.fire({
            title: 'Deleted!',
            text: `${name} has been deleted from the Library!`,
            icon: 'success',
            background: 'antiquewhite'
        })
        }

    const deleteHandler = (id, name) =>{
        console.log('deleting pokemon')
        socket.emit('deletePokemon', [id, name])
        // axios.delete(`http://localhost:8000/api/delete/${id}`, {withCredentials:true})
        // .then((res)=> {
        //     console.log(res)
        //     const filterPokemon = pokemon.filter((pokemon)=>(pokemon._id !== id))
        //     setPokemon(filterPokemon)
        // }).catch((err)=> {
        //     console.log(err)
        // })
    }

    const logout = (e)=>{
        axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        .then((res)=> {
            console.log('logged out')
            navigate('/')
        }).catch((err)=> {
            console.log(err)
        })
    }

    return (
        <div style={{backgroundImage:`url(https://i.imgur.com/JNbrYMq.jpeg)`, backgroundSize: 'contain', backgroundRepeat: 'repeat'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                <h1 className="text-light ms-5">Pokemon Library</h1>
                    <Link to="/home" className="text-success fs-5 ms-5 edit">Home</Link>
                    <Link to="/about" className="text-success fs-5 ms-4 edit">About</Link>
                    <Link to="/liveChat" className="text-success fs-5 ms-4 edit">Join our live chat! </Link>
                    <input type='text' className='form-control ms-4 search' placeholder='search Pokemon name...' onChange={e => {setSearchTerm(e.target.value)}} />
                </div>
                <div className='me-5 d-flex align-items-center'>
                    <Link to="/addPokemon" className="text-success fs-5 me-4 edit">Add your Pokemon here! </Link>
                    <Link to="/" className="text-success me-4 edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className="col-8 mx-auto mt-2"style={{height:'auto', minBlockSize: '800px'}}>
                <h2 className='text-dark'>Pokemon list:</h2>
                <table className="table table-hover text-dark border border-dark">
                <thead className='text-dark fs-5'>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Generation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                sortPokemon.filter((pokemon)=>{
                    if (searchTerm === ''){
                        return pokemon
                    } else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return pokemon
                    }
                }).map((pokemon)=>(
                    <tr className='rowStyle'>
                        <td className="fs-5"><Link to={`/viewPokemon/${pokemon._id}`} className="text-dark">{pokemon.name}</Link></td>
                        <td><button className={`${pokemon.type === "Bug" && "btn text-light bug"}
                                                ${pokemon.type === "Dark" && "btn text-light dark"}
                                                ${pokemon.type === "Dragon" && "btn text-light dragon"}
                                                ${pokemon.type === "Electric" && "btn text-light electric"}
                                                ${pokemon.type === "Fairy" && "btn text-light fairy"}
                                                ${pokemon.type === "Fighting" && "btn text-light fighting"}
                                                ${pokemon.type === "Fire" && "btn text-light fire"}
                                                ${pokemon.type === "Flying" && "btn text-light flying"}
                                                ${pokemon.type === "Grass" && "btn text-light grass"}
                                                ${pokemon.type === "Ghost" && "btn text-light ghost"}
                                                ${pokemon.type === "Ground" && "btn text-light ground"}
                                                ${pokemon.type === "Ice" && "btn text-light ice"}
                                                ${pokemon.type === "Normal" && "btn text-light normal"}
                                                ${pokemon.type === "Poison" && "btn text-light poison"}
                                                ${pokemon.type === "Psychic" && "btn text-light psychic"}
                                                ${pokemon.type === "Water" && "btn text-light water"}
                                                ${pokemon.type === "Rock" && "btn text-light rock"}
                                                ${pokemon.type === "Steel" && "btn text-light steel"}
                                                `}>{pokemon.type}</button></td>
                        <td className="text-dark fs-5">{pokemon.generation}</td>
                        <td><button className="btn btn-outline-success mt-1 me-1"><Link className="edit" to={`/editPokemon/${pokemon._id}`}>Edit</Link></button> <button className='btn btn-outline-danger mt-1' onClick={(e)=>deleteHandler(pokemon._id, pokemon.name)}>Delete</button></td>
                    </tr>
                ))
            }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Home
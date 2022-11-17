import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {io} from 'socket.io-client'
import Swal from 'sweetalert2'

const Home = () => {

    const [pokemon, setPokemon] = useState([])

    const [user, setUser] = useState([])

    const {id} = useParams()

    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    const [socket] = useState(() => io(':8000'));

    const sortPokemon = [...pokemon].sort((a, b) =>
    a.name > b.name ? 1 : -1
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
        <div style={{backgroundColor: 'antiquewhite'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Pokemon Library</h1>
                        <Link to="/home" className="text-success fs-5 ms-5 edit">Home</Link>
                        <Link to="/about" className="text-success fs-5 ms-4 edit">About</Link>
                        <Link to="/liveChat" className="text-success fs-5 ms-4 edit">Live chat! </Link>
                        <Link to="/users" className="text-success fs-5 ms-4 edit">Members </Link>
                        <input type='text' className='form-control search ms-4' placeholder='search Pokemon name...' onChange={e => {setSearchTerm(e.target.value)}} />
                    </div>
                    <div className='me-5 d-flex align-items-center'>
                        <Link to="/addPokemon" className="text-success fs-5 me-4 edit">Add your Pokemon here! </Link>
                        <Link to="/" className="text-success me-4 edit fs-5" onClick={logout}>Logout</Link>
                        <Link to='/'><img className='user-img bg-success' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/></Link> 
                    </div>
                </div>
            <h1>Hi {user.username}</h1>
            <div className="mx-auto mt-2"style={{minBlockSize: '800px'}}>
                <table className='mx-auto border border-dark border-2 col-11 pe-3 ps-3 pb-3 home-display'>
                {
                sortPokemon.filter((pokemon)=>{
                    if (searchTerm === ''){
                        return pokemon
                    } else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return pokemon
                    }
                }).map((pokemon)=>(
                    <div className='mx-auto mt-3'>
                        <img src={pokemon.image} className="pokemon-img"/>
                        <h5 className="fs-5"><Link to={`/viewPokemon/${pokemon._id}`} className="text-dark">{pokemon.name}</Link></h5>
                        <p><button className="btn btn-outline-success mt-1 me-1"><Link className="edit" to={`/editPokemon/${pokemon._id}`}>Edit</Link></button> <button className='btn btn-outline-danger mt-1' onClick={(e)=>deleteHandler(pokemon._id, pokemon.name)}>Delete</button></p>
                    </div>
                ))
            }
                </table>
            </div>
        </div>
    )
}

export default Home
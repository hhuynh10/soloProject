import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import swal from 'sweetalert';

const Home = () => {

    const [pokemon, setPokemon] = useState([])

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
        swal(`${name} has been deleted from the Library!`)
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
        <div style={{backgroundImage:`url(https://i.imgur.com/JNbrYMq.jpeg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Welcome!</h1>
                    <Link to="/liveChat" className="text-success fs-5 ms-5 edit">Join our live chat! </Link>
                </div>
                <div className='me-5 mt-2'>
                    <Link to="/addPokemon" className="text-success fs-5 me-5 edit">Add your Pokemon here! </Link>
                    <Link to="/" className="text-success edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className="col-8 mx-auto mt-2"style={{height:'auto'}}>
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
                sortPokemon.map((pokemon)=>(
                    <tr>
                        <td className="text-dark fs-5"><Link to={`/viewPokemon/${pokemon._id}`} className="text-success">{pokemon.name}</Link></td>
                        <td><button className='btn text-dark'>{pokemon.type}</button></td>
                        <td className="text-dark fs-5">{pokemon.generation}</td>
                        <td><button className='btn btn-danger mt-1' onClick={(e)=>deleteHandler(pokemon._id, pokemon.name)}>Delete</button></td>
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
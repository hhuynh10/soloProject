import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {

    const [pokemon, setPokemon] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allPokemons', {withCredentials:true})
        .then((res)=> {
            console.log(res)
            setPokemon(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const deleteHandler = (id) =>{
        axios.delete(`http://localhost:8000/api/delete/${id}`, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            const filterPokemon = pokemon.filter((pokemon)=>(pokemon._id !== id))
            setPokemon(filterPokemon)
        }).catch((err)=> {
            console.log(err)
        })
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
                <h1 className="text-light ms-5">Welcome!</h1>
                <div className='me-5 mt-2'>
                    <Link to="/addPokemon" className="text-success fs-5 me-5 edit">Add your Pokemon here! </Link>
                    <Link to="/" className="text-success edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className="col-8 mx-auto mt-2"style={{height:'auto'}}>
                <h3 className='text-dark'>Pokemon list:</h3>
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
                pokemon.map((pokemon)=>(
                    <tr>
                        <td className="text-dark fs-5"><Link to={`/viewPokemon/${pokemon._id}`} className="text-success">{pokemon.name}</Link></td>
                        <td className="text-dark fs-5">{pokemon.type}</td>
                        <td className="text-dark fs-5">{pokemon.generation}</td>
                        <td><button className='btn btn-danger mt-1' onClick={(e)=>deleteHandler(pokemon._id)}>Delete</button></td>
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
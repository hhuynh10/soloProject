import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = () => {

    const [pokemon, setPokemon] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allPokemons')
        .then((res)=> {
            console.log(res)
            setPokemon(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const deleteHandler = (id) =>{
        axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then((res)=> {
            console.log(res)
            const filterPokemon = pokemon.filter((pokemon)=>(pokemon._id !== id))
            setPokemon(filterPokemon)
        }).catch((err)=> {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <h1 className="text-light ms-5">Welcome!</h1>
                <Link to="/addPokemon" className="me-5 mt-3 text-info fs-6">Add your Pokemon here! </Link>
            </div>
            <div className="col-8 mx-auto mt-2">
                <h3>Pokemon list:</h3>
                <table className="table table-hover">
                <thead>
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
                        <td className="text-dark fs-3"><Link to={`/viewPokemon/${pokemon._id}`} className="text-info">{pokemon.name}</Link></td>
                        <td className="text-dark fs-3">{pokemon.type}</td>
                        <td className="text-dark fs-3">{pokemon.generation}</td>
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
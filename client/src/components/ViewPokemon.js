import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const ViewPokemon = () => {
    
    const [pokemon, setPokemon] = useState({})

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pokemon/${id}`, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            setPokemon(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <div className="mt-3 col-6 mx-auto">
                <img src={pokemon.image} className="col-8 border border-dark border-4 mb-2"/>
                <p>Name: {pokemon.name}</p>
                <p>Type: {pokemon.type}</p>
                <p>{pokemon.generation}</p>
                <p>{pokemon.description}</p>
                <button className="btn btn-info"><Link className="edit" to={`/editPokemon/${pokemon._id}`}>Edit</Link></button>
            </div>
        </div>
    )
}

export default ViewPokemon

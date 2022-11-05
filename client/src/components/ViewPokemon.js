import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const ViewPokemon = () => {
    
    const [pokemon, setPokemon] = useState({})

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pokemon/${id}`,{withCredentials:true})
        .then((res)=> {
            console.log(res)
            setPokemon(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

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
        <div style={{backgroundImage:`url(https://i.imgur.com/51AGRqe.png)`,
        backgroundSize: 'cover'}}>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <h1 className="text-light ms-5">Welcome!</h1>
                <div className='me-5 mt-2'>
                    <Link to="/home" className="text-success fs-5 me-5 edit">Back to Home </Link>
                    <Link to="/" className="text-success edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div style={{height:'700px'}}>
                <table className='border border-dark border-3 fs-5 mx-auto mt-4 col-6 viewTable'>
                    <img src={pokemon.image} className="col-5 mb-2 mt-4 bg-dark"/>
                    <p>Name: {pokemon.name}</p>
                    <p>Type: {pokemon.type}</p>
                    <p>{pokemon.generation}</p>
                    <p className='mx-3'>{pokemon.description}</p>
                    <button className="btn btn-success mb-4"><Link className="edit" to={`/editPokemon/${pokemon._id}`}>Edit</Link></button>
                </table>
            </div>
        </div>
    )
}

export default ViewPokemon

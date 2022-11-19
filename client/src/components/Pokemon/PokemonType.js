import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PokemonType = () => {

    const [pokemon, setPokemon] = useState([])

    const navigate = useNavigate()

    const {type} = useParams()

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allPokemons', {withCredentials:true})
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
        <div style={{backgroundColor: 'antiquewhite'}}>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Pokemon Library</h1>
                        <Link to="/home" className="text-success fs-5 ms-5 edit">Home</Link>
                        <Link to="/about" className="text-success fs-5 ms-4 edit">About</Link>
                        <Link to="/liveChat" className="text-success fs-5 ms-4 edit">Live chat! </Link>
                        <Link to="/users" className="text-success fs-5 ms-4 edit">Members </Link>
                    </div>
                    <div className='me-5 d-flex align-items-center'>
                        <Link to="/addPokemon" className="text-success fs-5 me-4 edit">Add your Pokemon here! </Link>
                        <Link to="/" className="text-success me-4 edit fs-5" onClick={logout}>Logout</Link>
                    </div>
                </div>
                <h2 className='mt-3 mb-3'>Pokemon with {type} type</h2>
                <div className="mx-auto mt-2"style={{minBlockSize: '800px'}}>
                    <table className='mx-auto border border-dark border-4 col-9 pe-3 ps-3 pb-3 home-display'>
                        {
                            pokemon.filter( pokemon => pokemon.type.includes(type))
                            .map((pokemon)=>(
                                <div className='mx-auto mt-3'>
                                    <Link to={`/viewPokemon/${pokemon._id}`}><img src={pokemon.image} className="pokemon-img"/></Link>
                                    <h5 className="fs-4"><Link to={`/viewPokemon/${pokemon._id}`} className="text-dark">{pokemon.name}</Link></h5>
                                    <p><button className={`${pokemon.type == pokemon.type && `btn btn-sm text-light ${pokemon.type}`}`}><Link className="edit-one" to={`/${pokemon.type}`}>{pokemon.type}</Link></button></p>
                                    <p>Added by {pokemon.creator?.username}</p>
                                </div>
                            ))
                        }
                    </table>
                </div>
        </div>
    )
}

export default PokemonType
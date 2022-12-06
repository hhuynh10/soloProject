import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Home = () => {

    const [pokemon, setPokemon] = useState([])

    const [currentUser, setCurrentUser] = useState([])

    const {id} = useParams()

    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    const sortPokemon = [...pokemon].sort((a, b) =>
    a.name > b.name ? 1 : -1
    );

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/currentUser/${id}`,{withCredentials:true})
        .then((res)=> {
            console.log(res)
            setCurrentUser(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

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
        <div style={{backgroundColor: 'antiquewhite'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Pokemon Library</h1>
                        <Link to="/home" className="text-success fs-5 ms-5 edit animation">Home</Link>
                        <Link to="/about" className="text-success fs-5 ms-4 edit animation">About</Link>
                        <Link to="/liveChat" className="text-success fs-5 ms-4 edit animation">Live chat! </Link>
                        <Link to="/users" className="text-success fs-5 ms-4 edit animation">Members </Link>
                        <input type='text' className='form-control search ms-4' placeholder='search Pokemon name...' onChange={e => {setSearchTerm(e.target.value)}} />
                    </div>
                    <div className='me-5 d-flex align-items-center'>
                        <Link to="/addPokemon" className="text-success fs-5 me-4 edit animation">Add a Pokemon! </Link>
                        <Link to="/" className="text-success me-4 edit fs-5 animation" onClick={logout}>Logout</Link>
                        <Link to={`/loggedUser/${currentUser._id}`}><img className='user-img bg-success animation' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/></Link> 
                    </div>
                </div>
            <h1 className='mt-4 mb-4'>Welcome to Our Pokemon Library, <Link to={`/loggedUser/${currentUser._id}`} className='text-success edit' >{currentUser.username}</Link>!</h1>
            <div className="mx-auto mt-2"style={{minBlockSize: '800px'}}>
                <table className='mx-auto border border-dark border-4 col-9 pe-3 ps-3 pb-3 home-display'>
                {
                sortPokemon.filter((pokemon)=>{
                    if (searchTerm === ''){
                        return pokemon
                    } else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return pokemon
                    }
                }).map((pokemon)=>(
                    <div className='mx-auto mt-3'>
                        <Link to={`/viewPokemon/${pokemon._id}`}><img src={pokemon.image} className="pokemon-img"/></Link>
                        <h5 className="fs-4"><Link to={`/viewPokemon/${pokemon._id}`} className="text-dark">{pokemon.name}</Link></h5>
                        <p><button className={`${pokemon.type == pokemon.type && `btn btn-sm text-light ${pokemon.type}`}`}><Link className="edit-one" to={`/${pokemon.type}`}>{pokemon.type}</Link></button></p>
                        <p><Link className='edit text-dark' to={`/pokemonCreator/${pokemon.creator?.username}`}>Added by {pokemon.creator?.username}</Link></p>
                    </div>
                ))
            }
                </table>
            </div>
        </div>
    )
}

export default Home



                                                        // ${pokemon.type === "Bug" && "btn text-light bug"}
                                                        // ${pokemon.type === "Dark" && "btn text-light dark"}
                                                        // ${pokemon.type === "Dragon" && "btn text-light dragon"}
                                                        // ${pokemon.type === "Electric" && "btn text-light electric"}
                                                        // ${pokemon.type === "Fairy" && "btn text-light fairy"}
                                                        // ${pokemon.type === "Fighting" && "btn text-light fighting"}
                                                        // ${pokemon.type === "Fire" && "btn text-light fire"}
                                                        // ${pokemon.type === "Flying" && "btn text-light flying"}
                                                        // ${pokemon.type === "Grass" && "btn text-light grass"}
                                                        // ${pokemon.type === "Ghost" && "btn text-light ghost"}
                                                        // ${pokemon.type === "Ground" && "btn text-light ground"}
                                                        // ${pokemon.type === "Ice" && "btn text-light ice"}
                                                        // ${pokemon.type === "Normal" && "btn text-light normal"}
                                                        // ${pokemon.type === "Poison" && "btn text-light poison"}
                                                        // ${pokemon.type === "Psychic" && "btn text-light psychic"}
                                                        // ${pokemon.type === "Water" && "btn text-light water"}
                                                        // ${pokemon.type === "Rock" && "btn text-light rock"}
                                                        // ${pokemon.type === "Steel" && "btn text-light steel"}
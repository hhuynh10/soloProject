import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom';

const LoggedUser = () => {

    const [currentUser, setCurrentUser] = useState([])

    const [pokemon, setPokemon] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()

    const sortPokemon = [...pokemon].sort((a, b) =>
    a.name > b.name ? 1 : -1
    );

    const getTime = (e) => {
        let date = new Date(e).toLocaleDateString()
        return date
    }

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

    const deleteHandler = (id) =>{
        axios.delete(`http://localhost:8000/api/deleteUser/${id}`, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            navigate('/')
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
        <div style={{backgroundImage:`url(https://i.imgur.com/ytzcMBW.png)`, backgroundSize: 'cover'}}>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Pokemon Library</h1>
                        <Link to="/home" className="text-success fs-5 ms-5 edit animation">Home</Link>
                        <Link to="/about" className="text-success fs-5 ms-4 edit animation">About</Link>
                        <Link to="/liveChat" className="text-success fs-5 ms-4 edit animation">Live chat! </Link>
                        <Link to="/users" className="text-success fs-5 ms-4 edit animation">Members </Link>
                    </div>
                    <div className='me-5 d-flex align-items-center'>
                        <Link to="/addPokemon" className="text-success fs-5 me-4 edit animation">Add a Pokemon!</Link>
                        <Link to="/" className="text-success me-4 edit fs-5 animation" onClick={logout}>Logout</Link>
                    </div>
                </div>
            <div style={{height:'800px'}}>
            <table className='border border-dark border-3 fs-5 mx-auto mt-5 col-6 viewTable'>
                    <h3 className='mt-4'>Hi {currentUser.username}, this is your account:</h3>
                    <p>Username: <span className='name'>{currentUser.username}</span></p>
                    <p>Email: <span className='name'>{currentUser.email}</span></p>
                    <p>Member since: {getTime(currentUser.createdAt)}</p>
                    <p className='mb-4'><button className='btn btn-success'><Link className="edit-one" to={`/editUser/${currentUser._id}`}>Edit</Link></button> <button className='btn btn-danger' onClick={(e)=>deleteHandler(currentUser._id)} >Delete</button></p>
                    <hr className='col-9 mx-auto'></hr>
                    <h5>Your Pokemon:</h5>
                    <ScrollToBottom className='scroll-user'>
                        <div className='d-flex flex-wrap'>
                            {
                                    sortPokemon.filter( pokemon => pokemon.creator?.username.includes(currentUser.username))
                                    .map((pokemon)=>(
                                        <div className='mx-auto mt-3'>
                                            <Link to={`/viewPokemon/${pokemon._id}`}><img src={pokemon.image} className="pokemon-img-user mx-4"/></Link>
                                            <h5 className="fs-5"><Link to={`/viewPokemon/${pokemon._id}`} className="text-dark">{pokemon.name}</Link></h5>
                                            <p><button className={`${pokemon.type == pokemon.type && `btn btn-sm-user text-light ${pokemon.type}`}`}><Link className="edit-one" to={`/${pokemon.type}`}>{pokemon.type}</Link></button></p>
                                        </div>
                                    ))
                                }
                        </div>
                    </ScrollToBottom>
                    <hr className='col-9 mx-auto'></hr>
                </table>
            </div>
        </div>
    )
}

export default LoggedUser
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {io} from 'socket.io-client'
import Swal from 'sweetalert2'

const ViewPokemon = () => {

    const [currentUser, setCurrentUser] = useState([])
    
    const [feed, setFeed] = useState(0)
    
    const [pokemon, setPokemon] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()

    const [socket] = useState(() => io(':8000'));

    const message = [
            "Thank you for feeding me!",
            "Yummmm!!!",
            "You're the best!",
            "Thank you trainer!",
            "Feed me more berries!",
            "You're too kind!",
            "Thanks for those yummy berries!",
            "I want more!!!",
            "Delicious!!!",
            "Love you to the fridge and back!"]
        
    
    const feedPokemon = () => {
        if (feed < 5){
            setFeed(feed + 1)
            for (let i = 0; i < message.length+1; i++){
                let randomMessage = message[Math.floor(i * Math.random())]
                Swal.fire({
                    title: randomMessage,
                    width: 600,
                    padding: '2.5em',
                    background: 'antiquewhite url()',
                    backdrop: `
                    rgba(74, 17, 13, 0.4)
                    url(${pokemon.image})
                    left bottom
                    no-repeat
                    `
                })
            }
        } else {
            Swal.fire({
                title: 'I am full!',
                background: 'antiquewhite url()'
            })
        }
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pokemon/${id}`,{withCredentials:true})
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

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/currentUser/${id}`,{withCredentials:true})
        .then((res)=> {
            console.log(res)
            setCurrentUser(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const deletePokemon =([id, name])=>{
        // const filterPokemon = pokemon.filter((pokemon)=>(pokemon._id !== id))
        // console.log(filterPokemon)
        setPokemon(filterPokemon =>{
            return filterPokemon.filter((pokemon)=>(pokemon._id !== id))
        })
        }

        const deleteHandler = (id, name) =>{
            console.log('deleting pokemon')
            socket.emit('deletePokemon', [id, name])
            Swal.fire({
                title: 'Released!',
                text: `${name} has been released from the Library!`,
                icon: 'success',
                background: 'antiquewhite'
            })
            navigate('/home')
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
        <div style={{backgroundImage:`url(https://i.imgur.com/51AGRqe.png)`, backgroundSize: 'cover'}}>
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
            <div style={{height:'650px'}}>
                <table className='border border-dark border-3 fs-5 mx-auto mt-5 col-6 viewTable'>
                    <div className='d-flex justify-content-between mb-4'>
                        <div>
                            <img src={pokemon.image} className="viewpokemon-img mt-4 ms-4 bg-dark"/>
                        </div>
                        <div className='mt-4 text-start ms-5'>
                            <p>Name: <span className='pokemon-name'>{pokemon.name}</span></p>
                            <p><button className={`${pokemon.type == pokemon.type && `btn btn-sm text-light ${pokemon.type}`}`}><Link className="edit-one" to={`/${pokemon.type}`}>{pokemon.type}</Link></button></p>
                            <p><Link className='text-dark' to={`/gen/${pokemon.generation?.[pokemon.generation.length-1]}`}>{pokemon.generation}</Link></p>
                            <p className='me-4'>{pokemon.description}</p>
                            <p><p>{(pokemon.creator?.username == currentUser.username) ? <> <button className="btn btn-outline-success btn-sm mt-1"><Link className="edit" to={`/editPokemon/${pokemon._id}`}>Evolve</Link></button> <button className='btn btn-outline-danger btn-sm mt-1' onClick={(e)=>deleteHandler(pokemon._id, pokemon.name)}>Release</button> </>: null}</p></p>
                        </div>
                    </div>
                    <p>{pokemon.name} has been fed {feed} time(s)</p>
                    <button className='mb-4 btn btn-success' onClick={feedPokemon}>Feed {pokemon.name}</button>
                </table>
            </div>
        </div>
    )
}

export default ViewPokemon

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ViewPokemon = () => {
    
    const [pokemon, setPokemon] = useState([])

    const [feed, setFeed] = useState(0)

    const {id} = useParams()

    const navigate = useNavigate()

    let message = [
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
        
    
    const feedPokemon = (e) => {
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
                    <Link to='/'><img className='user-img bg-success' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/></Link> 
                </div>
            </div>
            <div style={{height:'750px'}}>
                <table className='border border-dark border-3 fs-5 mx-auto mt-4 col-6 viewTable'>
                    <img src={pokemon.image} className="col-5 mb-2 mt-4 bg-dark"/>
                    <p>Name: {pokemon.name}</p>
                    <p>Type: <button className={`${pokemon.type === "Bug" && "btn text-light bug"}
                                                ${pokemon.type === "Dark" && "btn text-light dark"}
                                                ${pokemon.type === "Dragon" && "btn text-light dragon"}
                                                ${pokemon.type === "Electric" && "btn text-light electric"}
                                                ${pokemon.type === "Fairy" && "btn text-light fairy"}
                                                ${pokemon.type === "Fighting" && "btn text-light fighting"}
                                                ${pokemon.type === "Fire" && "btn text-light fire"}
                                                ${pokemon.type === "Flying" && "btn text-light flying"}
                                                ${pokemon.type === "Grass" && "btn text-light grass"}
                                                ${pokemon.type === "Ghost" && "btn text-light ghost"}
                                                ${pokemon.type === "Ground" && "btn text-light ground"}
                                                ${pokemon.type === "Ice" && "btn text-light ice"}
                                                ${pokemon.type === "Normal" && "btn text-light normal"}
                                                ${pokemon.type === "Poison" && "btn text-light poison"}
                                                ${pokemon.type === "Psychic" && "btn text-light psychic"}
                                                ${pokemon.type === "Water" && "btn text-light water"}
                                                ${pokemon.type === "Rock" && "btn text-light rock"}
                                                ${pokemon.type === "Steel" && "btn text-light steel"}
                                                `}>{pokemon.type}</button></p>
                    <p>{pokemon.generation}</p>
                    <p className='mx-3'>{pokemon.description}</p>
                    <p>{pokemon.name} has been fed {feed} time(s)</p>
                    <button className='mb-4 btn btn-success' onClick={feedPokemon}>Feed {pokemon.name}</button>
                </table>
            </div>
        </div>
    )
}

export default ViewPokemon

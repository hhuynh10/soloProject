import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const LoggedUser = () => {

    const [currentUser, setCurrentUser] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/currentUser/${id}`,{withCredentials:true})
        .then((res)=> {
            console.log(res)
            setCurrentUser(res.data)
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
            <div style={{height:'600px'}}>
            <table className='border border-dark border-3 fs-5 mx-auto mt-5 col-6 viewTable'>
                    <h3 className='mt-4'>Hi {currentUser.username}, this is your account:</h3>
                    <p>Username: {currentUser.username}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>Member since: {currentUser.createdAt}</p>
                    <p className='mb-4'><button className='btn btn-success'><Link className="edit-one" to={`/editUser/${currentUser._id}`}>Edit</Link></button> <button className='btn btn-danger' onClick={(e)=>deleteHandler(currentUser._id)} >Delete</button></p>
                </table>
            </div>
        </div>
    )
}

export default LoggedUser
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ViewUser = () => {

    const [user, setUser] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`,{withCredentials:true})
        .then((res)=> {
            console.log(res)
            setUser(res.data)
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
            <div style={{height:'600px'}}>
            <table className='border border-dark border-3 fs-5 mx-auto mt-5 col-6 viewTable'>
                    <p className='mt-4'>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Member since: {user.createdAt}</p>
                    <button className='btn btn-success mb-4'><Link className="edit-one" to={`/editUser/${user._id}`}>Edit</Link></button>
                </table>
            </div>
        </div>
    )
}

export default ViewUser
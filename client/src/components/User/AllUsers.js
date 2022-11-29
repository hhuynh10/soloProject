import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const AllUsers = () => {

    const [user, setUser] = useState([])

    const navigate = useNavigate()

    const sortUser = [...user].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
    );

    const getTime = (e) => {
        let date = new Date(e).toLocaleDateString()
        return date
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allUsers', {withCredentials:true})
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
            <div className="col-8 mx-auto mt-2" style={{minBlockSize: '700px'}}>
            <h2 className='text-dark'>Member List:</h2>
                <table className="table table-hover border border-dark fs-5">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Member since</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    sortUser.map((user)=>(
                        <tr>
                            <td className="text-dark fs-5">{user.username}</td>
                            <td className="text-dark fs-5">{getTime(user.createdAt)}</td>
                            <td><Link to={`/viewUser/${user._id}`} className="text-dark">View</Link></td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditUser = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setConfirmPassword(res.data.confirmPassword)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/updateUser/${id}`, {
            username,
            email,
            password,
            confirmPassword
        }, {withCredentials:true})
            .then((res)=> {
            console.log(res)
            navigate(`/loggedUser/${id}`)
        }).catch((err)=> {
            console.log(err)
            setErrors(err.response.data.errors)
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
        <div style={{backgroundImage:`url(https://i.imgur.com/JDhvEpO.png)`, backgroundSize: 'cover'}}>
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
            <div className='mx-auto' style={{height:'650px'}}>
                <h2 className="text-dark mt-3">Manage Account</h2>
                <form onSubmit={submitHandler} className="col-6 fs-5 mt-4 mx-auto text-dark">
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-control bg-light" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    {errors.username ? <span className='text-danger'>{errors.username.message}</span> : null }<br></br>
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control bg-light" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    {errors.email ? <span className='text-danger'>{errors.email.message}</span> : null }<br></br>
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control bg-light" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    {errors.password ? <span className='text-danger'>{errors.password.message}</span> : null }<br></br>
                    <label className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control bg-light" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword ? <span className='text-danger'>{errors.confirmPassword.message}</span> : null }<br></br>
                    <button type="submit" className="btn btn-success m-2">Edit</button>
                </form>
            </div>
        </div>
    )
}

export default EditUser
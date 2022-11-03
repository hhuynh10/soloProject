import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', {
            username,
            email,
            password,
            confirmPassword
        }, {withCredentials:true, credentials: 'include'})
            .then((res)=> {
            console.log(res)
            navigate('/home')
        }).catch((err)=> {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div className='home' style={{backgroundImage:`url(https://i.imgur.com/lAsI3ml.jpeg)`,
        backgroundSize: 'cover'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-2">
                <h1 className="text-light mt-2">Welcome to Pokemon Library</h1>
                <Link to="/login" className="m-3 text-success fs-5">Already have an account? Login here! </Link>
            </div>
            <div className='mt-3' style={{height:'600px'}}>
                <h2 className="register text-success">Register</h2>
                <form onSubmit={submitHandler} className="col-3 fs-5 mt-4 text-light formRegister">
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
                    <button type="submit" className="btn btn-success m-2">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
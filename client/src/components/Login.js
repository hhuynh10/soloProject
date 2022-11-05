import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, {withCredentials:true})
            .then((res)=> {
            console.log(res)
            navigate('/home')
        }).catch((err)=> {
            // 
            console.log('error 1',err)
            console.log('error 2',err.response.data)
            setErrors(err.response.data.error)
        })
    }

    return (
        <div style={{backgroundImage:`url(https://i.imgur.com/lAsI3ml.jpeg)`,
        backgroundSize: 'cover'}} >
            <div className="col-12 no-gutter fluid pt-1 pb-2">
                <h1 className="text-light mt-2">Welcome Back Trainer!</h1>
                <Link to="/" className="m-3 text-success fs-5">Back to register!</Link>
            </div>
            <div style={{height:'525px'}}>
                <h2 className="login text-success">Login</h2>
                <form onSubmit={submitHandler} className="col-3 text-light fs-5 mt-4 formLogin">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control bg-light" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <br></br>
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control bg-light" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    {errors ? <span className='text-danger'>{errors}</span> : null }<br></br>
                    <button type="submit" className="btn btn-success m-2">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
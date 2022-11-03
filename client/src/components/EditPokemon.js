import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditPokemon = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [generation, setGeneration] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pokemon/${id}`, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            setName(res.data.name)
            setType(res.data.type)
            setGeneration(res.data.generation)
            setDescription(res.data.description)
            setImage(res.data.image)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/update/${id}`, {
            name,
            type,
            generation,
            description,
            image
        }, {withCredentials:true})
        .then((res)=> {
            console.log(res)
            navigate('/home')
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
        <div style={{backgroundImage:`url(https://i.imgur.com/JDhvEpO.png)`,
        backgroundSize: 'cover'}}>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <h1 className="text-light ms-5">Welcome!</h1>
                <div className='me-5 mt-2'>
                    <Link to="/home" className="text-success fs-5 me-5 edit">Back to Home </Link>
                    <Link to="/" className="text-success edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div style={{height:'700px'}}>
                <h3 className="text-dark mt-2">Please edit your Pokemon!</h3>
                <form onSubmit={submitHandler} className="col-6 mx-auto fs-5">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control bg-light" value={name} onChange={(e)=>setName(e.target.value)} />
                    {errors.name ? <span className='text-danger'>{errors.name.message}</span> : null }<br></br>
                    <label className="form-label">Type:</label>
                    <input type="text" className="form-control bg-light" value={type} onChange={(e)=>setType(e.target.value)} />
                    {errors.type ? <span className='text-danger'>{errors.type.message}</span> : null }<br></br>
                    <label className="form-label">Generation:</label>
                    <select className="form-control bg-light" value={generation} onChange={(e)=>setGeneration(e.target.value)}>
                        <option>Select one:</option>
                        <option value="Gen 1">Gen 1</option>
                        <option value="Gen 2">Gen 2</option>
                        <option value="Gen 3">Gen 3</option>
                        <option value="Gen 4">Gen 4</option>
                        <option value="Gen 5">Gen 5</option>
                        <option value="Gen 6">Gen 6</option>
                        <option value="Gen 7">Gen 7</option>
                        <option value="Gen 8">Gen 8</option> 
                    </select>
                    {errors.generation ? <span className='text-danger'>{errors.generation.message}</span> : null }<br></br>
                    <label className="form-label">Description:</label>
                    <input type="text" className="form-control bg-light" value={description} onChange={(e)=>setDescription(e.target.value)} />
                    {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null }<br></br>
                    <label className="form-label">Image:</label>
                    <input type="text" className="form-control bg-light" value={image} onChange={(e)=>setImage(e.target.value)} />
                    {errors.image ? <span className='text-danger'>{errors.image.message}</span> : null }<br></br>
                    <button type="submit" className="btn btn-success mt-3">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditPokemon
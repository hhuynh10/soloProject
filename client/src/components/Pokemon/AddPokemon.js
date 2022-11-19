import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AddPokemon = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [generation, setGeneration] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/addPokemon', {
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
        <div style={{backgroundImage:`url(https://i.imgur.com/QZvj31K.png)`, backgroundSize: 'cover'}}>
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
            <div style={{height:'700px'}}>
                <h3 className="text-dark mt-2">Add your Pokemon here:</h3>
                <form onSubmit={submitHandler} className="col-6 mx-auto fs-5">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control bg-light" value={name} onChange={(e)=>setName(e.target.value)} />
                    {errors.name ? <span className='text-danger'>{errors.name.message}</span> : null }<br></br>
                    <label className="form-label">Type:</label>
                    <select className="form-control bg-light" value={type} onChange={(e)=>setType(e.target.value)}>
                        <option>Select one:</option>
                        <option value="Bug">Bug</option>
                        <option value="Dark">Dark</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Electric">Electric</option>
                        <option value="Fairy">Fairy</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Fire">Fire</option>
                        <option value="Flying">Flying</option>
                        <option value="Grass">Grass</option> 
                        <option value="Ghost">Ghost</option> 
                        <option value="Ground">Ground</option> 
                        <option value="Ice">Ice</option> 
                        <option value="Normal">Normal</option>
                        <option value="Poison">Poison</option> 
                        <option value="Psychic">Psychic</option> 
                        <option value="Water">Water</option> 
                        <option value="Rock">Rock</option>
                        <option value="Steel">Steel</option>
                    </select>
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
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddPokemon
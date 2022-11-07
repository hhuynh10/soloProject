import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import io from "socket.io-client";
import Chat from "./Chat";

const Room = () => {
    
    const navigate = useNavigate()

    const [socket] = useState(() => io(':8000'));

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
        }
    };

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
        <div style={{backgroundImage:`url(https://i.imgur.com/U8LuH9V.png)`, backgroundSize: 'cover'}}>
            <div className="col-12 no-gutter fluid pt-1 pb-1 bg-dark d-flex justify-content-between">
                <div className='d-flex align-items-center'>
                    <h1 className="text-light ms-5">Pokemon Library</h1>
                    <Link to="/home" className="text-success fs-5 ms-5 edit">Home</Link>
                    <Link to="/about" className="text-success fs-5 ms-4 edit">About</Link>
                    <Link to="/liveChat" className="text-success fs-5 ms-4 edit">Join our live chat! </Link>
                </div>
                <div className='me-5 d-flex align-items-center'>
                    <Link to="/addPokemon" className="text-success fs-5 me-5 edit">Add your Pokemon here! </Link>
                    <Link to="/" className="text-success edit fs-5" onClick={logout}>Logout</Link>
                </div>
            </div>
        {!showChat ? (
        <div className="col-6 mx-auto" style={{height:'600px'}}>
            <h3 className='mt-5'>Let's Connect!!!</h3>
            <form>
                <input type="text" className="form-control bg-light mt-4" placeholder="Username..." onChange={(event) => {setUsername(event.target.value);}}/>
                <select className="form-control bg-light mt-4" onChange={(event)=>setRoom(event.target.value)}>
                <option>Select a room:</option>
                        <option value="Room 1">Pokemon Center</option>
                        <option value="Room 2">Battle Ground</option>
                        <option value="Room 3">Community</option>
                    </select>
                <button className="btn btn-success mt-4" onClick={joinRoom}>Join Room</button>
            </form>
        </div>
        ) : (
        <Chat socket={socket} username={username} room={room} />
            )}
    </div>
    )
}

export default Room
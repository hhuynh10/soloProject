const express = require('express');
const app = express();
const PORT = 8000;

require("dotenv").config();
require("./config/mongoose.config");

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const socket = require('socket.io')
const Pokemon = require('./models/pokemon.model');

const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000', credentials:true
    }),
)

require("./routes/pokemon.routes")(app);
require("./routes/user.routes")(app);

const server = app.listen(PORT, ()=>{
    console.log(`Server is up and running on ${PORT}`)
})

const io = socket(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
})

io.on('connection', (socket)=> {
    console.log('new user:', socket.id)
    
    socket.on('deletePokemon', ([id, name])=>{
        console.log('deleting pokemon...')
        Pokemon.deleteOne({_id:id})
        .then((res)=> {
            console.log('delete success')
            io.emit('pokemonDeleted', [id, name])
        }).catch((err)=> {
            console.log('delete fail')
            res.status(400).json(err)
        })
    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
    
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        });

    socket.on('disconnect', ()=>{
        console.log('User Disconnected', socket.id)
    })
})
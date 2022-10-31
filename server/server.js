const express = require('express');
const app = express();
const PORT = 8000;

require("dotenv").config();
require("./config/mongoose.config");

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000', credentials:true
    }),
)

require("./routes/pokemon.routes")(app);
require("./routes/user.routes")(app);


app.listen(PORT, ()=>{
    console.log(`Server is up and running on ${PORT}`)
} )
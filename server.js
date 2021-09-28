
require('dotenv').config();
const express = require("express");
const http = require("http");
const cors = require("cors")


const app = express();
const server = http.createServer(app);

const users = require('./api/users');
const connections = require('./api/connections');
const levels = require('./api/levels');


const connectDB = require('./dbinit');


connectDB();
app.use(express.json());
app.use(cors());



const PORT = process.env.PORT || 5000;

const io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:3000",
        method: ["GET","POST"]
    }
})



io.on('connection',(socket)=>{
    socket.emit('me', socket.id)

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callEnded")
    })
    socket.on("callUser", (data)=>{
        io.to(data.userToCall).emit("callUser", 
        { signal: data.signalData, from: data.from, name:data.name})
    })

    socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})


app.use('/users', users);
app.use('/levels', levels);
app.use('/connections', connections);




server.listen(PORT, () => console.log(`Server started on port ${PORT}`));






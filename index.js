const express= require("express");
const app= express();
const path=require("path");
const server=require("http").createServer(app);

const io= require("socket.io")(server);

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname , "public")));

app.use(express.urlencoded({extended:true}));

io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username+"joined the conversation");
    })
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username+"left the conversation");
    })
    socket.on("chat",function(message){
        socket.broadcast.emit("update",username+"left the conversation");
    })
})

const { v4: uuidv4 } = require('uuid');

let port=800;

let advisors=[
    {
        id:uuidv4(),
        username:"Adv Swati Rathore",
        img:"lawyer1.jpg",
        content:"10+ years experience expert in business law",
       
        
    },
    {
        id:uuidv4(),
        username:"Adv Archi Tiwari",
        img:"lawyer2.jpg",
        content:"12+ years experience expert in family law",
    }
]

app.listen(port,()=>{
    console.log("listening to port")
})

app.get("/home",(req,res) => {
    // res.send("request accepted");
    res.render("home.ejs")
})

app.get("/ask-anon",(req,res) =>{
    res.render("advisor.ejs" ,{advisors})
})

app.get("/about",(req,res) =>{
    res.render("about.ejs" ,{advisors})
})

app.get("/signin-advisor" ,(req,res) =>{
    res.render("sign.ejs")
})

app.get("/ask-anon/chat",(req,res) =>{
    res.render("chat.ejs")
})
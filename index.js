import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { log } from "console";
import { readdir } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let posts = [];
let newPost;
let username;
let email;
let numPosts;
let date;
let firstLetter;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    
// don't continue this code and return 404 status he isn't signed in(boolean, check strings)

    numPosts = posts.length;

    res.render("index.ejs",{
        posts: posts,
        numPosts: numPosts,
        date: date,
        username: username,
        email: email,
        firstLetter: username
    });
});


app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.post("/login",(req,res)=>{
    
    username =req.body["username"];
    email = req.body["email"]
    firstLetter = username;

    
    
    res.redirect("/")
})



app.post("/post",(req,res)=>{
    newPost = req.body["post"];

    if (!newPost) {res.sendStatus(422);}


    
    posts.unshift(newPost);
 
    numPosts = posts.length
    
    
    res.render("index.ejs",{
        posts: posts,
        numPosts: numPosts,
        date: date,
        username: username,
        email: email,
        firstLetter: username
    })
})

app.post("/delete",(req,res)=>{
    
    posts = [];
    numPosts = posts.length

    res.render("index.ejs",{
        posts: posts,
        numPosts: numPosts,
        date: date,
        username: username,
        email: email,
        firstLetter: username
    })
})

app.listen(port ,()=>{

    console.log(`on port ${port}`);
})

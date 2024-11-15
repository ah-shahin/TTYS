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
let index = -1;
let date;
let firstLetter =[];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));





app.get("/",(req,res)=>{
    

    
    if(!firstLetter.length) res.redirect("/login");
        
    
    index++;
    
    res.render("index.ejs",{
        posts: posts,
        index: index,
        date: date,
        username: username,
        email: email,
        firstLetter: username
    });
});


app.get("/login",(req,res)=>{
    if(firstLetter.length) res.redirect("/");
    res.render("login.ejs");
   
})

app.post("/login",(req,res)=>{
    
    username =req.body["username"];
    email = req.body["email"]
    firstLetter = username;

    
    
    res.redirect("/")
})

app.post("/post", (req, res) => {
    const content = req.body.post;

    if (!content) return res.sendStatus(422); 

    const newPost = {
        content: content,
        timestamp: new Date().toISOString()
    };

    posts.unshift(newPost); 
    res.redirect("/");
});

app.post("/clear",(req,res)=>{
    
    posts = [];

    res.redirect("/");
})


app.post("/delete", (req,res)=>{
    const postId = req.body.postId; 
    
    
    if (postId >= 0 && postId < posts.length) {
       
        posts.splice(postId, 1);
    }

    res.redirect("/");
})

app.listen(port ,()=>{

    console.log(`on port ${port}`);
})

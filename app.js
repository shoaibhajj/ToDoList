const express=require("express");
const http=require('http');
const bodyparser=require("body-parser");
const ejs = require('ejs');
const date=require(__dirname+"/date.js");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const port =process.env.PORT ||5000;
const server =http.createServer(app);


const items=["Buy Food","Cook Food","Eat Food"];
const works=[];
app.get("/",function(req,res){
    const day=date.getDay();
    res.render("list",{listTitle:day,newListItems:items});  
});
app.post("/",function(req,res){

    let item=req.body.newItem;
    if(req.body.listTitle ==="work"){
        works.push(item);    
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }


    console.log(req.body.listTitle);
    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"work List",newListItems:works});
});
app.post("/work",function(req,res){
    let item=req.body.newItem;
    works.push(item);
    res.redirect("/work");
});


app.get("/about",function(req,res){
    res.render("about");
    
});

server.listen(port,()=>{
    console.log("Server is started on port : "+port );
});
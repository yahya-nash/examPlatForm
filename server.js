const express=require("express");
const bodyParser=require("body-parser");
const port=process.env.PORT;
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/",function(req,res){

    res.render('index', {});
});


app.post("/",function(req,res){


    res.redirect("/");




});


app.listen(port || 3000,function(){
    console.log("system is work on"+ 3000);
})

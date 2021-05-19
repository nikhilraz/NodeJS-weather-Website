const express=require("express");
const path=require('path');
const app=express();
const hbs=require("hbs");

const port=process.env.PORT||9000;
const viewPath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");
const staticFilePath=path.join(__dirname,"../public");

app.set("view engine","hbs");
app.set("views",viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(staticFilePath));

app.get("/",(req,res)=>{
    res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/weather",(req,res)=>{
    res.render('weather');
});
app.get("*",(req,res)=>{
    res.render('404',{
        errorMessage:"Oops, Page not found",
    });
});
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});
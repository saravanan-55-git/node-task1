// import express from "express";

const express = require ("express")
const fs = require("fs")
const path = require("path")

const dirPath = path.join(__dirname,"timestamps");
console.log("dirpath",dirPath)

const app = express()

app.use(express.static("timestamps"))

app.get("/",(req,res)=>{
    res.send("hey there i'm working fine")
})

app.get("/static",(req,res)=>{
    let time = new Date();
    let dateString = time.toUTCString().slice(0, -3);
    let content = `Last updated stamp is ${dateString}`
    res.send(content);

    fs.writeFile(`${dirPath}/+date-time.txt`, content, (err)=>{
        if(err){
            console.log(err)
        } else {
            console.log("file created successfully...")
        }
    })
    res.sendFile(path.join(__dirname,"timestamps/date-time.txt"))
})

app.listen(9000,()=>console.log(`server started in localhost:9000`))
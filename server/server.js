//entry point for backend information respondsible for creating a initizing 
require("dotenv").config()
const db= require('./db')
const morgan=require('morgan')
const express = require('express')
const { default: next } = require( "next" )
const app=express()
app.use((req, res, next)=>{
    res.json({
        status:"success",
        data:{
            restaurant:'dominos'
        }
    });
    next();
})
//express middleware: when request is sent it takes the info of the body of the req and attach it to the req object
app.use(express.json())

//Environment Variables: development and production ports

const port =process.env.PORT || 3001
//Routes for each http methods: get restraurants
//localhost:3000/getRestaurants
//when the http is retrieve it will be stored in the request variable
//and the response sent back will be stored in the response variable
//GET all resturants
app.get("/api/v1/restaurants", async(req, res)=>{
    //pass the command used in sql to get all restaurants
    //store it in a variable
    try{
        //this will return a promise as it will take some time to retrieve information
    //Use async, await to wait till the data is retrieve to continue
    //everytime async await is used you should implement the try catch block
    const results=  await db.query("select * from restaurants")
    res.status(200).json({
        status:"secuss",
        results: results.rows.length,
        data:{
        restaurant:results[rows]
        }
    })
    }catch(err){
        console.log(err)
    }

    // console.log(results)
    
 
})

//GET a restaurants                 route handler
app.get('/api/v1/restaurants/:id', async(req, res)=>{
    console.log(req.params.id)
    try{
        const results= await db.query('select * from restaurants where id=$1', [req.params.id])

        console.log(results.rows[0])
        res.status(200).json({
            status:"secuss",
            data:{
            restaurant:results[rows]
            }
        })
        
    }catch(err){
        console.log(err)
    }
    
   
})

//Create

app.post('/api/v1/restaurants', async (res, req)=>{
    console.log(req.body)
    try{
        const results= await db.query("INSERT INTO restaurants (name, location, price_range) values($1, $2, $3)", [req.body.name, req.body.location, req.body.price_range])
        console.log(results)
        res.status(201).json({
            status:"success",
            data:{
                restaurant: "mcdonalds"
            }
        })
    }
    catch(err){
        console.log(err)
    }
   
})

//Delete

//Create a restaurant
//Middleware: create data in the body and create new entry in postgre
app.post('/api/v1/restaurants', (req, res)=>{
    console.log(req.body)
})

//Update Restaurants

app.put("/api/v1/restaurants/:id", (req, res)=>{
    console.log(req.params.id)
    console.log(req.body)
})


app.listen(port,()=>{
    return console.log('server is up' + port)
})


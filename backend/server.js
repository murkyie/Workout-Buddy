require('dotenv').config()

const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")

// express app
const app = express()

// middleware
app.use(express.json())

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// routes
app.use(('/workouts'), workoutRoutes)


// conenct to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Database on & Listening on port", process.env.PORT)})
})
.catch((error) => {
    console.log("Couldn't connect to Databse", error)
})


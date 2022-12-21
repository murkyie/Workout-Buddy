const workoutModel = require("../models/workoutModel")
const mongoose = require("mongoose")

// GET all workouts
const getWorkouts = async (req,res) => {
    const workouts = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req,res) => {
    // check if the id is the same as mongo _id
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await workoutModel.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// CREATE a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body


    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // Add doc to db
    try {
        const workout = await workoutModel.create({title, load, reps})
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// DELETE a workout
const deleteWorkout = async (req, res) => {
    // check if the id is Valid
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await workoutModel.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json("The "+ workout.title + " workout is deleted")
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    // check if the id is the same as mongo _id
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await workoutModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}
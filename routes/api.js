const router = require("express").Router()
const WorkOut = require("../models/WorkOut.js")

router.get("/api/workouts", (req, res) => {
    WorkOut.findOne().sort({day: -1}).then(dbWorkOut => {
        console.log("dbWorkOut: ", dbWorkOut)
        res.json([dbWorkOut])
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

router.put("/api/workouts/:id", function(req, res) {
    const workOut = req.params.id
     console.log("workout id: ", workOut)
    const newExercise = req.body
    WorkOut.findByIdAndUpdate( workOut, {$push: {exercises: newExercise}}).then(dbWorkOut => {
        console.log("dbWorkout add Exercise: ", dbWorkOut)
        res.json(dbWorkOut)
    })
    .catch(err => {
        res.status(400).json(err)
    })

})

module.exports = router
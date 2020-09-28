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

module.exports = router
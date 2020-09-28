const mongoose = require("mongoose")

const Schema = mongoose.Schema

const opts = { toJSON: { virtuals: true }}

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String
            },
            name: {
                type: String,
                trim: true,
                required: "Give a name for your exercise.",
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            reps: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            sets: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            distance: {
                type: Number,
                required: function() {return this.type === "cardio"}
            }
        }
    ]
}, opts)

workoutSchema.virtual("totalDuration").get(function() {
    const allDurations = this.exercises.reduce((acc, cv) => {return acc + cv.duration}, 0)
    return allDurations
})

const WorkOut = mongoose.model("Workout", workoutSchema)

module.exports = WorkOut
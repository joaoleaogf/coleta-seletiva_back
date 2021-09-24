const express = require('express')

const app = express()

const placesRouter = require('./routes/connection')
app.use(express.json())
app.use('/locaisColeta', placesRouter)

app.listen(6000, ()=>{
    console.log("running!")
})


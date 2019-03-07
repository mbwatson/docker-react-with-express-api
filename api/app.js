const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// CORS
app.use(cors())

// Config
const PORT = process.env.API_PORT || 3030

// Tell me it's working!
app.listen(PORT, () => {
    console.log(`\nShhh... I'm listening on port ${PORT}.\n`)
})

// Custom Middleware - Route-Logging
const routeLogger = (req, res, next) => {
    console.log(`HIT: ${ req.path }`)
    next()
}
app.use(routeLogger)

// // // Routes // // //

app.use('/test', require('./routes/test'))

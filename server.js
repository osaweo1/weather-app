// Setup empty JS object to act as endpoint for all routes
projectData = {};

//
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
//innitializing the project folder
app.use(express.static('website'))


//route to post the data gotten to the local server
app.post('/add', async(req, res) => {
    const body = req.body
    projectData = body
    console.log(projectData)
    res.status(200).send(projectData)
});
//route to get data from the local server
app.get('/all', async(req, res) => {
    console.log(req.url)

    console.log(projectData)
    res.status(200).send(projectData)
})


// creating port the server will listen from
const port = 5000
app.listen(port, () => {
    console.log(`Server is listening on port:${port}...`)
})
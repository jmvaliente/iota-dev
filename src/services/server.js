const { ClientBuilder } = require('@iota/client')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const path = require('path');
const { clientIota } = require('./iotaConnect')
require('dotenv').config()


const options = {
    websockets: true
    // ...
}

let client = clientIota()

app.use('/dist', express.static('../dist'));
app.use(cors())

app.get('/connect/:server', async (req, res) => {
    client = clientIota(req.params.server)

    return await client.getInfo()
        .then(result => res.json(result))
        .catch(() => res.json({nodeinfo:{isHealthy:false}}))
})

// Start server
app.listen(5000, function () {
    console.log(`Server started on port: 5000 `)
})
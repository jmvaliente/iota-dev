const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const path = require('path');
const bodyParser = require('body-parser');
const { clientIota } = require('./iotaConnect')
const { seedGenerate } = require('./generateSeed')
require('dotenv').config()


const options = {
    websockets: true
    // ...
}

let client = clientIota()

app.use('/dist', express.static('../dist'));
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

app.get('/connect/:server', async (req, res) => {
    client = clientIota(req.params.server)

    return await client.getInfo()
        .then(result => res.json(result))
        .catch(() => res.json({nodeinfo:{isHealthy:false}}))
})

app.get('/seed_generate', async (req, res) => {

    const mnemonic = client.generateMnemonic()
    const hexEncodedSeed = client.mnemonicToHexSeed(mnemonic)

    const addresses = await client.getAddresses(hexEncodedSeed,{security: 2, checksum: true})
            .accountIndex(0)
            .range(0, 5)
            .get();

    
    return res.json({hexEncodedSeed, mnemonic, addresses})
})

app.get('/get_address/:seed', async (req, res) => {
    
        const IOTA_SEED_SECRET = req.params.seed;
        const addresses = await client.getAddresses(IOTA_SEED_SECRET,{security: 2, checksum: true})
            .accountIndex(0)
            .range(0, 5)
            .get();
        
        return res.json(addresses)
})

app.get('/validate_address/:address', async (req, res) => {
    const address = req.params.address
    const result = await client.isAddressValid(address)
    return res.json({validate: result})
})

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address
    const balance = await client.getAddressBalance(address)
    return res.json(balance)
})

app.post('/transfer', async (req, res) => {

    const seed = req.body.seed
    const address = req.body.address
    const value = req.body.value
    const message = await client.message()
        .seed(seed)
        .output(address, value)
        .submit()
        
    return res.json(message)
})

// Start server
app.listen(5000, function () {
    console.log(`Server started on port: 5000 `)
})
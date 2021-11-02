const { ClientBuilder } = require('@iota/client')

const clientIota = (server) => {
    const serverDefault = 'api.lb-0.h.chrysalis-devnet.iota.cafe'
    return new ClientBuilder()
    .node(`https://${ server || serverDefault }`)
    .build()
}

module.exports = { clientIota }
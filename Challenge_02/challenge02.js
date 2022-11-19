const https = require('https')
const displayDecryptedMessage = require('../libs/displayDecryptedMessage')

https
  .get('https://codember.dev/encrypted.txt', (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    resp.on('end', () => {
      displayDecryptedMessage(data)
    })
  })
  .on('error', (err) => {
    console.log('--Error: ' + err.message)
  })

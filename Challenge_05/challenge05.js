const https = require('https')

https
  .get('https://codember.dev/mecenas.json', (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    resp.on('end', () => {
      let listOfMecenas = JSON.parse(data)
      displayMecenas(listOfMecenas)
    })
  })

  .on('error', (err) => {
    console.log('--Error: ' + err.message)
  })

//
function displayMecenas(listOfMecenas) {
  const winnerMecenasIndex = getWinnerMecenasIndex(listOfMecenas)
  console.log(
    `submit ${listOfMecenas[winnerMecenasIndex]}-${winnerMecenasIndex}`
  )
}

function getWinnerMecenasIndex(listOfMecenas) {
  let mecenasIndexList = [...listOfMecenas.keys()]

  while (mecenasIndexList.length > 1) {
    const isMecenasLengthOdd = mecenasIndexList.length % 2 !== 0
    mecenasIndexList = mecenasIndexList.filter((m, i) => i % 2 === 0)

    if (isMecenasLengthOdd) {
      mecenasIndexList.shift()
    }
  }

  return mecenasIndexList[0]
}

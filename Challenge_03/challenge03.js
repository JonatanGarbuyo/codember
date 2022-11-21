const https = require('https')

https
  .get('https://codember.dev/colors.txt', (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    resp.on('end', () => {
      let ligthsArray = JSON.parse(data.replaceAll("'", '"'))
      displayLongestLights(ligthsArray)
    })
  })
  .on('error', (err) => {
    console.log('--Error: ' + err.message)
  })

function displayLongestLights(ligthsArray) {
  let count = 0
  let maxLength = 0
  let color1 = ''
  let color2 = ''
  let lastColor = ''

  for (let i = 0; i < ligthsArray.length; i++) {
    let currentColor = ligthsArray[i]

    if (!color2 && color1 === currentColor) {
      continue
    }
    if (!color1) {
      color1 = currentColor
      lastColor = currentColor
      count++
      maxLength = count
      continue
    }
    if (!color2) {
      color2 = currentColor
      lastColor = currentColor
      count++
      maxLength = count
      continue
    }

    if (currentColor === color1) {
      count++
      if (count > maxLength) {
        maxLength = count
        lastColor = currentColor
      }
    } else {
      if (maxLength === 2) lastColor = currentColor
      count = 2
    }

    color1 = color2
    color2 = currentColor
  }

  console.log(maxLength, lastColor)
}

const https = require('https')

const validProperties = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']

https
  .get('https://codember.dev/users.txt', (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    resp.on('end', () => {
      displayValidUsersCount(data)
    })
  })
  .on('error', (err) => {
    console.log('--Error: ' + err.message)
  })

function displayValidUsersCount(data) {
  let lastValidUser = ''
  const users = data.split(/\n\n/)

  const validUsersCount = users.reduce((count, curr) => {
    if (isValidUser(curr)) {
      lastValidUser = curr
      return count + 1
    } else return count
  }, 0)

  console.log(validUsersCount, lastValidUser)
}

function isValidUser(user) {
  return validProperties.every((prop) => {
    return user.includes(`${prop}:`)
  })
}

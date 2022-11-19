function displayDecryptedMessage(data) {
  const encryptedWords = data.split(' ')
  let decryptedWords = encryptedWords.map(decryptWord)
  console.log('secretMessage: ', decryptedWords.join(' '))
}

function decryptWord(encryptedWord) {
  let codesList = []
  const charSize = 2

  for (let i = 0; i < encryptedWord.length; ) {
    let code = parseInt(encryptedWord.slice(i, i + charSize + 1))

    if (code > 122 || code < 97) {
      code = parseInt(encryptedWord.slice(i, i + charSize))
      i += charSize
    } else {
      i += charSize + 1
    }

    codesList.push(code)
  }

  return String.fromCharCode(...codesList)
}

module.exports = displayDecryptedMessage

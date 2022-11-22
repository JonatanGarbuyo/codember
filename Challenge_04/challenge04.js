const start = 11098
const end = 98123

const numbers = Array.from({ length: end - start }, (x, i) =>
  (i + start).toString()
)

const correctNumbers = numbers.filter((number) => {
  // - Es una contraseña de 5 dígitos.
  const VALID_LENGTH = 5
  // - La contraseña tenía el número 5 repetido dos veces.
  const VALID_OCURRENCES = 2
  // - El número a la derecha siempre es mayor o igual que el que tiene a la izquierda.

  return (
    number.length === VALID_LENGTH &&
    [...number.matchAll(/5/g)].length >= VALID_OCURRENCES &&
    [...number].every((currentDigit, i, arr) => {
      const prevDigit = arr[i - 1] || 0
      return parseInt(currentDigit) >= parseInt(prevDigit)
    })
  )
})

console.log(`submit ${correctNumbers.length}-${correctNumbers[55]}`)

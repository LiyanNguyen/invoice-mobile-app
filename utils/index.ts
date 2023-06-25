export const generateRandomInvoiceID = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter1 = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  const randomLetter2 = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  const randomFourNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  const result = randomLetter1 + randomLetter2 + randomFourNumber

  return result
}

export const getTodayDateFormatted = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0')
  const result = `${year}-${month}-${day}`

  return result
}

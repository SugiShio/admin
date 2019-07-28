export const getRandomString = (length = 16) => {
  const SOURCE = 'abcdefghijklmnopqrstuvwxyz0123456789' //元になる文字
  let result = ''
  for (let i = 0; i < length; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)]
  }
  return result
}

const { isColorBright } = require('../../dist')

const ContrastColors = {
  '#000000': false,
  '#121212': false,
  '#212121': false,
  '#3B3B3B': false,
  '#4A4A4A': false,
  '#5C5C5C': false,
  '#737373': false,
  '#858585': true,
  '#8C8C8C': true,
  '#A3A3A3': true,
  '#B3B3B3': true,
  '#C2C2C2': true,
  '#D6D6D6': true,
  '#E8E8E8': true,
  '#FCFCFC': true,
}

describe('isColorBright', () => {
  it('returns the expected value', () => {
    Object.keys(ContrastColors).forEach((c) =>
      expect(isColorBright(c)).toBe(ContrastColors[c])
    )
  })
})

const { Spell } = require('./index.js')

test('should work when everything is turned on', () => {
  const spell = new Spell()
  const test = 'Hello, may I please make a reservation for 2 at 6:30 PM on Thursday May 18 under the name Robert Smith?'
  const expected = 'Hello, may I please make a reservation for Two at Six Thirty pee-em on Thursday May Eighteen under the name Robert Smith?'
  expect(spell.process(test)).toBe(expected)
})

test('should work with currency', () => {
  const spell = new Spell()
  const test = 'And it can pay up to $26,000 per employee.'
  const expected = 'And it can pay up to Twenty Six Thousand Dollars per employee.'
  expect(spell.process(test)).toBe(expected)
})
const { ToWords } = require('to-words')

const phoneRegex = /\d+-\d+-?\d+/g
const currencyRegex = /\$\d+(,?\d+)*/g
const numberRegex = /\d+(,?\d+)*/g
const timeRegex = /\d+:\d+/g
const acronymRegex = /[A-Z][A-Z]+/g
const letters = {
  a: 'eigh',
  b: 'bee',
  c: 'cee',
  d: 'dee',
  e: 'yee',
  f: 'ef',
  g: 'jee',
  h: 'aitch',
  i: 'eye',
  j: 'jay',
  k: 'kay',
  l: 'el',
  m: 'em',
  n: 'en',
  o: 'oh',
  p: 'pee',
  q: 'cue',
  r: 'ar',
  s: 'ess',
  t: 'tee',
  u: 'you',
  v: 'vee',
  w: 'doubleyou',
  x: 'ex',
  y: 'wy',
  z: 'zee'
}

class Spell {
  constructor(options={}) {
    this.shouldConvertNumbers = options.shouldConvertNumbers || true
    this.shouldConvertMonth = options.shouldConvertMonth || true
    this.shouldConvertPhoneNumbers = options.shouldConvertPhoneNumbers || true
    this.shouldConvertAcronyms = options.shouldConvertAcronyms || true
    this.toWords = new ToWords({
      localeCode: 'en-US',
      converterOptions: {
        currency: false,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: true,
        currencyOptions: { // can be used to override defaults for the selected locale
          name: 'Dollar',
          plural: 'Dollars',
          symbol: '$',
          fractionalUnit: {
            name: 'cent',
            plural: 'cents',
            symbol: '',
          },
        }
      },
      ...options
    })
  }

  convertPhoneNumbers(str) {
    return str.replaceAll(phoneRegex, m => m.split('').map(d=>this.toWords.convert(d)).join(' '))
  }

  convertTime(str) {
    return str.replaceAll(timeRegex, m => m.split(':').map(t=>this.convertNumbers(t)).join(' '))
  }

  convertCurrency(str) {
    return str.replaceAll(currencyRegex, m => this.toWords.convert(parseInt(m.replaceAll(/\D/g,'')), {
      currency: true
    }))
  }

  convertNumbers(str) {
    return str.replaceAll(numberRegex, m => this.toWords.convert(parseInt(m.replaceAll(/\D/g,''))))
  }

  convertAcronyms(str) {
    return str.replaceAll(acronymRegex, m => m.split('').map(l=>letters[l.toLowerCase()]).join('-'))
  }

  process(str) {
    if(this.shouldConvertPhoneNumbers){
      str = this.convertPhoneNumbers(str)
    }
    if(this.shouldConvertNumbers) {
      str = this.convertCurrency(str)
      str = this.convertTime(str)
      str = this.convertNumbers(str)
    }
    if(this.shouldConvertAcronyms){
      str = this.convertAcronyms(str)
    }
    return str
  }
}

module.exports = {
  Spell,
}
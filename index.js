const { ToWords } = require('to-words')

const { phoneRegex, currencyRegex, numberRegex, 
  timeRegex, acronymRegex, letters, acronyms
} = require('./constants')

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
    return str.replaceAll(currencyRegex, m => {
      const n = parseFloat(m.replaceAll(/[^0-9\.]/g,''))
      return this.toWords.convert(n, {
        currency: true
      })
    })
  }

  convertNumbers(str) {
    return str.replaceAll(numberRegex, m => this.toWords.convert(parseInt(m.replaceAll(/[^0-9\.]/g,''))) + ' ')
    .replaceAll('  ', ' ')
  }

  convertAcronyms(str) {
    return str.replaceAll(acronymRegex, m => {
      if(acronyms.has(m)) return m
      return m.split('').map(l=>letters[l.toLowerCase()]).join('-')
    })
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
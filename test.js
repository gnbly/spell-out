import { Spell } from './index.js'

const spell = new Spell()

const test = 'Hello, may I please make a reservation for 2 at 6:30 PM on Thursday May 18 under the name Robert Smith?'

console.log(spell.process(test))
# Spell-out

## Overview

This library is used to spell out numbers and acronyms into words that can be pronounced by Text-to-Speech (TTS) systems. It provides the flexibility to convert phone numbers, times, numbers, and acronyms into a spelled out form.

## Installation

You can install this package using npm:

```bash
npm install @gnbly/spell-out
```

Or via yarn

```bash
yarn add @gnbly/spell-out
```

## Usage

```javascript
const { Spell } = require('@gnbly/spell-out');

const spell = new Spell();

const text = 'Call me at 555-1234 at 10:30. The number is 123 and the acronym is NASA.';

const spelledOutText = spell.process(text);

console.log(spelledOutText);
```

## API

### Spell 
The main class for this library.

### Constructor
The constructor accepts an optional options object.
```javascript
const spell = new Spell({
  shouldConvertNumbers: true, // default: true
  shouldConvertMonth: true, // default: true
  shouldConvertPhoneNumbers: true, // default: true
  shouldConvertAcronyms: true, // default: true
});
```

### Methods
- `convertPhoneNumbers(str)`
Converts all phone numbers in the provided string to a spelled out form.

- `convertTime(str)`
Converts all time expressions in the provided string to a spelled out form.

- `convertNumbers(str)`
Converts all numeric values in the provided string to a spelled out form.

- `convertAcronyms(str)`
Converts all acronyms in the provided string to a spelled out form.

- `process(str)`
Processes the provided string and applies all conversion options based on the settings of the Spell instance. If a conversion option is set to false, the corresponding conversion will not be performed.

## Regular Expressions
This library uses the following regular expressions to identify phone numbers, time expressions, numeric values, and acronyms:

- `phoneRegex` for phone numbers
- `timeRegex` for time expressions
- `numberRegex` for numeric values
- `acronymRegex` for acronyms

These regular expressions are not exported by the library and cannot be modified by the user.

## Notes
The `Spell` class uses an instance of the `ToWords` class for converting numbers to words. The `ToWords` class is not exposed by this library. If you want to customize the behavior of the `ToWords` class, you can pass options to the Spell constructor. These options will be passed through to the `ToWords` constructor. For more information on the available options, refer to the `ToWords` documentation.
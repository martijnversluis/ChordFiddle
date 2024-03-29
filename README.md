# ChordFiddle [![Build Status](https://travis-ci.org/martijnversluis/ChordFiddle.svg?branch=master)](https://travis-ci.org/martijnversluis/ChordFiddle)

## [martijnversluis.github.io/ChordFiddle](https://martijnversluis.github.io/ChordFiddle/)

ChordFiddle is an online playground for ChordPro chord sheets. It currently supports:

- editing your ChordPro file
- translating to normal chords sheets
- importing a normal chord sheet and have it converted to ChordPro
- transposing the ChordPro sheet up and down (complete sheet or selection)
- switching between sharp (♯) and flat (♭) chords (complete sheet or selection)
- sharing your chord sheet by copy-pasting the automatically generated URL

On the [project board](https://github.com/martijnversluis/ChordFiddle/projects/1) you can find future features.

Technically speaking ChordFiddle is just a user interface to the combination of
[ChordSheetJS](https://github.com/martijnversluis/ChordSheetJS) and
[ChordJS](https://github.com/martijnversluis/ChordJS).

ChordFiddle is just vanilla JavaScript, with class based components inheriting from a very simple [Component class](src/js/component.js)

## Feature requests/bugs

To issue a feature request or file a bug, please feel free to
[open an issue](https://github.com/martijnversluis/ChordFiddle/issues/new).

## Contributing

Of course pull requests are more than welcome too. To get started:

- `git clone git@github.com:martijnversluis/ChordFiddle.git` or 
  `git clone https://github.com/martijnversluis/ChordFiddle.git`
- `yarn install` to install dependencies
- `yarn start` to start the development server on http://localhost:8080 and open the default browser
- make your changes
- run `yarn test` to run the tests
- `yarn build` to generate production assets
- commit and push your changes
- open a pull request


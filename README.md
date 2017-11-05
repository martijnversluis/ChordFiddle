# ChordFiddle

## [martijnversluis.github.io/ChordFiddle](https://martijnversluis.github.io/ChordFiddle/)

ChordFiddle is an online playground for ChordPro chord sheets. It currently supports:

- editing your ChordPro file
- translating to normal chords sheets
- importing a normal chord sheet and have it converted to ChordPro
- transposing the ChordPro sheet up and down (complete sheet or selection)
- switching between sharp (♯) and flat (♭) chords (complete sheet or selection)

On the [project board](https://github.com/martijnversluis/ChordFiddle/projects/1) you can find 
future features.

Technically speaking ChordFiddle is just a user interface to the combination of 
[ChordSheetJS](https://github.com/martijnversluis/ChordSheetJS) and
[ChordJS](https://github.com/martijnversluis/ChordJS).

## Feature requests/bugs

To issue a feature request or file a bug, please feel free to 
[open an issue](https://github.com/martijnversluis/ChordFiddle/issues/new).

## Contributing

Of course pull requests are more than welcome too. To get started:

- `git clone git@github.com:martijnversluis/ChordFiddle.git` or 
  `git clone https://github.com/martijnversluis/ChordFiddle.git`
- `npm install` to install dependencies
- `npm run build` to compile the Haml template, SASS files and ES2015 JavaScript files.
- commit and push your changes
- open a pull request

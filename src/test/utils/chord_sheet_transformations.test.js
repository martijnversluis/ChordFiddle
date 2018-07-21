import * as chordSheetTransformations from '../../utils/chord_sheet_transformations';

jest.mock('chordsheetjs', () => {
  class MockChordLyricsPair {
    constructor(testContent) {
      this.chords = testContent;
    }

    clone() {
      return this;
    }

    toString() {
      return this.chords;
    }
  }

  class MockTag {
    constructor(testContent) {
      this.name = testContent;
    }

    toString() {
      return `{${this.name}}`;
    }
  }

  class MockLine {
    constructor(items) {
      this.items = items;
    }

    clone() {
      return this;
    }
  }

  class MockSong {
    constructor(testContent) {
      this.lines = [
        new MockLine([
          new MockTag(testContent),
          new MockChordLyricsPair(testContent),
        ]),
      ];
    }

    clone() {
      return this;
    }
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse", "format"] }] */
  class MockChordSheetParser {
    parse(testContent) {
      return new MockSong(`converted ${testContent}`);
    }
  }

  class MockChordProParser {
    parse(testContent) {
      return new MockSong(testContent);
    }
  }

  class MockChordProFormatter {
    format(song) {
      return song.lines[0].items.join(' ');
    }
  }

  return {
    ChordSheetParser: MockChordSheetParser,
    ChordProParser: MockChordProParser,
    ChordProFormatter: MockChordProFormatter,
    ChordLyricsPair: MockChordLyricsPair,
  };
});

jest.mock('chordjs', () => (
  class MockChord {
    constructor(testContent) {
      this.testContent = testContent;
    }

    transposeUp() {
      return new MockChord(`transposeUp ${this.testContent}`);
    }

    transposeDown() {
      return new MockChord(`transposeDown ${this.testContent}`);
    }

    useModifier(modifier) {
      return new MockChord(`switchTo ${modifier} ${this.testContent}`);
    }

    toString() {
      return this.testContent;
    }

    static parse(testContent) {
      return new MockChord(testContent);
    }
  }
));

describe('chord sheet transformation', () => {
  it('can transpose a chord sheet up', () => {
    const transposedChordSheet = chordSheetTransformations.transposeUp('foobar');
    expect(transposedChordSheet).toEqual('{foobar} transposeUp foobar');
  });

  it('can transpose a chord sheet down', () => {
    const transposedChordSheet = chordSheetTransformations.transposeDown('foobar');
    expect(transposedChordSheet).toEqual('{foobar} transposeDown foobar');
  });

  it('can switch to sharp chords', () => {
    const chordSheetWithSharpChords = chordSheetTransformations.switchToSharp('foobar');
    expect(chordSheetWithSharpChords).toEqual('{foobar} switchTo # foobar');
  });

  it('can switch to flat chords', () => {
    const chordSheetWithFlatChords = chordSheetTransformations.switchToFlat('foobar');
    expect(chordSheetWithFlatChords).toEqual('{foobar} switchTo b foobar');
  });

  it('can convert a chord sheet to chord pro', () => {
    const convertedChordSheet = chordSheetTransformations.convertChordSheetToChordPro('foobar');
    expect(convertedChordSheet).toEqual('{converted foobar} converted foobar');
  });
});

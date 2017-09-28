(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chordsheetjs = require('chordsheetjs');

var _chordsheetjs2 = _interopRequireDefault(_chordsheetjs);

var _chordjs = require('chordjs');

var _chordjs2 = _interopRequireDefault(_chordjs);

var _textarea = require('./textarea');

var _textarea2 = _interopRequireDefault(_textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChordFiddle = function () {
  function ChordFiddle(_ref) {
    var editor = _ref.editor,
        _ref$previewer = _ref.previewer,
        previewer = _ref$previewer === undefined ? null : _ref$previewer;

    _classCallCheck(this, ChordFiddle);

    this.editor = editor;
    this.previewer = previewer;

    if (this.previewer) {
      this.editor.addEventListener('input', this.onEditorChange.bind(this));

      if (this.editor.value.length) {
        this.onEditorChange();
      }
    }
  }

  _createClass(ChordFiddle, [{
    key: 'onEditorChange',
    value: function onEditorChange() {
      var song = this.parseChordProSheet();
      var formatter = new _chordsheetjs2.default.TextFormatter();
      var chordSheet = formatter.format(song);
      this.previewer.value = chordSheet;
    }
  }, {
    key: 'parseChordProSheet',
    value: function parseChordProSheet() {
      var parser = new _chordsheetjs2.default.ChordProParser();
      return parser.parse(this.editor.value);
    }
  }, {
    key: 'transitChords',
    value: function transitChords(processor) {
      var _this = this;

      new _textarea2.default(this.editor).replaceSelectedText(function (selection) {
        var song = new _chordsheetjs2.default.ChordProParser().parse(selection);

        song.lines.forEach(function (line) {
          line.items.forEach(function (item) {
            _this.processChord(item, processor);
          });
        });

        var transposedSong = new _chordsheetjs2.default.ChordProFormatter().format(song);
        return transposedSong;
      });

      this.onEditorChange();
    }
  }, {
    key: 'processChord',
    value: function processChord(item, processor) {
      if (item instanceof _chordsheetjs2.default.ChordLyricsPair && item.chords) {
        var parsedChord = _chordjs2.default.parse(item.chords);
        item.chords = processor(parsedChord).toString();
      }
    }
  }, {
    key: 'transposeUp',
    value: function transposeUp() {
      this.transitChords(function (chord) {
        return chord.transposeUp();
      });
    }
  }, {
    key: 'transposeDown',
    value: function transposeDown() {
      this.transitChords(function (chord) {
        return chord.transposeDown();
      });
    }
  }, {
    key: 'switchToSharp',
    value: function switchToSharp() {
      this.transitChords(function (chord) {
        return chord.useModifier('#');
      });
    }
  }, {
    key: 'switchToFlat',
    value: function switchToFlat() {
      this.transitChords(function (chord) {
        return chord.useModifier('b');
      });
    }
  }]);

  return ChordFiddle;
}();

exports.default = ChordFiddle;

},{"./textarea":3,"chordjs":4,"chordsheetjs":9}],2:[function(require,module,exports){
'use strict';

var _chord_pro_editor = require('./chord_pro_editor');

var _chord_pro_editor2 = _interopRequireDefault(_chord_pro_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementByDataId(dataId) {
  return document.querySelector('[data-id=\'' + dataId + '\']');
}

var chordProEditor = new _chord_pro_editor2.default({
  editor: getElementByDataId('chordProEditor'),
  previewer: getElementByDataId('chordSheetTextViewer')
});

getElementByDataId('transpose-up').addEventListener('click', function () {
  chordProEditor.transposeUp();
});

getElementByDataId('transpose-down').addEventListener('click', function () {
  chordProEditor.transposeDown();
});

getElementByDataId('switch-to-sharp').addEventListener('click', function () {
  chordProEditor.switchToSharp();
});

getElementByDataId('switch-to-flat').addEventListener('click', function () {
  chordProEditor.switchToFlat();
});

},{"./chord_pro_editor":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Textarea = function () {
  function Textarea(textarea) {
    _classCallCheck(this, Textarea);

    this.textarea = textarea;
  }

  _createClass(Textarea, [{
    key: 'getInputSelection',
    value: function getInputSelection(el) {
      if (typeof this.textarea.selectionStart == 'number' && typeof this.textarea.selectionEnd == 'number') {
        return { start: this.textarea.selectionStart, end: this.textarea.selectionEnd };
      } else {
        return this.getInputSelectionFallback();
      }
    }
  }, {
    key: 'getInputSelectionFallback',
    value: function getInputSelectionFallback() {
      var range = document.selection.createRange();
      var length = this.textarea.value.length;

      if (range && range.parentElement() == this.textarea) {
        var textInputRange = this.textarea.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        var endRange = this.textarea.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
          return { start: length, end: length };
        } else {
          return this.determineSelection(textInputRange, length, endRange);
        }
      } else {
        return { start: 0, end: length };
      }
    }
  }, {
    key: 'determineSelection',
    value: function determineSelection(textInputRange, len, endRange) {
      var normalizedValue = this.textarea.value.replace(/\r\n/g, "\n");
      var start = -textInputRange.moveStart('character', -len);
      start += normalizedValue.slice(0, start).split('\n').length - 1;

      var end = void 0;

      if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
        end = len;
      } else {
        end = -textInputRange.moveEnd('character', -len);
        end += normalizedValue.slice(0, end).split('\n').length - 1;
      }

      return { start: start, end: end };
    }
  }, {
    key: 'replaceSelectedText',
    value: function replaceSelectedText(callback) {
      var currentValue = this.textarea.value;
      var selectionStart = this.textarea.selectionStart;
      var selectionEnd = this.textarea.selectionEnd;
      var hasSelection = selectionStart != selectionEnd;

      if (!hasSelection) {
        selectionStart = 0;
        selectionEnd = this.textarea.value.length;
      }

      var selectedValue = currentValue.slice(selectionStart, selectionEnd);
      var prefix = currentValue.slice(0, selectionStart);
      var suffix = currentValue.slice(selectionEnd);
      var replacement = callback(selectedValue);
      this.textarea.value = prefix + replacement + suffix;
      this.textarea.focus();

      if (hasSelection) {
        this.textarea.setSelectionRange(prefix.length, prefix.length + replacement.length);
      }
    }
  }]);

  return Textarea;
}();

exports.default = Textarea;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chordRegex = /([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?/i;
var A = 'A'.charCodeAt(0);
var G = 'G'.charCodeAt(0);

var keyUp = function keyUp(key) {
  return keyChange(key, 1);
};

var keyDown = function keyDown(key) {
  return keyChange(key, -1);
};

var keyChange = function keyChange(key, delta) {
  var charCode;
  charCode = key.toUpperCase().charCodeAt(0);
  charCode += delta;

  if (charCode > G) {
    charCode = A;
  }

  if (charCode < A) {
    charCode = G;
  }

  return String.fromCharCode(charCode);
};

var _normalize7 = function _normalize7(base, modifier) {
  if (modifier === '#' && /^(B|E)$/.test(base)) {
    return [keyUp(base), null];
  }
  if (modifier === 'b' && /^(C|F)$/.test(base)) {
    return [keyDown(base), null];
  }
  return [base, modifier];
};

var internalSwitchModifier = function internalSwitchModifier(base, modifier) {
  if (modifier === '#') {
    return [keyUp(base), 'b'];
  }
  if (modifier === 'b') {
    return [keyDown(base), '#'];
  }
};

var _switchModifier = function _switchModifier(base, modifier) {
  var _normalize = _normalize7(base, modifier);

  var _normalize2 = _slicedToArray(_normalize, 2);

  base = _normalize2[0];
  modifier = _normalize2[1];


  if (modifier) {
    return internalSwitchModifier(base, modifier);
  }

  return [base, modifier];
};

var _useModifier = function _useModifier(base, modifier, newModifier) {
  if (modifier && modifier !== newModifier) {
    return internalSwitchModifier(base, modifier);
  }

  return [base, modifier];
};

var _transpose = function _transpose(base, modifier, delta) {
  var newBase = base,
      newModifier = modifier;


  if (delta < 0) {
    var _repeatProcessor = repeatProcessor(base, modifier, _transposeDown, Math.abs(delta));

    var _repeatProcessor2 = _slicedToArray(_repeatProcessor, 2);

    newBase = _repeatProcessor2[0];
    newModifier = _repeatProcessor2[1];
  } else if (delta > 0) {
    var _repeatProcessor3 = repeatProcessor(base, modifier, _transposeUp, delta);

    var _repeatProcessor4 = _slicedToArray(_repeatProcessor3, 2);

    newBase = _repeatProcessor4[0];
    newModifier = _repeatProcessor4[1];
  }

  return _useModifier(newBase, newModifier, modifier);
};

var repeatProcessor = function repeatProcessor(base, modifier, processor, amount) {
  for (var i = 0; i < amount; i++) {
    var _processor = processor(base, modifier);

    var _processor2 = _slicedToArray(_processor, 2);

    base = _processor2[0];
    modifier = _processor2[1];
  }

  return [base, modifier];
};

var _transposeUp = function _transposeUp(base, modifier) {
  var _normalize3 = _normalize7(base, modifier);

  var _normalize4 = _slicedToArray(_normalize3, 2);

  base = _normalize4[0];
  modifier = _normalize4[1];


  if (modifier === 'b') {
    return [base, null];
  }

  if (modifier === '#') {
    return [keyUp(base), null];
  }

  if (/^(B|E)$/.test(base)) {
    return [keyUp(base), null];
  }

  return [base, '#'];
};

var _transposeDown = function _transposeDown(base, modifier) {
  var _normalize5 = _normalize7(base, modifier);

  var _normalize6 = _slicedToArray(_normalize5, 2);

  base = _normalize6[0];
  modifier = _normalize6[1];


  if (modifier === 'b') {
    return [keyDown(base), null];
  }

  if (modifier === '#') {
    return [base, null];
  }

  if (/^(C|F)$/.test(base)) {
    return [keyDown(base), null];
  }

  return [base, 'b'];
};

var processChord = function processChord(sourceChord, processor, processorArg) {
  var chord = sourceChord.clone();

  var _processor3 = processor(sourceChord.base, sourceChord.modifier, processorArg);

  var _processor4 = _slicedToArray(_processor3, 2);

  chord.base = _processor4[0];
  chord.modifier = _processor4[1];


  if (sourceChord.bassBase) {
    var _processor5 = processor(sourceChord.bassBase, sourceChord.bassModifier, processorArg);

    var _processor6 = _slicedToArray(_processor5, 2);

    chord.bassBase = _processor6[0];
    chord.bassModifier = _processor6[1];
  }

  return chord;
};

var Chord = function () {
  _createClass(Chord, null, [{
    key: 'parse',
    value: function parse(chordString) {
      var parts = chordRegex.exec(chordString);

      if (parts) {
        var _parts = _slicedToArray(parts, 7),
            base = _parts[1],
            modifier = _parts[2],
            suffix = _parts[3],
            bassBase = _parts[5],
            bassModifier = _parts[6];

        return new Chord({ base: base, modifier: modifier, suffix: suffix, bassBase: bassBase, bassModifier: bassModifier });
      }

      return null;
    }
  }]);

  function Chord(_ref) {
    var base = _ref.base,
        modifier = _ref.modifier,
        suffix = _ref.suffix,
        bassBase = _ref.bassBase,
        bassModifier = _ref.bassModifier;

    _classCallCheck(this, Chord);

    this.base = base || null;
    this.modifier = modifier || null;
    this.suffix = suffix || null;
    this.bassBase = bassBase || null;
    this.bassModifier = bassModifier || null;
  }

  _createClass(Chord, [{
    key: 'clone',
    value: function clone() {
      var base = this.base,
          modifier = this.modifier,
          suffix = this.suffix,
          bassBase = this.bassBase,
          bassModifier = this.bassModifier;

      return new Chord({ base: base, modifier: modifier, suffix: suffix, bassBase: bassBase, bassModifier: bassModifier });
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      return processChord(this, _normalize7);
    }
  }, {
    key: 'switchModifier',
    value: function switchModifier() {
      return processChord(this, _switchModifier);
    }
  }, {
    key: 'useModifier',
    value: function useModifier(newModifier) {
      return processChord(this, _useModifier, newModifier);
    }
  }, {
    key: 'transposeUp',
    value: function transposeUp() {
      return processChord(this, _transposeUp);
    }
  }, {
    key: 'transposeDown',
    value: function transposeDown() {
      return processChord(this, _transposeDown);
    }
  }, {
    key: 'transpose',
    value: function transpose(delta) {
      return processChord(this, _transpose, delta);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var chordString = this.base + (this.modifier || '') + (this.suffix || '');

      if (this.bassBase) {
        chordString += '/' + this.bassBase + (this.bassModifier || '');
      }

      return chordString;
    }
  }]);

  return Chord;
}();

exports.default = Chord;
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChordLyricsPair = function ChordLyricsPair() {
  _classCallCheck(this, ChordLyricsPair);

  this.chords = '';
  this.lyrics = '';
};

exports.default = ChordLyricsPair;
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chord_lyrics_pair = require('./chord_lyrics_pair');

var _chord_lyrics_pair2 = _interopRequireDefault(_chord_lyrics_pair);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  function Line() {
    _classCallCheck(this, Line);

    this.items = [];
    this.currentChordLyricsPair = null;
  }

  _createClass(Line, [{
    key: 'addChordLyricsPair',
    value: function addChordLyricsPair() {
      this.currentChordLyricsPair = (0, _utilities.pushNew)(this.items, _chord_lyrics_pair2.default);
      return this.currentChordLyricsPair;
    }
  }, {
    key: 'ensureChordLyricsPair',
    value: function ensureChordLyricsPair() {
      if (!this.currentChordLyricsPair) {
        this.addChordLyricsPair();
      }
    }
  }, {
    key: 'chords',
    value: function chords(chr) {
      this.ensureChordLyricsPair();
      this.currentChordLyricsPair.chords += chr;
    }
  }, {
    key: 'lyrics',
    value: function lyrics(chr) {
      this.ensureChordLyricsPair();
      this.currentChordLyricsPair.lyrics += chr;
    }
  }, {
    key: 'addTag',
    value: function addTag(name, value) {
      var tag = name instanceof _tag2.default ? name : new _tag2.default(name, value);
      this.items.push(tag);
      return tag;
    }
  }]);

  return Line;
}();

exports.default = Line;
},{"../utilities":16,"./chord_lyrics_pair":5,"./tag":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TITLE = 'title';
var SUBTITLE = 'subtitle';

var Song = function () {
  function Song() {
    var metaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Song);

    this.lines = [];
    this.currentLine = null;
    this.metaData = metaData;
  }

  _createClass(Song, [{
    key: 'chords',
    value: function chords(chr) {
      this.currentLine.chords(chr);
    }
  }, {
    key: 'lyrics',
    value: function lyrics(chr) {
      this.ensureLine();
      this.currentLine.lyrics(chr);
    }
  }, {
    key: 'addLine',
    value: function addLine() {
      this.currentLine = (0, _utilities.pushNew)(this.lines, _line2.default);
      return this.currentLine;
    }
  }, {
    key: 'addChordLyricsPair',
    value: function addChordLyricsPair() {
      this.ensureLine();
      return this.currentLine.addChordLyricsPair();
    }
  }, {
    key: 'dropLine',
    value: function dropLine() {
      this.lines.pop();
    }
  }, {
    key: 'ensureLine',
    value: function ensureLine() {
      if (!this.currentLine) {
        this.addLine();
      }
    }
  }, {
    key: 'addTag',
    value: function addTag(name, value) {
      var tag = new _tag2.default(name, value);

      if (tag.isMetaTag()) {
        this.metaData[tag.name] = tag.value;
      }

      this.ensureLine();
      this.currentLine.addTag(tag);

      return tag;
    }
  }, {
    key: 'title',
    get: function get() {
      return this.metaData[TITLE] || "";
    }
  }, {
    key: 'subtitle',
    get: function get() {
      return this.metaData[SUBTITLE] || "";
    }
  }]);

  return Song;
}();

exports.default = Song;
},{"../utilities":16,"./line":6,"./tag":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var META_TAGS = ['title', 'subtitle'];

var ALIASES = {
  t: 'title',
  st: 'subtitle'
};

var translateTagNameAlias = function translateTagNameAlias(name) {
  if (name in ALIASES) {
    return ALIASES[name];
  }

  return name;
};

var Tag = function () {
  function Tag(name, value) {
    _classCallCheck(this, Tag);

    this.name = name;
    this.value = value;
  }

  _createClass(Tag, [{
    key: 'hasValue',
    value: function hasValue() {
      return !!this._value.trim().length;
    }
  }, {
    key: 'isMetaTag',
    value: function isMetaTag() {
      return META_TAGS.indexOf(this.name) !== -1;
    }
  }, {
    key: 'name',
    set: function set(name) {
      this._name = translateTagNameAlias(name);
      this._originalName = name;
    },
    get: function get() {
      return this._name.trim();
    }
  }, {
    key: 'originalName',
    get: function get() {
      return this._originalName.trim();
    }
  }, {
    key: 'value',
    set: function set(value) {
      this._value = value;
    },
    get: function get() {
      return this._value.trim();
    }
  }]);

  return Tag;
}();

exports.default = Tag;
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chord_pro_parser = require('./parser/chord_pro_parser');

var _chord_pro_parser2 = _interopRequireDefault(_chord_pro_parser);

var _chord_sheet_parser = require('./parser/chord_sheet_parser');

var _chord_sheet_parser2 = _interopRequireDefault(_chord_sheet_parser);

var _text_formatter = require('./formatter/text_formatter');

var _text_formatter2 = _interopRequireDefault(_text_formatter);

var _html_formatter = require('./formatter/html_formatter');

var _html_formatter2 = _interopRequireDefault(_html_formatter);

var _chord_pro_formatter = require('./formatter/chord_pro_formatter');

var _chord_pro_formatter2 = _interopRequireDefault(_chord_pro_formatter);

var _chord_lyrics_pair = require('./chord_sheet/chord_lyrics_pair');

var _chord_lyrics_pair2 = _interopRequireDefault(_chord_lyrics_pair);

var _line = require('./chord_sheet/line');

var _line2 = _interopRequireDefault(_line);

var _song = require('./chord_sheet/song');

var _song2 = _interopRequireDefault(_song);

var _tag = require('./chord_sheet/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  ChordProParser: _chord_pro_parser2.default,
  ChordSheetParser: _chord_sheet_parser2.default,
  TextFormatter: _text_formatter2.default,
  HtmlFormatter: _html_formatter2.default,
  ChordProFormatter: _chord_pro_formatter2.default,
  ChordLyricsPair: _chord_lyrics_pair2.default,
  Line: _line2.default,
  Song: _song2.default,
  Tag: _tag2.default
};
},{"./chord_sheet/chord_lyrics_pair":5,"./chord_sheet/line":6,"./chord_sheet/song":7,"./chord_sheet/tag":8,"./formatter/chord_pro_formatter":10,"./formatter/html_formatter":12,"./formatter/text_formatter":13,"./parser/chord_pro_parser":14,"./parser/chord_sheet_parser":15}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formatter_base = require('./formatter_base');

var _formatter_base2 = _interopRequireDefault(_formatter_base);

var _tag = require('../chord_sheet/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEW_LINE = '\n';

var ChordProFormatter = function (_FormatterBase) {
  _inherits(ChordProFormatter, _FormatterBase);

  function ChordProFormatter() {
    _classCallCheck(this, ChordProFormatter);

    return _possibleConstructorReturn(this, (ChordProFormatter.__proto__ || Object.getPrototypeOf(ChordProFormatter)).call(this));
  }

  _createClass(ChordProFormatter, [{
    key: 'formatItem',
    value: function formatItem(item) {
      if (item instanceof _tag2.default) {
        this.output(this.formatTag(item));
      } else {
        if (item.chords) {
          this.output('[' + item.chords + ']');
        }

        if (item.lyrics) {
          this.output(item.lyrics);
        }
      }
    }
  }, {
    key: 'formatTag',
    value: function formatTag(tag) {
      if (tag.hasValue()) {
        return '{' + tag.originalName + ': ' + tag.value + '}';
      }

      return '{' + tag.originalName + '}';
    }
  }, {
    key: 'endOfSong',
    value: function endOfSong() {}
  }, {
    key: 'newLine',
    value: function newLine() {
      if (this.stringOutput) {
        this.output(NEW_LINE);
      }
    }
  }]);

  return ChordProFormatter;
}(_formatter_base2.default);

exports.default = ChordProFormatter;
},{"../chord_sheet/tag":8,"./formatter_base":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormatterBase = function () {
  function FormatterBase() {
    _classCallCheck(this, FormatterBase);

    this.stringOutput = '';
  }

  _createClass(FormatterBase, [{
    key: 'output',
    value: function output(str) {
      this.stringOutput += str;
    }
  }, {
    key: 'format',
    value: function format(song) {
      var _this = this;

      this.formatMetaData(song);

      song.lines.forEach(function (line) {
        _this.newLine();

        line.items.forEach(function (item) {
          _this.formatItem(item);
        });
      });

      this.endOfSong();
      return this.stringOutput;
    }
  }, {
    key: 'formatMetaData',
    value: function formatMetaData(name, value) {}
  }]);

  return FormatterBase;
}();

exports.default = FormatterBase;
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formatter_base = require('./formatter_base');

var _formatter_base2 = _interopRequireDefault(_formatter_base);

var _tag = require('../chord_sheet/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPACE = '&nbsp;';

var HtmlFormatter = function (_FormatterBase) {
  _inherits(HtmlFormatter, _FormatterBase);

  function HtmlFormatter() {
    _classCallCheck(this, HtmlFormatter);

    var _this = _possibleConstructorReturn(this, (HtmlFormatter.__proto__ || Object.getPrototypeOf(HtmlFormatter)).call(this));

    _this.dirtyLine = false;
    _this.lineEmpty = true;
    _this.chordsLine = '';
    _this.lyricsLine = '';
    return _this;
  }

  _createClass(HtmlFormatter, [{
    key: 'formatMetaData',
    value: function formatMetaData(song) {
      if (song.title) {
        this.output('<h1>' + song.title + '</h1>');
      }

      if (song.subtitle) {
        this.output('<h2>' + song.subtitle + '</h2>');
      }
    }
  }, {
    key: 'formatItem',
    value: function formatItem(item) {
      if (item instanceof _tag2.default) {
        return;
      }

      var chords = item.chords.trim();
      var lyrics = item.lyrics.trim();

      if (chords.length || lyrics.length) {
        if (chords.length > lyrics.length) {
          chords += SPACE;
        } else if (lyrics.length > chords.length) {
          lyrics += SPACE;
        }

        this.chordsLine += this.cell('chord', chords);
        this.lyricsLine += this.cell('lyrics', lyrics);
      }

      this.dirtyLine = true;
    }
  }, {
    key: 'finishLine',
    value: function finishLine() {
      var rows = this.row(this.chordsLine) + this.row(this.lyricsLine);
      this.output(this.table(rows));
      this.chordsLine = '';
      this.lyricsLine = '';
    }
  }, {
    key: 'newLine',
    value: function newLine() {
      if (this.dirtyLine) {
        this.finishLine();
      }
    }
  }, {
    key: 'endOfSong',
    value: function endOfSong() {
      if (this.dirtyLine) {
        this.finishLine();
      }
    }
  }, {
    key: 'cell',
    value: function cell(cssClass, value) {
      return '<td class="' + cssClass + '">' + value + '</td>';
    }
  }, {
    key: 'row',
    value: function row(contents) {
      var attr = contents ? '' : ' class="empty-line"';
      return '<tr' + attr + '>' + contents + '</tr>';
    }
  }, {
    key: 'table',
    value: function table(contents) {
      return '<table>' + contents + '</table>';
    }
  }]);

  return HtmlFormatter;
}(_formatter_base2.default);

exports.default = HtmlFormatter;
},{"../chord_sheet/tag":8,"./formatter_base":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formatter_base = require('./formatter_base');

var _formatter_base2 = _interopRequireDefault(_formatter_base);

var _tag = require('../chord_sheet/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEW_LINE = '\n';

var TextFormatter = function (_FormatterBase) {
  _inherits(TextFormatter, _FormatterBase);

  function TextFormatter() {
    _classCallCheck(this, TextFormatter);

    var _this = _possibleConstructorReturn(this, (TextFormatter.__proto__ || Object.getPrototypeOf(TextFormatter)).call(this));

    _this.dirtyLine = false;
    _this.chordsLine = '';
    _this.lyricsLine = '';
    return _this;
  }

  _createClass(TextFormatter, [{
    key: 'finishLine',
    value: function finishLine() {
      var output = '';

      if (this.chordsLine.trim().length) {
        output += this.chordsLine.trimRight() + NEW_LINE;
      }

      output += this.lyricsLine.trimRight() + NEW_LINE;
      this.output(output);
      this.chordsLine = '';
      this.lyricsLine = '';
    }
  }, {
    key: 'endOfSong',
    value: function endOfSong() {
      if (this.dirtyLine) {
        this.finishLine();
      } else {
        this.output(NEW_LINE);
      }
    }
  }, {
    key: 'newLine',
    value: function newLine() {
      if (this.dirtyLine) {
        this.finishLine();
      }
    }
  }, {
    key: 'padString',
    value: function padString(str, length) {
      for (var l = str.length; l < length; l++, str += ' ') {}
      return str;
    }
  }, {
    key: 'formatMetaData',
    value: function formatMetaData(song) {
      var title = song.title;
      var subtitle = song.subtitle;

      if (title) {
        this.output(title.toUpperCase() + NEW_LINE);
      }

      if (subtitle) {
        this.output(subtitle.trim() + NEW_LINE);
      }

      if (title || subtitle) {
        this.output(NEW_LINE);
      }
    }
  }, {
    key: 'formatItem',
    value: function formatItem(item) {
      if (item instanceof _tag2.default) {
        if (!item.isMetaTag()) {
          this.lyricsLine += this.formatTag(item);
          this.dirtyLine = true;
        }

        return;
      }

      var chordsLength = item.chords.length;

      if (chordsLength) {
        chordsLength++;
      }

      var length = Math.max(chordsLength, item.lyrics.length);
      this.chordsLine += this.padString(item.chords, length);
      this.lyricsLine += this.padString(item.lyrics, length);
      this.dirtyLine = true;
    }
  }, {
    key: 'formatTag',
    value: function formatTag(tag) {
      if (tag.value.length) {
        return tag.value;
      }

      return tag.name;
    }
  }]);

  return TextFormatter;
}(_formatter_base2.default);

exports.default = TextFormatter;
},{"../chord_sheet/tag":8,"./formatter_base":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _song = require('../chord_sheet/song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NEW_LINE = '\n';
var SQUARE_START = '[';
var SQUARE_END = ']';
var CURLY_START = '{';
var CURLY_END = '}';
var COLON = ':';
var SHARP_SIGN = '#';

var ChordProParser = function () {
  function ChordProParser() {
    _classCallCheck(this, ChordProParser);
  }

  _createClass(ChordProParser, [{
    key: 'parse',
    value: function parse(document) {
      this.song = new _song2.default();
      this.resetTag();
      this.processor = this.readLyrics;
      this.parseDocument(document);
      return this.song;
    }
  }, {
    key: 'parseDocument',
    value: function parseDocument(document) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = document[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var chr = _step.value;

          this.processor(chr);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'readLyrics',
    value: function readLyrics(chr) {
      switch (chr) {
        case SHARP_SIGN:
          this.processor = this.readComment;
          break;
        case NEW_LINE:
          this.song.addLine();
          break;
        case SQUARE_START:
          this.song.addChordLyricsPair();
          this.processor = this.readChords;
          break;
        case CURLY_START:
          this.processor = this.readTagName;
          break;
        default:
          this.song.lyrics(chr);
      }
    }
  }, {
    key: 'readChords',
    value: function readChords(chr) {
      switch (chr) {
        case NEW_LINE:
          break;
        case SQUARE_START:
          break;
        case SQUARE_END:
          this.processor = this.readLyrics;
          break;
        default:
          this.song.chords(chr);
      }
    }
  }, {
    key: 'readTagName',
    value: function readTagName(chr) {
      switch (chr) {
        case COLON:
          this.processor = this.readTagValue;
          break;
        case CURLY_END:
          this.finishTag();
          this.processor = this.readLyrics;
          break;
        default:
          this.tagName += chr;
      }
    }
  }, {
    key: 'readTagValue',
    value: function readTagValue(chr) {
      switch (chr) {
        case CURLY_END:
          this.finishTag();
          this.processor = this.readLyrics;
          break;
        default:
          this.tagValue += chr;
      }
    }
  }, {
    key: 'readComment',
    value: function readComment(chr) {
      switch (chr) {
        case NEW_LINE:
          this.processor = this.readLyrics;
          break;
      }
    }
  }, {
    key: 'finishTag',
    value: function finishTag() {
      this.song.addTag(this.tagName, this.tagValue);
      this.resetTag();
    }
  }, {
    key: 'resetTag',
    value: function resetTag() {
      this.tagName = '';
      this.tagValue = '';
    }
  }]);

  return ChordProParser;
}();

exports.default = ChordProParser;
},{"../chord_sheet/song":7}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _song = require('../chord_sheet/song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WHITE_SPACE = /\s/;
var CHORD_LINE_REGEX = /^\s*((([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?)(\s|$)+)+(\s|$)+/;

var ChordSheetParser = function () {
  function ChordSheetParser() {
    _classCallCheck(this, ChordSheetParser);
  }

  _createClass(ChordSheetParser, [{
    key: 'parse',
    value: function parse(document) {
      this.initialize(document);

      while (this.hasNextLine()) {
        var line = this.readLine();
        this.parseLine(line);
      }

      return this.song;
    }
  }, {
    key: 'parseLine',
    value: function parseLine(line) {
      this.songLine = this.song.addLine();

      if (line.trim().length === 0) {
        this.chordLyricsPair = null;
      } else {
        this.chordLyricsPair = this.songLine.addChordLyricsPair();

        if (CHORD_LINE_REGEX.test(line) && this.hasNextLine()) {
          var nextLine = this.readLine();
          this.parseLyricsWithChords(line, nextLine);
        } else {
          this.chordLyricsPair.lyrics = line + '';
        }
      }
    }
  }, {
    key: 'initialize',
    value: function initialize(document) {
      this.song = new _song2.default();
      this.lines = document.split("\n");
      this.currentLine = 0;
      this.lineCount = this.lines.length;
      this.processingText = false;
    }
  }, {
    key: 'readLine',
    value: function readLine() {
      var line = this.lines[this.currentLine];
      this.currentLine++;
      return line;
    }
  }, {
    key: 'hasNextLine',
    value: function hasNextLine() {
      return this.currentLine < this.lineCount;
    }
  }, {
    key: 'parseLyricsWithChords',
    value: function parseLyricsWithChords(line, nextLine) {
      this.processCharacters(line, nextLine);

      this.chordLyricsPair.lyrics += nextLine.substring(line.length);

      this.chordLyricsPair.chords = this.chordLyricsPair.chords.trim();
      this.chordLyricsPair.lyrics = this.chordLyricsPair.lyrics.trim();

      if (!nextLine.trim().length) {
        this.songLine = this.song.addLine();
      }
    }
  }, {
    key: 'processCharacters',
    value: function processCharacters(line, nextLine) {
      for (var c = 0, charCount = line.length; c < charCount; c++) {
        var chr = line[c];

        if (WHITE_SPACE.test(chr)) {
          this.processingText = false;
        } else {
          this.ensureChordLyricsPairInitialized();
          this.chordLyricsPair.chords += chr;
        }

        this.chordLyricsPair.lyrics += nextLine[c] || '';
      }
    }
  }, {
    key: 'ensureChordLyricsPairInitialized',
    value: function ensureChordLyricsPairInitialized() {
      if (!this.processingText) {
        this.chordLyricsPair = this.songLine.addChordLyricsPair();
        this.processingText = true;
      }
    }
  }]);

  return ChordSheetParser;
}();

exports.default = ChordSheetParser;
},{"../chord_sheet/song":7}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pushNew = exports.pushNew = function pushNew(collection, klass) {
  var newObject = new klass();
  collection.push(newObject);
  return newObject;
};
},{}]},{},[2]);

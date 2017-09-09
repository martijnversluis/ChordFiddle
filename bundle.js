(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chordsheetjs = require('chordsheetjs');

var _chordsheetjs2 = _interopRequireDefault(_chordsheetjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChordFiddle = function () {
  function ChordFiddle(node) {
    _classCallCheck(this, ChordFiddle);

    this.chordProEditor = node.querySelector('[data-id="chordProEditor"]');
    this.chordSheetTextViewer = node.querySelector('[data-id="chordSheetTextViewer"]');
    this.chordProEditor.addEventListener('input', this.onChordProEditorChange.bind(this));
  }

  _createClass(ChordFiddle, [{
    key: 'onChordProEditorChange',
    value: function onChordProEditorChange() {
      var parser = new _chordsheetjs2.default.ChordProParser();
      var song = parser.parse(this.chordProEditor.value);
      var formatter = new _chordsheetjs2.default.TextFormatter();
      var chordSheet = formatter.format(song);
      this.chordSheetTextViewer.value = chordSheet;
    }
  }]);

  return ChordFiddle;
}();

exports.default = ChordFiddle;

},{"chordsheetjs":7}],2:[function(require,module,exports){
'use strict';

var _chord_fiddle = require('./chord_fiddle');

var _chord_fiddle2 = _interopRequireDefault(_chord_fiddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _chord_fiddle2.default(document.body).onChordProEditorChange();

},{"./chord_fiddle":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function Item() {
  _classCallCheck(this, Item);

  this.chords = '';
  this.lyrics = '';
};

exports.default = Item;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  function Line() {
    _classCallCheck(this, Line);

    this.items = [];
    this.currentItem = null;
  }

  _createClass(Line, [{
    key: 'addItem',
    value: function addItem() {
      this.currentItem = (0, _utilities.pushNew)(this.items, _item2.default);
      return this.currentItem;
    }
  }, {
    key: 'ensureItem',
    value: function ensureItem() {
      if (!this.currentItem) {
        this.addItem();
      }
    }
  }, {
    key: 'chords',
    value: function chords(chr) {
      this.ensureItem();
      this.currentItem.chords += chr;
    }
  }, {
    key: 'lyrics',
    value: function lyrics(chr) {
      this.ensureItem();
      this.currentItem.lyrics += chr;
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
},{"../utilities":14,"./item":3,"./tag":6}],5:[function(require,module,exports){
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
    key: 'addItem',
    value: function addItem() {
      this.ensureLine();
      return this.currentLine.addItem();
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
        this.dropLine();
      } else {
        this.ensureLine();
        this.currentLine.addTag(tag);
      }

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
},{"../utilities":14,"./line":4,"./tag":6}],6:[function(require,module,exports){
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

    this._name = translateTagNameAlias(name);
    this._value = value;
  }

  _createClass(Tag, [{
    key: 'isMetaTag',
    value: function isMetaTag() {
      return META_TAGS.indexOf(this.name) !== -1;
    }
  }, {
    key: 'name',
    set: function set(name) {
      this._name = name;
    },
    get: function get() {
      return this._name.trim();
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
},{}],7:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { ChordProParser: _chord_pro_parser2.default, ChordSheetParser: _chord_sheet_parser2.default, TextFormatter: _text_formatter2.default, HtmlFormatter: _html_formatter2.default, ChordProFormatter: _chord_pro_formatter2.default };
},{"./formatter/chord_pro_formatter":8,"./formatter/html_formatter":10,"./formatter/text_formatter":11,"./parser/chord_pro_parser":12,"./parser/chord_sheet_parser":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formatter_base = require('./formatter_base');

var _formatter_base2 = _interopRequireDefault(_formatter_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEW_LINE = '\n';

var ChordProFormatter = function (_FormatterBase) {
  _inherits(ChordProFormatter, _FormatterBase);

  function ChordProFormatter() {
    _classCallCheck(this, ChordProFormatter);

    var _this = _possibleConstructorReturn(this, (ChordProFormatter.__proto__ || Object.getPrototypeOf(ChordProFormatter)).call(this));

    _this.dirtyLine = false;
    return _this;
  }

  _createClass(ChordProFormatter, [{
    key: 'formatItem',
    value: function formatItem(item) {
      if (item.chords) {
        this.output('[' + item.chords + ']');
      }

      this.output(item.lyrics);
      this.dirtyLine = true;
    }
  }, {
    key: 'endOfSong',
    value: function endOfSong() {
      this.newLine();
    }
  }, {
    key: 'newLine',
    value: function newLine() {
      this.output(NEW_LINE);
    }
  }]);

  return ChordProFormatter;
}(_formatter_base2.default);

exports.default = ChordProFormatter;
},{"./formatter_base":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"../chord_sheet/tag":6,"./formatter_base":9}],11:[function(require,module,exports){
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
        this.lyricsLine += this.formatTag(item);
        this.dirtyLine = true;
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
},{"../chord_sheet/tag":6,"./formatter_base":9}],12:[function(require,module,exports){
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
          this.song.addItem();
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
},{"../chord_sheet/song":5}],13:[function(require,module,exports){
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
        this.songItem = null;
      } else {
        this.songItem = this.songLine.addItem();

        if (CHORD_LINE_REGEX.test(line) && this.hasNextLine()) {
          var nextLine = this.readLine();
          this.parseLyricsWithChords(line, nextLine);
        } else {
          this.songItem.lyrics = line + '';
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

      this.songItem.lyrics += nextLine.substring(line.length);

      this.songItem.chords = this.songItem.chords.trim();
      this.songItem.lyrics = this.songItem.lyrics.trim();

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
          this.ensureItemInitialized();
          this.songItem.chords += chr;
        }

        this.songItem.lyrics += nextLine[c] || '';
      }
    }
  }, {
    key: 'ensureItemInitialized',
    value: function ensureItemInitialized() {
      if (!this.processingText) {
        this.songItem = this.songLine.addItem();
        this.processingText = true;
      }
    }
  }]);

  return ChordSheetParser;
}();

exports.default = ChordSheetParser;
},{"../chord_sheet/song":5}],14:[function(require,module,exports){
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

ace.define("ace/mode/cypher_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var CypherHighlightRules = function() {

    this.$rules = { start:
       [ { include: '#comments' },
         { include: '#constants' },
         { include: '#keywords' },
         { include: '#functions' },
         { include: '#path-patterns' },
         { include: '#operators' },
         { include: '#identifiers' },
         { include: '#properties_literal' },
         { include: '#numbers' },
         { include: '#strings' } ],
      '#comments': [ { token: 'comment.line.double-slash.cypher', regex: '//.*$' } ],
      '#constants':
       [ { token: 'constant.language.bool.cypher',
           regex: '\\bTRUE|true|FALSE|false\\b' } ],
      '#functions':
       [ { token: 'keyword.control.function.boolean.cypher',
           regex: '\\bNOT(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.predicate.cypher',
           regex: '\\b(?:ALL|ANY|NONE|SINGLE)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.scalar.cypher',
           regex: '\\b(?:LENGTH|TYPE|ID|COALESCE|HEAD|LAST)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.collection.cypher',
           regex: '\\b(?:NODES|RELATIONSHIPS|EXTRACT|FILTER|TAIL|RANGE|REDUCE)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.math.cypher',
           regex: '\\b(?:ABS|ROUND|SQRT|SIGN)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.aggregation.cypher',
           regex: '\\b(?:count|sum|avg|max|min|percentile_disc|percentile_cont|collect)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' },
         { token: 'support.function.string.cypher',
           regex: '\\b(?:STR|REPLACE|SUBSTRING|LEFT|RIGHT|LTRIM|RTRIM|TRIM|LOWER|UPPER)(?=\\s*\\()',
           caseInsensitive: true,
           comment: 'List of Cypher built-in functions from http://docs.neo4j.org/chunked/milestone/query-function.html' } ],
      '#identifiers':
       [ { token: 'variable.other.quoted-identifier.cypher',
           regex: '`.+?`' },
         { token: 'variable.other.identifier.cypher',
           regex: '[a-zA-Z_][a-zA-Z0-9_]*' } ],
      '#keywords':
       [ { token: 'keyword.control.clause.cypher',
           regex: '\\b(?:MERGE|START|MATCH|WHERE|RETURN|CREATE|DELETE|SET|FOREACH|WITH|CYPHER|DISTINCT|AS|LIMIT|SKIP|UNIQUE|ORDER\\s+BY)\\b',
           caseInsensitive: true },
         { token: 'keyword.other.order.cypher',
           regex: '\\b(?:DESC|ASC)\\b',
           caseInsensitive: true },
         { token:
            [ 'support.class.starting-functions-point.cypher',
              'keyword.control.index-seperator.cypher',
              'support.class.index.cypher' ],
           regex: '\\b(node|relationship|rel)(?:(:)([a-zA-Z_-][a-zA-Z0-9_]*))?(?=\\s*\\()',
           caseInsensitive: true,
           push:
            [ { token: 'source.starting-functions.cypher',
                regex: '\\)',
                next: 'pop' },
              { token: 'variable.parameter.relationship-name.cypher',
                regex: '`.+?`|[a-zA-Z_][a-zA-Z0-9_]*' },
              { token: 'keyword.control.starting-function-params,cypher',
                regex: '\\*' },
              { include: '#comments' },
              { include: '#numbers' },
              { include: '#strings' },
              { defaultToken: 'source.starting-functions.cypher' } ] } ],
      '#numbers':
       [ { token: 'constant.numeric.cypher',
           regex: '\\b\\d+(?:\\.\\d+)?\\b' } ],
      '#operators':
       [ { token: 'keyword.operator.math.cypher',
           regex: '\\+|\\-|\\/|\\*|\\%|\\?|!' },
         { token: 'keyword.operator.compare.cypher',
           regex: '<=|=>|<>|<|>|=~|=' },
         { token: 'keyword.operator.logical.cypher',
           regex: '\\b(?:OR|AND)\\b',
           caseInsensitive: true },
         { token: 'keyword.operator.in.cypher',
           regex: '\\bIN\\b',
           caseInsensitive: true } ],
      '#path-patterns':
       [ { token: 'support.function.relationship-pattern.cypher',
           regex: '<--|-->|--' },
         { token:
            [ 'support.function.relationship-pattern-start.cypher',
              'keyword.operator.relationship-pattern-start.cypher' ],
           regex: '(<-|-)(\\[)',
           push:
            [ { token:
                 [ 'keyword.operator.relationship-patern-end.cypher',
                   'support.function.relationship-pattern-start.cypher' ],
                regex: '(])(->|-)',
                next: 'pop' },
              { include: '#identifiers' },
              { token:
                 [ 'keyword.operator.relationship-type-start.cypher',
                   'entity.name.class.relationship.type.cypher' ],
                regex: '(:)(`.+?`|[a-zA-Z_][a-zA-Z0-9_]*)' },
              { token:
                 [ 'support.type.operator.relationship-type-or.cypher',
                   'entity.name.class.relationship.type-or.cypher',
                   'entity.name.class.relationship-type-ored.cypher' ],
                regex: '(\\|)(\\s*)(`.+?`|[a-zA-Z_][a-zA-Z0-9_]*)' },
              { token: 'support.function.relationship-pattern.quant.cypher',
                regex: '(?:\\?\\*|\\?|\\*)\\s*(?:\\d+\\s*(?:\\.\\.\\s*\\d+)?)?' },
              { include: '#properties_literal' },
              { defaultToken: 'path-pattern.cypher' } ] } ],
      '#properties_literal':
       [ { token: 'keyword.control.properties_literal.cypher',
           regex: '{',
           push:
            [ { token: 'keyword.control.properties_literal.cypher',
                regex: '}',
                next: 'pop' },
              { token: 'keyword.control.properties_literal.seperator.cypher',
                regex: ':|,' },
              { include: '#comments' },
              { include: '#constants' },
              { include: '#functions' },
              { include: '#operators' },
              { include: '#identifiers' },
              { include: '#numbers' },
              { include: '#strings' },
              { defaultToken: 'source.cypher' } ] } ],
      '#string_escape':
       [ { token:
            [ 'constant.character.escape.cypher',
              'string.quoted.double.cypher' ],
           regex: '(\\\\\\\\|\\\\[tbnrf])|(\\\\\'|\\\\")' } ],
      '#strings':
       [ { token: 'string.quoted.single.cypher',
           regex: '\'',
           push:
            [ { token: 'string.quoted.single.cypher',
                regex: '\'',
                next: 'pop' },
              { include: '#string_escape' },
              { defaultToken: 'string.quoted.single.cypher' } ] },
         { token: 'string.quoted.double.cypher',
           regex: '"',
           push:
            [ { token: 'string.quoted.double.cypher', regex: '"', next: 'pop' },
              { include: '#string_escape' },
              { defaultToken: 'string.quoted.double.cypher' } ] } ] }

    this.normalizeRules();
};

CypherHighlightRules.metaData = { fileTypes: [ 'cql', 'cyp' ],
      name: 'Cypher',
      scopeName: 'source.cypher' }


oop.inherits(CypherHighlightRules, TextHighlightRules);

exports.CypherHighlightRules = CypherHighlightRules;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../../lib/oop");
var Range = acequire("../../range").Range;
var BaseFoldMode = acequire("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);

        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }

        var fw = this._getFoldWidgetBase(session, foldStyle, row);

        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart

        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);

        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);

        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);

            var range = session.getCommentFoldRange(row, i + match[0].length, 1);

            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }

            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };

    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);

            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }

        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };

    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;

        var re = /^\s*(?:\/\*|\/\/)#(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/cypher",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/cypher_highlight_rules","ace/mode/folding/cstyle"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var CypherHighlightRules = acequire("./cypher_highlight_rules").CypherHighlightRules;
var FoldMode = acequire("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = CypherHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/cypher"
}).call(Mode.prototype);

exports.Mode = Mode;
});

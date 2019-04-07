"use strict";
'use stric'; // es6 기능 ㅣ 블록 스코프 변수 선언

var sentences = [{
  subject: 'Javascript',
  verb: 'is',
  object: 'great'
}, {
  subject: 'Elephants',
  verb: 'are',
  object: 'large'
}]; // es6 rlsmd : 객체 분배

function say(_ref) {
  var subject = _ref.subject,
      verb = _ref.verb,
      object = _ref.object;
  // es6 기능 : 템플릿 문자열
  console.log("".concat(subject, " ").concat(verb, " ").concat(object));
}

for (var _i = 0, _sentences = sentences; _i < _sentences.length; _i++) {
  var s = _sentences[_i];
  say(s);
}
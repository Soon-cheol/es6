'use stric';
// es6 기능 ㅣ 블록 스코프 변수 선언
const sentences = [
    { subject: 'Javascript', verb: 'is', object: 'great' },
    { subject: 'Elephants', verb: 'are', object: 'large' },
];
// es6 rlsmd : 객체 분배
function say({ subject, verb, object }) {
    // es6 기능 : 템플릿 문자열
    // 아래 사용한 것은 따옴표가 아니라 백틱(`), 즉
    // 키보드의 탭 키 바로 위 에 있는 문자입니다,
    console.log(`${subject} ${verb} ${object}`);
}
for (let s of sentences) {
    say(s);
}
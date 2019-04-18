# chapter7. 스코프

## 스코프는

```javascript
function f(x) {
	return x + 3;
}
f(5);		// 8
x;			// ReferenceError : x is not defined
```
함수 안에서는 x가 존재하지만 함수 밖에서는 존재하지 않는다. <br>
x의 스코프는 함수 f이다. <br>
<br>
>- 역주_ 스코프를 시야 또는 범위라고 읽으면 이해하기 편한 설명이 많습니다.
<br>

## 스코프의 존재
<ul>
	<li>스코프는 프로그램의 현재 실행 중인 부분, 즉 <i>실행 컨텍스트 <sup>execution context</sup></i>에서 <br> 현재 보이고 접근할 수 있는 식별자를 말한다.</li>
	<li>존재한다는 것은 식별자가 메모리에 할당된 무언가를 가리키고 있다는 뜻이다.</li>
	<li>더 이상 존재하지 않더라도 메모리는 남아있으며, 유지할 필요가 없다고 표시해 두면, <br>가비지콜렉션 프로세스에서 메모리를 회수한다.</li>
</ul>
<br>

## 정적 스코프와 동적 스코프

프로그램의 소스코드를 살펴보는 것과 프로그램의 실행 흐름은 다르다. <br>

```javascript
function f1() {
	console.log('one');
}
function f2() {
	console.log('two');
}

f2();
f1();
f2();
```
<br>
정적 스코프는 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 때 알 수 있다는 뜻이다.
<br>

```javascript
const x = 3;

function f() {
	console.log(x);
	console.log(y);
}

{ // 새 스코프
	const y = 5;
	f();
}

// 결과
// 3
// ReferenceError: y is not defined
```

<br>
자바스크립트는 정적 스코프이며, 정의될 때 접근할 수 있던 식별자에는 여전히 접근할 수 있지만, <br>
호출할 때 스코프에 있는 식별자에 접근할 수는 없다.
<ul>
	<li>전역 스코프<sup>global scope</sup></li>
	<li>블록 스코프<sup>block scope</sup></li>
	<li>함수 스코프<sup>function scope</sup></li>
</ul>

## 전역 스코프
- 스코프는 계층적이며 프로그램의 바탕이 되는 기본 스코프를 <i>전역스코프</i>라고 한다.<br>
- 어떤 함수도 호출하지 않았을 때 실행 흐름은 전역 스코프에 있다.<br>
- 전역 스코프에서 선언한 것은 무엇이든 프로그램의 모든 스코프에서 볼 수 있다.<br>
<br>
> 전역 변수를 사용하는 것은 어쩔 수 없지만 <i>의존</i>하는 것은 피해야 한다.
<br>

```javascript
let name = "Irena"	//전역
let age = 25;		//전역

function greet() {
	console.log(`Hello, ${name}!`);
}
function getBirthYear() {
	return new Data().getFullYear() - age;
}
```
책에서 말하는 문제점
<ul>
	<li>함수가 호출하는 스코프에 대단히 의존적</li>
	<li>프로그램의 어디에서든 상관없이 name 값이 변경 될 수 있다.</li>
	<li>흔한 이름으로 선언이 되어 다른 이유로 사용될 수 있다.</li>
	<li>예제의 함수들은 프로그램에서 전역 변수들을 정확히 사용한다고 가정해야만 사용이 가능하다.</li>
</ul>

```javascript
let user = {
	name : "Irena",
	age : 25
}

function greet(user) {
	console.log(`Hello, ${user.name}`);
}
function getBirthYear(user) {
	return new Data().getFullYear() - user.age;
}
```
책에서 말하는 더나은 방법
<ul>
	<li>변수를 객체화 하여 오해의 소지를 줄인다.</li>
	<li>함수에서 명시적으로 값(매개변수)을 받아, 어떤 곳에서 호출하더라도 옳바른 값이 나오도록 유도한다.</li>
</ul>

## 블록 스코프
> 잘 사용하지 않지만 스코프의 이해를 돕기위한 독립 블록 예제

```javascript
console.log('before block');
{
	console.log('inside block');
	const x = 3;
	console.log(x);						// 3
}
console.log(`outside block; x=${x}`);	// ReferenceError : x는 정의되지 않았습니다.
```
- 블록 범위의 스코프에는 존재하지만 블록 밖의 스코프에서는 정의되지 않는다. <br>

## 변수 숨기기

```javascript
{
	// block 1
	const x = 'blue';
	console.log(x);			// "blue"
}
console.log(typeof x);		// "undefined"; x는 스코프 밖에 있습니다.
{
	// block 2
	const x = 3;
	console.log(x);			// "3"
}
console.log(typeof x);		// "undefined"; x는 스코프 밖에 있습니다.
```
- 변수 x는 서로 다른 스코프에 존재하기 때문에 이름만 동일한 두 개의 변수 이다. <br>

```javascript
{
	// 외부 블록
	let x = 'blue';
	console.log(x);			// "blue"
	{
		// 내부 블록
		let x = 3;
		console.log(x);		// "3"
	}
	console.log(x);			// "blue"
}
console.log(typeof x);		// "undefined"; x는 스코프에 있지 않습니다.
```

<br>

```javascript
{
	// 외부블록
	let x = { color : "blue" };
	let y = x;						// y와 x는 같은 객체를 가리킵니다.
	let z = 3;
	{
		// 내부 블록
		let x = 5;					// 이제 바깥의 x는 가려졌습니다.
		console.log(x);				// 5
		console.log(y.color);		// "blue"; y가 가리키는,
									// 외부 스코프의 x가 가리키는 객체는
									// 스코프 안에 있습니다.
		y.color = "red";
		console.log(z);				// 3; z는 숨겨지지 않았습니다.
	}
	console.log(x.color);			// "red"; 객체는 내부 스코프에서 수정됐습니다.
	console.log(y.color);			// "red"; x와 y는 같은 객체를 가리킵니다.
	console.log(z);					// 3
}
```
- 내부에서는 외부 스코프에 접근할 수 있지만, 외부 스코프는 내부 스코프에 접근할 수 없다. <br>

## 함수, 클로저, 정적 스코프
- 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것을 <i>클로저 <sup>closure</sup></i>라고 한다.
<br>

```javascript
let globalFunc;					// 정의되지 않은 전역 함수
{
	let blockvar = a;			// 블록 스코프에 있는 변수
	globalFunc = function() {
		console.log(blockvar);
	}
}
globalFunc();					// "a"
```
- 스코프에서는 빠져나왔지만 함수는 여전히 내부 블록의 스코프에 접근하고 있다. <br>
- 함수가 내부 블록의 식별자를 참조하기때문에 해당 스코프는 유지 된다. <br>

```javascript
let f;							// 정의되지 않은 함수
{
	let o = { note : 'Safe' };
	f = function() {
		return o;
	}
}
let oRef = f();
oRef.note = "Not so safe after all!";
```
- 내부 블록의 o는 밖에서 접근할 수 없다. <br>
- 외부에서 선언되고 내부에서 정의된 함수의 반환값을 통해 내부 스코프에 접근할 수 있다. <br>
- 클로저를 통해 특별한 접근 루트를 만들어 해당 스코프의 소스 오염을 방지한다. <br>

## 즉시 호출하는 함수 표현식 (즉시 실행 함수)
> IIFE : 즉시 호출하는 함수 표현식

```javascript
// IIFE 의 기본 구조
(function() {
	// IIFE 바디
})();
```
- 함수 내부는 내부 스코프를 가지지만, 자체가 함수이므로 외부로 반환값을 보낼 수 있다. <br>

```javascript
const message = (function() {
	const secret = "I'm a secret!";
	return `The secret is ${secret.length} characters long.`;
})();
console.log(message);		// "The secret is 13 characters long."
```
<br>

```javascript
const f = (function() {
	let count = 0;
	return function() {
		return `I have been called ${++count} time(s).`;
	}
})();
f();	// "I have been called 1 time(s)."
f();	// "I have been called 2 time(s)."
```
- 반환값은 함수도 반환할 수 있다.<br>
- 외부에서는 익명 함수 내에 존재하는 count에 접근할 수 없지만 반환값을 통해 값을 확인할 수 있다. <br>

## 함수 스코프와 호이스팅
- ES6에서 let을 도입하기 전에는 var로 변수를 선언했으며, var 선언변수는 함수 스코프를 가지고 있다. <br>
let 예제

```javascript
x; 			// ReferenceError; x는 정의되지 않았습니다.
let x = 3;	// 에러가 일어나서 실행이 멈췄으므로 여기에는 결코 도달할 수 없습니다.
```
var 예제

```javascript
x;			// undefined; x는 존재하지만 할당 받는 값이 없는 상태로 간주한다.
var x = 3;
x;			// 3
```
자바스크립트가 위의 예제를 해석한 내용

```javascript
var x;			// 선언(할당은 아닌)이 끌어올려집니다.
x;				// undefined
x = 3;
x;				// 3
```
심화 예제

```javascript
// 원래 코드								// 자바스크립트가 해석한 코드
											var x;
											var y;
if(x !== 3) {								if(x !== 3) {
	console.log(y);								console.log(y);
	var y = 5;									y = 5;
	if(y === 5) {								if(y === 5) {
		var x = 3;									var x = 3;
	}											}
	console.log(y);								console.log(y);
}											}
if(x === 3) {								if(x === 3) {
	console.log(y);								console.log(y);
}											}
```
<br>
```javascript
// 원래 코드								// 자바스크립트가 해석한 코드
											var x;
var x = 3;									x = 3;
if(x === 3) {								if(x === 3) {
	var x = 2;									x = 2;
	console.log(x);								console.log(x);
}											}
console.log(x);								console.log(x);
```
- 아직까지 var이 사라지지 않는 이유는 이전 소스들이 존재하기 때문이다. <br>

## 함수 호이스팅

```javascript
f();					// "f"
function f() {
	console.log('f');
}
```
<br>

```javascript
f();					// ReferenceError: f는 정의되지 않았습니다.
let f = function() {
	console.log('f');
}
```
- 함수 선언은 호이스팅되어 상단에 선언 및 초기화가 진행된다. <br>
- 변수에 할당하는 함수는 호이스팅 되지 않고 변수 스코프의 규칙을 따른다. <br>

## 사각지대
- <i>사각지대</i>란 let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 것을 뜻한다.<br>

```javascript
if(typeof x === "undefined") {
	console.log("x doesn't exist or is undefined");
} esle {
	// x를 사용해도 안전한 코드
}
var x = 5;
```
- var로 선언한 경우 호이스팅 되어 에러가 생기지 않는다. <br>

```javascript
if(typeof x === "undefined") {
	console.log("x doesn't exist or is undefined");
} esle {
	// x를 사용해도 안전한 코드
}
let x = 5;
```
- let 으로 선언된 경우 변수가 초기화되지 않아 에러가 발생한다. <br>

## 스트릭트 모드
- 암시적 전역 변수로 인해 여러가지 경우에서 문제가 생길 수 있다.<br>
- var로 변수선언하는 것을 잊으면 자바스크립트는 전역변수를 참조하는 것으로 간주하고, 전역 변수가 존재하지 않으면 스스로 만든다. <br>
<ul>
	<li>스트릭트 모드는 코드 맨앞에 "use strict" 라고 쓰면 된다.</li>
	<li>전역 스코프에서 "use strict"를 사용하면 스크립트 전체에서 스트릭트 모드로 실행되고, 함수 안에서 실행하면 해당 함수만 스트릭트 모드가 된다.</li>
	<li>전역 스코프에서 실행할 경우 불러오는 스크립트의 경우에서 문제가 생길 수 있으므로 전역스코프에서 사용하고 싶다면 즉시실행함수로 감싸면 된다.</li>
</ul>

```javascript
(function() {
	'use strict';
	
	// 코드를 전부 이 안에 작성합니다.
	// 이 코드는 스트릭트 모드로 동작하지만,
	// 이 코드와 함꼐 동작하는 다른 스크립트는
	// 스트릭트 모드에 영향받지 않습니다.
})();
```















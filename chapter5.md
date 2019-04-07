# chapter5. 표현식과 연산자

## 표현식
<ul>
    <li>값으로 평가될 수 있는 문</li>
    <li>무언가를 요청하는 것</li>
    <li>결과를 명시적으로 반환하는 것</li>
    <li>값이 되어 할당에 쓸 수 있는 것</li>
    <li>결과를 변수나 상수, 프로퍼티에 할당 가능</li>
</ul>

```
let x;      // 선언문
x = 3 * 5;  // 표현식
```

```
let x, y;
y = x = 3 * 5;  // 원래 문
y = x = 15;     // 곱셈 표현식을 평가했습니다.
y = 15;         // 첫 번째 할당을 평가했습니다. x는 이제 15이고,
                // y는 아직 undefined입니다.
15;             // 두 번째 할당을 평가했습니다. y는 이제 15입니다.
                // 전체 문의 결과는 15입니다. 이 값은 사용하지도 않았고
                // 어딘가에 할당하지도 않았으니 그냥 버려집니다.
```
-자바스크립트가 표현식을 평가하는 순서를 연산자 <i>우선순위</i>라 부른다. <br>
-표현식은 대부분 <i>연산자</i>표현식이다. 즉 곱셈 표현식은 <i>곱셈 연산자</i>(*)와 <i>피연산자</i> 두개로 이루어진다. 피연산자는 서로 곱하는 두 숫자이며 피연산자 자체도 표현식이다.<br>
-연산자 표현식이 외에 <i>식별자 표현식</i>(변수와 상수 이름)과 <i>리터럴 표현식</i>이 있다.

<br>

## 연산자
<ul>
    <li>값을 만드는 행동</li>
    <li>하나 이상의 피연산자가 있어야 결과를 낼 수 있음</li>
    <li>전위 연산자 (먼저 변수의 값을 바꾼 다음평가)</li>
    <li>후위 연산자 (값을 바꾸기 전에 평가)</li>
</ul>
<br>
산술연산자
<table>
    <thead>
        <tr>
            <th>연산자<th>
            <th>설명<th>
            <th>예제<th>
        </tr>
    <thead>
    <tbody>
        <tr>
            <td>+<td>
            <td>덧셈(문자열 병합에도 쓰입니다.)<td>
            <td>3 + 2 // 5<td>
        </tr>
        <tr>
            <td>-<td>
            <td>뺄셈<td>
            <td>3 - 2 // 1<td>
        </tr>
        <tr>
            <td>/<td>
            <td>나눗셈<td>
            <td>3/2 // 1.5<td>
        </tr>
        <tr>
            <td>*<td>
            <td>곱셈<td>
            <td>3*2 // 6<td>
        </tr>
        <tr>
            <td>%<td>
            <td>나머지<td>
            <td>3%2 // 1<td>
        </tr>
        <tr>
            <td>-<td>
            <td>단항 부정<td>
            <td>-x // x의 부호를 바꿉니다. x가 5이면 -x는 -5입니다.<td>
        </tr>
        <tr>
            <td>+<td>
            <td>단항 플러스<td>
            <td>+x // x가 숫자가 아니면 숫자로 변환을 시도합니다.<td>
        </tr>
        <tr>
            <td>++<td>
            <td>전위 증가<td>
            <td>++x // x에 1을 더한 다음 평가합니다.<td>
        </tr>
        <tr>
            <td>++<td>
            <td>후위 증가<td>
            <td>x++ // x를 평가한 다음 1을 더합니다.<td>
        </tr>
        <tr>
            <td>--<td>
            <td>전위 감소<td>
            <td>--x // x에 1을 뺀 다음 평가합니다.<td>
        </tr>
        <tr>
            <td>--<td>
            <td>후위 감소<td>
            <td>x-- // x의 값을 평가한 다음 1을 뺍니다.<td>
        </tr>
    </tbody>
</table>

<br>

뺄셈과 단항 부정 모두 - 기호를 사용한다. 단항 부정이 먼저 이루어지고 그다음 뺄셈을 한다.<br>
```
const x = 5;
const y = 3 - -x;   // y는 8입니다.
```
위와 같은 규칙이 단항 플러스에도 적용되지만 자주 사용하지는 않는다.<br>
보통문자열을 숫자로 강제 변환하거나 드물게는 세로 줄을 맞추고 싶을 때, 단항 프러스 연산자를 사용한다.
```
const s = "5";
const y = 3 + +s;   // y는 8입니다. 단항 플러스를 사용하지 않았다면
                    // 문자열 병합이 일어나서 결과는 "35"가 됩니다.

// 여기서는 굳이 단항 플러스가 필요하지 않지만 줄을 잘 맞출 수 있습니다.
const x1 = 0, x2 = 3, x3 = -1.5, x4 = -6.33;
const p1 = -x1*1;
const p2 = -x2*2;
const p3 = -x3*3;
const p4 = -x4*4;
```

<br>

## 연산자 우선순위
현재 자바스크립트에는 56개의 연산자가 있고, 우선순위를 기준으로 19개의 그롭으로 묶을 수 있다.
우선순위가 같은 연산자들은 오른쪽에서 왼쪽으로 또는 왼쪽에서 오른쪽으로 평가한다. 
```
8 ÷ 2 + 3 x ( 4 x 2 - 1 )
```
```
let x = 3,y;
x += y = 6*5/2;
```

<br>

## 비교 연산자

<ul>
    <li>두 개의 값을 비교</li>
    <li>일치함 ( === ), 동등함 ( == ), 대소 관계 ( >,<)
        <ul>
            <li>일치함 ( === ) <br>
            : 두 값이 같은 객체를 가리키거나 같은 타입이고 값도 같은 경우, === 또는 !== 연산자로 값 일치 확인</li>
            <li>동등함 ( == )  <br>
            : 두 값이 같은 객체를 가리키거나 같은 값을 갖도록 변환할 수 있음,  == 또는 !== 연산자로 값 일치 확인</li>
            <li>대소 관계 (<, <=, >, >=)</li>
        </ul>
    </li>
</ul>

```
const n = 5;
const s = "5";
n === s;            // false -- 타입이 다릅니다.
n !== s;            // true
n === Number(s);    // true -- 문자열 "5"를 숫자 5로 변환했습니다.
n !== Number(s);    // false
n == s;             // 동등 연산자 권장하지않음
n != s;             // 동등 연산자 권장하지않음

const a = {name : "an Object"};
const b = {name : "an Object"};
a === b;            // false -- 객체는 항상 다릅니다.
a !== b;            // true
a == b;             // 동등 연산자 권장하지않음
a != b;             // 동등 연산자 권장하지않음
```

<br>

## 숫자 비교
<ul>
    <li>특별한 숫자형 값 NaN은 그 자신을 포함하여 무엇과 도 같지 않음 (NaN === NaN , NaN == NaN 모두 false)</li>
    <li>숫자가 NaN인지 알아보려면 내장된 isNaN 함수를 사용</li>
    <li>isNaN(x) 은 x가 NaN일때 true를 반환하고 그렇지 않다면 false 반환</li>
</ul>

<br>

## 문자열 병합

<ul>
    <li>자바스크립트에서 + 연산자는 덧셈과 문자열 병합에 모두 사용</li>
    <li>자바스크립트는 두 피 연산자를 왼쪽에서 오른쪽으로 평가한 후, 피연산자 중 하나라도 문자열이면 문자열 병합을 수행</li>
</ul>

```
 3 + 5 +"8"     // 문자열 "88"
"3" + 5 + 8     // 문자열 "358"
```

<br>

## 논리 연산자

<ul>
    <li>false, true 불리언 값만 다룰 수 있음</li>
    <li>참 같은 값과 거짓 같은 값으로 나눌 수 있음</li>
</ul>

### 참 같은 값
<ul>
    <li>undefined</li>
    <li>null</li>
    <li>false</li>
    <li>0</li>
    <li>NaN</li>
    <li>' ' (빈 문자열)</li>
</ul>

### 거짓 같은 값
<ul>
    <li>모든 객체. valueOf() 메서드를 호출했을때 false를 반환하는 객체도 참 같은 값에 속한다.</li>
    <li>배열. 빈 배열도 참 같은 값에 속한다.</li>
    <li>공백만 있는 문자열 (" " 등)</li>
    <li>문자열 "false"</li>
</ul>
-빈 배열 arr이 거짓 같은 값으로 평가되길 원한다면 arr.length를 쓰면 된다. 빈 배열에서 이 프로퍼티를 호출하면 0을 반환하며 이는 거짓 같은 값이다.

<br>
<br>

## AND , OR , NOT
<ul>
    <li>AND ( && ) 피산자가 모두 true 일때 true</li>
    <li>OR ( || ) 피연산자가 모두 false 일때만 false</li>
    <li>NOT ( ! ) 피연산자를 반대로 바꿈</li>
</ul>

AND ( && ) 연산의 진위표
<table>
    <thead>
        <tr>
            <th>X</th>
            <th>y</th>
            <th>x && y</th>
        </tr>   
    </thead>
    <tbody>
        <tr>
            <td>False</td>
            <td>false</td>
            <td>false</td>
        </tr>
        <tr>
            <td>False</td>
            <td>true</td>
            <td>false</td>
        </tr>
        <tr>
            <td>True</td>
            <td>false</td>
            <td>false</td>
        </tr>
        <tr>
            <td>True</td>
            <td>true</td>
            <td>true</td>
        </tr>
    </tbody>
</table>


OR ( || ) 연산의 진위표
<table>
    <thead>
        <tr>
            <th>X</th>
            <th>y</th>
            <th>x || y</th>
        </tr>  
    </thead>
    <tbody>
        <tr>
            <td>False</td>
            <td>false</td>
            <td>false</td>
        </tr>
        <tr>
            <td>False</td>
            <td>true</td>
            <td>true</td>
        </tr>
        <tr>
            <td>True</td>
            <td>false</td>
            <td>true</td>
        </tr>
        <tr>
            <td>True</td>
            <td>true</td>
            <td>true</td>
        </tr>
    </tbody>
</table>

NOT ( ! ) 연산의 진위표
<table>
    <thead>
        <tr>
            <th>X</th>
            <th>!x</th>
        </tr>   
    </thead>
    <tbody>
        <tr>
            <td>False</td>
            <td>true</td>
        </tr>
        <tr>
            <td>True</td>
            <td>false</td>
         </tr>
    </tbody>
</table>


### 단축 평가
<ul>
    <li>두 값을 모두 평가하지 않아도 될때 일어나는 동작<br> 
    x의 값이 false이면 x && y는 y의 값을 평가할 필요도 없이 false<br>
    x || y에서 x의 값이 true면 y의 값을 평가할 필요도 없이 true</li>
</ul>

```
const skipIt = true;
let x = 0;
const result = skipIt || x++;
```
첫 번째 피연산자가 skipIt이 true이므로 result도 true이다. 세 번째 행에서 단축 평가가 일어나므로 증가 연산자에 해당하는 표현식은 실행되지 않고 x의 값은 그대로 0이다. <br>
skipIt을 false로 바꾸면 논리 연산자의 두 피연산자를 모두 평가해야 하고 x는 증가한다.
``` 
const doIt = false;
let x = 0;
const result = doIt && x++;
```
AND의 첫 번째 피연산자가 false이므로 두 번째 피연산자를 평가하지 않는다. 따라서 result는 false이고, x는 늘어나지 않는다. 그런데 doIt을 true로 바꾸면 두 피 연산자는 모두 평가되어 증가 연산이 일어나고 result는 0이 된다.

### 조건 연산자
<ul>
    <li>자바스크립트의 유일한 3항 연산자로, 피연산자 3개를 받음</li>
    <li>if ...else 문과 동등한 표현식</li>
</ul>

```
const doIt = false;
const result = doIt ? "Dit it!" : "Didn't do it";
```
첫 번째 피연산자(doIt)가 참 같은 값이면, 이 표현식의 값은 두 번째 피연산자(물음표와 콜론 사이)이며, 거짓 같은 값이면 이 표현식의 값은 세 번째 피연산자(콜론 다음)이다.

### 쉼표 연산자
<ul>
    <li>표현식을 결합하여 두 표현식을 평가한 후, 두 번째 표현식의 결과를 반환</li>
</ul>

```
let x = 0, y = 10, z;
z = (x++, y++);
```
*쉼표 연산자는 우선순위가 가장 낮은 연산자이므로 괄호 사용

<br>

## 연산자 그룹
<ul>
    <li>연산자 우선순위를 높이거나 명확히 표현하는 데 사용</li>
    <li>연산 순서만 바꿀 뿐, 다른 부작용은 전혀 없는 안전한 연산자</li>
</ul>

### 비트 연산자
<ul>
    <li>숫자의 비트를 직접 조작</li>
    <li>꼭 필요한 경우는 거의 없음</li>
</ul>

### typeof 연산자
<ul>
    <li>피연산자의 타입을 나타내는 문자열을 반환</li>
    <li>배열과 배열 아닌 객체도 정확히 구분하지 못함</li>
    <li>함수(객체의 특별한 타입)는 정확히 식별하지만, typeof[]는 "object"를 반환</li>
</ul>

typeof의 반환값
<table>
    <thead>
        <tr>
            <th>표현식</th>
            <th>반환값</th>
            <th>참고</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>typeof undefined</td>
            <td>"undefined"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof null</td>
            <td>"object"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof {}</td>
            <td>"object"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof true</td>
            <td>"boolean"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof 1</td>
            <td>"number"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof ""</td>
            <td>"string"</td>
            <td></td>
        </tr>
        <tr>
            <td>typeof Symbol()</td>
            <td>"Symbol"</td>
            <td>ES6에서 새로 생겼습니다.</td>
        </tr>
        <tr>
            <td>typeof fuction()</td>
            <td>"fuction"</td>
            <td></td>
        </tr>
    </tbody>
</table>
*typeof는 연산자이므로 괄호는 필요 없다. 즉 변수 x 타입을 알아볼 때는 typeof(x)가 아니라 typeof x를 사용.

### void 연산자
<ul>
    <li>피연산자를 평가 한 후 undefined 반환</li>
    <li>실무에서 거의 안쓰임</li>
    <li>HTML a 태그의 URI에 사용하면 브라우저에서 다른 페이지로 이동하는 일을 막을 수 있음</li>
</ul>

```
<a href="javascript:void 0">Do nothing.</a>
```
*이 또한 권장하는 방법은 아님

### 할당 연산자
<ul>
    <li>변수에 값을 할당</li>
    <li>등호의 왼쪽(l-value)에 있는 것은 반드시 값을 저장할 수 있는 것(변수나 프로퍼티, 배열 요소 중 하나)이어야 함.</li>
    <li></li>
</ul>

<table>
    <thead>
        <tr>
            <th>연산자</th>
            <th>동등한 표현</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> x += y</td>
            <td>x = x + y</td>
        </tr>
        <tr>
            <td> x -= y</td>
            <td>x = x - y</td>
        </tr>
        <tr>
            <td> x *= y</td>
            <td>x = x * y</td>
        </tr>
        <tr>
            <td> x /= y</td>
            <td>x = x / y</td>
        </tr>
        <tr>
            <td> x %= y</td>
            <td>x = x % y</td>
        </tr>
        <tr>
            <td> x &lt;&lt;= y</td>
            <td>x = x &lt;&lt; y</td>
        </tr>
        <tr>
            <td> x &gt;&gt;= y</td>
            <td>x = x &gt;&gt; y</td>
        </tr>
        <tr>
            <td> x &gt;&gt;&gt;= y</td>
            <td>x = x &gt;&gt;&gt; y</td>
        </tr>
        <tr>
            <td> x &amp;= y</td>
            <td>x = x &amp; y</td>
        </tr>
        <tr>
            <td> x |= y</td>
            <td>x = x | y</td>
        </tr>
        <tr>
            <td> x ^= y</td>
            <td>x = x ^ y</td>
        </tr>
    </tbody>
</table>

<br>

## 해체 할당
<ul>
    <li>ES6에서 새로 도입됨</li>
    <li>객체나 배열을 변수로 '해체'할 수 있음</li>
</ul>

```
// 객체선언
const obj = { b:2, c:3, d:4 };

//해체할당
const {a,b,c} = obj;
a;                   // undefined : obj 에는 "a" 프로퍼티가 없습니다.
b;                   // 2
c;                   // 3
d;                   // referenceError : "d" 는 정의되지 않았습니다.
```
객체를 해체할 때는 반드시 변수 이름과 객체의 프로퍼티 이름이 일치해야 함. <br>
객체 해체는 할당만으로 이뤄질 수 있는데 이렇게 하려면 괄호를 써야하며 괄호를 쓰지 않을 경우 자바스크립트는 표현식 좌변을 블록으로 해석 함.
```
const obj = { b:2, c:3, d:4 };
let a, b, c;

{a,b,c} = obj;         //에러 일어남
({a,b,c} = obj);       //동작함
```

배열을 해체할 때는 배열 요소에 대응할 변수 이름을 마음대로 쓸 수 있으며 이들은 배열 순서대로 대응
```
const arr = [1, 2, 3];

//배열 해체할당
let [x,y] = arr;
x;              // 1
y;              // 2
z;              // ReferenceError : 'z'는 정의 되지 않았습니다.
```

확산 연산자(...)를 사용하면 남은 요소를 새 배열에 할당 가능 (chapter6에서 자세히)
```
const arr = [1, 2, 3, 4, 5];

let [x,y, ...rest] = arr;
x;                 // 1
y;                 // 2
rest;              // [3,4,5]
```

배열 해체를 활용하면 변수의 값을 서로 바꿀 수 있음
```
let a = 5, b = 10;
[a, b] = [b, a];
a;      // 10
b;      // 5
```

<br>

## 객체와 배열 연산자
<table>
    <thead>
        <tr>
            <th>연산자</th>
            <th>설명</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>.</td>
            <td>점 연산자</td>
        </tr>
        <tr>
            <td>[]</td>
            <td>대괄호 연산자</td>
        </tr>
        <tr>
            <td>in</td>
            <td>프로퍼티 존재 연산자</td>
        </tr>
        <tr>
            <td>new</td>
            <td>객체 인스턴스화 연산자</td>
        </tr>
        <tr>
            <td>instanceof</td>
            <td>프로토타입 체인 테스트 연산</td>
        </tr>
        <tr>
            <td>...</td>
            <td>확장 연산자</td>
        </tr>
        <tr>
            <td>delete</td>
            <td>삭제 연산자</td>
        </tr>
    </tbody>
</table>

<br>

## 템플릿 문자열과 표현식
<ul>
    <li>어떤 표현식이든 그 값을 문자열에 넣을 수 있음</li>
    <li>표현식은 값이므로 값이 들어갈 수 있는 곳에는 어디든 표현식 사용 가능</li>
</ul>

<br>

## 표현식과 흐름 제어 패턴
### if...else 문을 3항 연산자로 바꾸기
if...else 문의 목적이 변수의 값을 얻는 것이라면 이것 대신 3항 연산자를 쓰는 편이 좋다
```
if (isPrime (n)) {
    label = 'prime';
} else {
    label = 'non-prime';
}
```

```
label = isPrime(n) ? 'prime' : 'non-prime';
```

### if 문을 단축 평가하는 OR 표현식으로 바꾸기
할당이 주 목적인 if 문은 단축 평가를 사용하는 OR 표현식을 써서 간결하게 줄일 수 있다
```
if (!options) options = {};

// 아래와 같이 변경

options = options || {};
```

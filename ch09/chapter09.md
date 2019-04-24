# 9. 객체와 객체지향 프로그래밍
객체의 본질은 컨테이너 입니다.

## 9.1 프로퍼티 나열
객체도 프로퍼티 나열을 지원합니다. 프로퍼티 나열에서 기억해야 할 것은 _순서가 보장되지 않는다_ 는 점입니다. 프로퍼티가 입력한 순서대로 나열될 수도 있습니다. 하지만 자바스크립트가 그런 순서를 명시적으로 보장하는 것은 아니고, 브라우저나 노드 등의 프로그램에서 속도나 효율 향상을 목적으로 언제든 바꿀수도 있습니다.

### 9.1.1 for...in
```javascript
const SYM = Symbol();

const o = {a:1, b:2, c:3, [SYM]:4};

for(let prop in o) {
    if(!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
}
```
for...in 루프에는 키가 심볼인 프로퍼티는 포함되지 않습니다.

### 9.1.2 Object.keys
Object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환합니다.
```javascript
const SYM = Symbol();

const o = {a:1, b:2, c:3, [SYM]:4};

Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));
```
이 예제는 for...in 루프를 썼을 때와 같은 결과이고 hasOwnProperty를 체크할 필요는 없습니다.

객체의 프로퍼티 키를 배열로 가져와야 할 때는 Object.keys가 편합니다.
```javascript
const o = { apple : 1, xochitl: 2, balloon : 3, guitar : 4, xylophone: 5,};

Object.keys(o)
    .filter(prop => prop.match(/^x/))   //x로 시작하는 프로퍼티
    .forEach(prop => console.log(`${prop}: ${o[prop]}`));
```

## 9.2 객체지향 프로그래밍(object-oriented programming)
모든 데이터를 오브젝트(object)로 취급하여 프로그래밍 하는 방법으로, 처리 요구를 받은 객체가 자기 자신의 안에 있는 내용을 가지고 처리하는 방식이다.

[객체지향 프로그래밍](https://m.post.naver.com/viewer/postView.nhn?volumeNo=16885254&memberNo=38386150&vType=VERTICAL)

### 9.2.1 클래스와 인스턴스 생성
ES6에서는 클래스를 만드는 간편한 새 문법을 도입.
```javascript
class Car {
    constructor(){

    }
}
```
인스턴스를 만들때는 new 키워드를 사용합니다.
```javascript
const car1 = new Car();
const car2 = new Car();
```
인스턴스인지 확인하는 instanceof 연산자
```javascript
car1 instanceof Car     //true
car1 instanceof Array   //false
```

```javascript
class Car {
    constructor(make, model){
        this.make = make;
        this.model = model;
        this.userGears = ['P', 'N', 'R', 'D'];
        this.userGear = this.userGears[0];
    }
    shift(gear) {
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;

    }
}
```
여기서 this 키워드는 의도한 목적, 즉 메서드를 호출한 인스턴스를 가리키는 목적으로 쓰였습니다. this는 일종의 플레이스 홀더로 생각해도 좋습니다.

-클래스 사용
```javascript   
const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");
car1.shift('D');
car2.shift('R');

car1.userGear       //"D"
car2.userGear       //"R"
```
- 외부에서 접근하면 안되는 프로퍼티 이름 앞에 밑줄을 붙이는, '가짜 접근 제한'을 사용
```javascript
class Car{
    constructor(make, model){
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this._userGears[0];
    }

    get userGear() {return this._userGear;}
    set userGear(value) {
        if(this._userGears.indexOf(value) < 0)
            throw new Error(`Invalid gear: ${value}`);
        this._userGear = value;
    }

    shift(gear){this.userGear = gear}
}
```

- 프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스(10장)를 사용할수 있습니다.
- 여기서는 즉시 호출하는 함수 표현식을 써서 WeakMap을 클로저로 감싸고 바깥에서 접근할 수 없게 했습니다. WeakMap은 클래스 외부에서 접근하면 안되는 프로퍼티를 안전하게 저장합니다.
```javascript
const Car = (function(){
    const carProps = new WeakMap();

    class Car{
        constructor(make, model){
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, {userGear: this._userGears[0]});
        }

        get userGear() {return carProps.get(this).userGear;}
        set userGear(value) {
            if(this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${value}`);
            carProps.get(this).userGear = value;
        }

        shift(gear){this.userGear = gear}
    }
    return Car;
})();
```

### 9.2.2 클래스는 함수다.
ES6에서 class 키워드를 도입하기 전까지, 클래스를 만든다는 것은 곧 클래스 생성자로 사용할 함수를 만든다는 의미였습니다. class는 단축 문법일 뿐이며 자바스크립트의 클래스 자체가 바뀐것은 아닙니다.

```javascript
function Car(make, model){
    this.make = make;
    this.model = model;
    this._userGears = ['P', 'N', 'R', 'D'];
    this._userGear = this._userGears[0];
}

class Es6car {}     //생성자는 의도적으로 생략합니다.
function Es5Car {}
> typeof Es6Car     //"function"
> typeof Es5Car     //"function"
```

### 9.2.3 프로토타입
클래스의 인스턴스에서 사용할 수 있는 메서드라고 하면 그건 프로토타입 메서드를 말하는겁니다.

```
NOTE_ 최근에는 프로토타입 메서드를 #으로 표시하는 표기법이 널리 쓰입니다. 예를 들어 Car.prototype.shift를 Car#shift로 쓰는 겁니다.
```

모든 함수에는 prototype이라는 특별한 프로퍼티가 있습니다. 일반적인 함수에서는 프로토타입을 사용할 일이 없지만, 객체 생성자로 동작하는 함수에서는 프로토타입이 대단히 중요합니다.

```
NOTE_ 객체 생성자, 즉 클래스는 Car처럼 항상 첫글자를 대문자로 표기합니다. 일반적인 함수 이름이 대문자로 시작하거나 객체 생성자가 소문자로 시작한다면 이를 경고하는 린트 프로그램이 많습니다.
```

함수의 프로퍼티가 중요해지는 시점은 new 키워드로 새 인스턴스를 만들었을때 입니다. new 키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할수 있습니다. 객체 인스턴스는 생성자의 프로토타입 프로퍼티를 _ _ proto _ _퍼티에 저장힙니다.

```
CAUTION_ __proto__ 프로퍼티는 자바스크립트의 내무 동작 방식에 영향을 미칩니다. 밑줄 두 개로 둘러싼 프로퍼티는 모두 그렇습니다. 이런 프로퍼티를 수정하는 것은 정말로 위험합니다.
```

프로토 타입에서 중요한것은 _동적 디스패치_ 라는 메커니즘 입니다. 여기서 디스패치는 메서드 호출과 같은 의미 입니다. 객체의 프로퍼티나 메서드에 접근하려 할 때 그런 프로퍼티나 메서드가 존재 하지 않으면 자바스크립트는 _객체의 프로토타입_ 에서 해당 프로퍼티나 메서드를 찾습니다. 클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할수 있습니다.

`
TIP 클래스의 프로토 타입에서 데이터 프로퍼티를 수정하는 것은 일반적으로 권장하지 않습니다. 인스턴스에 초기값이 필요하다면 생성자에서 만드는 편이 낫습니다.
`

```javascript
//Car 클래스는 이전에 만든, shift 메서드가 있는 클래스
const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift;      //true
car1.shift('D');
car1.shift('d');                         //error
car1.userGear;                           //'D'
car1.shift === car2.shift                //true

car1.shift = function(gear) {this.userGear = gear.toUpperCase();}
car1.shift === Car.prototype.shift       //false
car1.shift === car2.shift                //false
car1.shift('d');
car1.userGear;                           //'D'
```
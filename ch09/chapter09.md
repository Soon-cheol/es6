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

[hasOwnProperty](https://mygumi.tistory.com/330)
객체가 특정 프로퍼티에 대한 소유 여부를 반환한다.해당 객체에 특정 프로퍼티가 존재하면 true, 그렇지 않으면 false 를 반환한다.
_단, 프로토타입 체인은 확인하지 않고, 해당 객체가 스스로 정의한 프로퍼티만을 판단한다._

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

### 9.2.4 정적 메서드
정적 메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶입니다. 일반적으로 정적 메서드에는 this대신 클래스 이름을 사용하는 것이 좋은 습관입니다.

```javascript
class Car {
    static getNextVin(){
        return Car.nextVin++;       //this.nextVin++라고 써도 되지만,
                                    //Car를 앞에 쓰면 정적 메서드라는 점을
                                    //상기하기 쉽습니다.
    }
    constructor(make, model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
    static areSimilar(car1, car2){
        return car1.make===car2.make && car1.model===car2.model;
    }
    static areSame(car1, car2){
        return car1.vin===car2.vin;
    }
}
Car.nextVin = 0;

const car1 = new Car("Tesla", "S");
const car2 = new Car("Mazda", "3");
const car3 = new Car("Mazda", "3");

car1.vin;   //0
car2.vin;   //1
car3.vin;   //2

Car.areSimilar(car1, car2);     //false
Car.areSimilar(car2, car3);     //true
Car.areSame(car2, car3);        //false
Car.areSame(car2, car2);        //true
```

### 9.2.5 상속
클래스의 인스턴스는 클래스의 기능을 모두 상속합니다. 상속은 한단계로 끝나지 않습니다. 객체의 프로토타입에서 메서드를 찾지 못하면 자바스크립트는 프로토타입의 프로토타입을 검색합니다. 프로토타입 체인은 이런식으로 조건에 맞는 프로토타입을 찾을때까지 체인을 계속 거슬러 올라갑니다. 조건에 맞는 프로토타입을 찾지못하면 에러를 일으킵니다.

```javascript
class Vehicle {
    constructor(){
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p){
        this.passengers.push(p)
    }
}
class Car extends Vehicle {
    constructor() {
        super();
        console.log("Car created");
    }
    deployAirbags() {
        console.log("BWOOSH!");
    }
}
```
extends키워드는 Car를 Vehicle의 서브클래스로 만듭니다. super()는 슈퍼클래스의 생성자를 호출하는 특별한 함수입니다. 서브클래스에서는 이 함수를 반드시 호출해야 합니다. 호출하지 않으면 에러가 일어납니다.

```javascript
const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
v.passengers;           //["Frank", "Judy"]
const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
c.passengers;           //["Alice", "Cameron"]
v.deployAirbags();      //error
c.deployAirbags();      //"BWOOSH!"
```
c에서는 deployAirbags를 호출할수 있지만, v에서는 불가능합니다. 달리 말하면, 상속은 단방향입니다. Car클래스의 인스턴스는 Vehicle 클래스의 모든 메서드에 접근할 수 있지만, 반대는 불가능합니다.

### 9.2.6 다형성
다형성이란 객체지향 언어에서 여러 슈퍼클래스의 멤버인 인스턴스를 가리키는 말입니다. 대부분 객체지향 언어에서 다형성은 특별한 경우에 속합니다.

자바스크립트에는 객체가 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있습니다. 이 연산자를 속일 수도 있지만, prototype과 _ _ proto _ _ 프로퍼티에 손대지 않았다면 정확한결과를 기대할 수 있습니다.

```javascript
class Motorcycle extends Vehicle {}
const c = new Car();
const m = new Motorcycle();
c instanceof Car;       //true
c instanceof Vehicle;   //true
m instanceof Car;       //false
m instanceof Motocycle; //true
m instanceof Vehicle;   //true
```

```
NOTE_ 자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스입니다. 즉, 객체 o에서 o instanceof Object는 항상 true입니다(__proto__ 프로퍼티를 수정한다면 다른결과가 나올수 있지만, 그렇게 해서는 안됩니다). 모든 객체가 Object의 인스턴스인 것은 toString 같은 중요한 메서드를 상속하기 위해서입니다.
```

### 9.2.7 객체 프로퍼티 나열 다시 보기
객체 obj와 프로퍼티 x에서, obj.hasOwnProperty(x)는 obj에 프로퍼티 x가 있다면 true를 반환하며, 프로퍼티 x가 obj에 정의되지 않았거나 프로토타입 체인에만 정의되었다면 false를 반환합니다.

ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 합니다. 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 확실히 확인하려면 항상 hasOwnProperty를 사용하는 편이 좋습니다.
```javascript
class Super {
    constructor() {
        this.name = 'Super';
        this.isSuper = true;
    }
}
//유효하지만, 권장하지 않습니다.
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super {
    constructor() {
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj){
    console.log(`${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? '' : '(inherited)'));
}
```
실행한 결과
```javascript
name: SUb
isSuper: true
isSub : true
sneaky: not recommended! (inherited)
```
name, isSuper, isSub 프로퍼티는 모두 프로토타입 체인이 아니라 인스턴스에 정의됐습니다
(슈퍼클래스 생성자에서 선언한 프로퍼티는 서브 클래스 인스턴스에도 정의됩니다). 반면 sneaky 프로퍼티는 슈퍼클래스의 프로토타입에 직접 정의했습니다.
Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있습니다.

### 9.2.8 문자열 표현
모든 객체는 Object를 상속하므로 Object의 메서드는 기본적으로 모든 객체에서 사용할수 있습니다. 객체의 기본적인 문자열 표현을 제공하는 toString도 그런 메서드 중 하나 입니다.
```javascript
class Car{
    toString(){
        return `${this.make} ${this.model} : ${this.vin}`
    }
    static getNextVin(){
        return Car.nextVin++;       //this.nextVin++라고 써도 되지만,
                                    //Car를 앞에 쓰면 정적 메서드라는 점을
                                    //상기하기 쉽습니다.
    }
    constructor(make, model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
}
```
## 9.3 다중 상속, 믹스인, 인터페이스
일부 객체 지향 언어에서는 다중 상속이란 기능을 지원합니다. 이 기능은 클래스가 슈퍼클래스 두개를 가지는 기능이며, 슈퍼클래스의 슈퍼클래스가 존재하는 일반적인 상속과는 다릅니다. 다중 상속에는 충돌의 위험이 있습니다. 

다중상속을 지원하지 않는 언어중에는 인터페이스 개념을 도입해서 이런 상황에 대처하는 언어가 많습니다. 

자바스크립트가 다중상속이 필요한 문제에 대한 해답으로 내놓은 개념이 믹스인입니다.
믹스인이란 기능을 필요한 만큼 섞어 놓은 것입니다. 자바스크립트는 느슨한 타입을 사용하고 대단히 관대한 언어이므로 그 어떤 기능이라도 언제든, 어떤 객체에든 추가할 수 있습니다.

```javascript
class InsurancePolicy {}
function makeInsurable(o){
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy; }
    o.isInsured = function() {return !!this.insurancePolicy; }
}
```

```javascript
makeInsurable(Car); //되지 않습니다.

const car1 = new Car();
car1.addInsurancePolicy(new insurancePolicy());     //error
```

```javascript
const car1 = new Car();
makeInsurable(car1);
car1.addInsurancePolicy(new insurancePolicy());     //works
```
이 방법은 동작하지만 모든 자동차에서 makeInsurable을 호출해야 합니다. 

```javascript
makeInsurable(Car.prototype);
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());     //works
```

심볼
```javascript
class InsurancePolicy{}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o){
    o[ADD_POLICY] = function(p) {this[_POLICY] = p; }
    o[GET_POLICY] = function() { return this[_POLICY]; }
    o[IS_POLICY] = function(p) { return !!this[_POLICY]; }
}
```
심볼은 항상 고유하므로 믹스인이 Car 클래스의 기능과 충돌할 가능성은 없습니다. 쓰기가 조금은 번거로울 수는 있겠지만 훨씬 안전합니다.

## 9.4 요약
객체지향 프로그래밍은 대단히 널리 쓰이는 패러다임이며, 객체지향 프로그래밍을 사용하다 보면 자연스레 관리하고, 디버그하고, 수정하기 쉬운 정리되고 캡슐화된 코드를 작성하게 됩니다. 

# ES6 Fundamentals

New features added in ES6 based on the book written by Nicholas Zakas [Understanding ECMAScript 6
](https://leanpub.com/understandinges6/read)

## Block Bindings (`block-bindings.js`)

### Block-Level Declarations

Block-level declarations are those that declare variables that are inaccessible outside of a given block scope. Block 
scopes are created:

- Inside of a function
- Inside of a block (indicated by the { and } characters)

#### Let Declarations

The let declaration syntax is the same as the syntax for var. You can basically replace var with let to declare a 
variable, but limit the variable’s scope to only the current code block. Since let declarations are not hoisted to the 
top of the enclosing block, you may want to always place let declarations first in the block, so that they are available
to the entire block.

The variable value is declared using let instead of var. That means the declaration is not hoisted to the top of the 
function definition, and the variable value is destroyed once execution has flowed out of the if block. If condition 
evaluates to false, then value is never declared or initialized.

#### Constant Declarations

Another way to define variables in ECMAScript 6 is to use the const declaration syntax. Variables declared using const 
are considered constants, meaning their values cannot be changed once set. For this reason, every const variable must 
be initialized on declaration.

Constants, like let declarations, are block-level declarations. That means constants are destroyed once execution flows
out of the block in which they were declared, and declarations are not hoisted to the top of the block.

#### Let Declarations in Loops

A let declaration simplifies loops by effectively mimicking what the IIFE does in the previous example. On each 
iteration, the loop creates a new variable and initializes it to the value of the variable with the same name from the 
previous iteration. That means you can omit the IIFE altogether and get the results you expect, like this:


#### Summary - Emerging Best Practices for Block Bindings

While ECMAScript 6 was in development, there was widespread belief you should use let by default instead of var for 
variable declarations. For many JavaScript developers, let behaves exactly the way they thought var should have behaved, 
and so the direct replacement makes logical sense. In this case, you would use const for variables that needed 
modification protection.

However, as more developers migrated to ECMAScript 6, an alternate approach gained popularity: use const by default and 
only use let when you know a variable’s value needs to change. The rationale is that most variables should not change 
their value after initialization because unexpected value changes are a source of bugs. This idea has gained a 
significant amount of traction and is worth exploring in your code as you adopt ECMAScript 6.

## Strings and Regular Expressions

### Methods for Identifying Substrings

- The includes() method returns true if the given text is found anywhere within the string. It returns false if not.
- The startsWith() method returns true if the given text is found at the beginning of the string. It returns false 
if not.
- The endsWith() method returns true if the given text is found at the end of the string. It returns false if not.

### Template Literals
    
- Multiline strings A formal concept of multiline strings.
- Basic string formatting The ability to substitute parts of the string for values contained in variables.
- HTML escaping The ability to transform a string such that it is safe to insert into HTML.

Template literals add new syntax for creating domain-specific languages (DSLs) for working with content in a way that 
is safer than the solutions we have today.

#### Basic Syntax

At their simplest, template literals act like regular strings delimited by backticks (`) instead of double or single 
quotes. For example, consider the following:

```javascript
let message = `Hello world!`;

console.log(message);               // "Hello world!"
console.log(typeof message);        // "string"
console.log(message.length);        // 12
```

#### Multiline Strings

*Pre-ECMAScript 6 Workarounds*

Thanks to a long-standing syntax bug, JavaScript does have a workaround. You can create multiline strings if there’s a 
backslash (\) before a newline. Here’s an example:

```javascript
var message = "Multiline \string";
console.log(message);       // "Multiline string"
```

The message string has no newlines present when printed to the console because the backslash is treated as a 
continuation rather than a newline. In order to show a newline in output, you’d need to manually include it:

```javascript
var message = "Multiline \n\
string";
```

**Multiline Strings the Easy Way**

ECMAScript 6’s template literals make multiline strings easy because there’s no special syntax. Just include a newline 
where you want, and it shows up in the result. For example:

```javascript
let message = `Multiline
string`;
console.log(message);       // "Multiline
                            //  string"
```
#### Making Substitutions

At this point, template literals may look like fancier versions of normal JavaScript strings. The real difference 
between the two lies in template literal substitutions. Substitutions allow you to embed any valid JavaScript 
expression inside a template literal and output the result as part of the string.

Substitutions are delimited by an opening ${ and a closing } that can have any JavaScript expression inside. 
The simplest substitutions let you embed local variables directly into a resulting string, like this:

```javascript
let name = "Nicholas",
    message = `Hello, ${name}.`;

console.log(message);       // "Hello, Nicholas."
```

Since all substitutions are JavaScript expressions, you can substitute more than just simple variable names. 
You can easily embed calculations, function calls, and more. For example:

```javascript
let count = 10,
    price = 0.25,
    message = `${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);       // "10 items cost $2.50."
```

#### Tagged Templates


# Functions

## Functions with Default Parameters
   
```javascript

function makeRequest(url, timeout = 2000) {
    console.log("URL: "url + " Timeout: " + timeout );
}

makeRequest("someUrl");
makeRequest("someUrl", 300);

```
In this case, the default value for timeout will only be used if there is no second argument passed in or if the second argument is explicitly passed in as undefined, as in this example:

```javascript
// uses default timeout
makeRequest("/foo", undefined, function(body) {
    doSomething(body);
});

// uses default timeout
makeRequest("/foo");

// doesn't use default timeout
makeRequest("/foo", null, function(body) {
    doSomething(body);
});
```
In the case of default parameter values, a value of null is considered to be valid, meaning that in the third call to makeRequest(), the default value for timeout will not be used.

### How Default Parameters Affect the arguments Object

In ECMAScript 5 the arguments object is always updated in nonstrict mode to reflect changes in the named parameters. 
ECMAScript 5’s strict mode, however, eliminates this confusing aspect of the arguments object. In strict mode, the 
arguments object does not reflect changes to the named parameters. 


The arguments object in a function using ECMAScript 6 default parameters, however, will always behave in the same manner 
as ECMAScript 5 strict mode, regardless of whether the function is explicitly running in strict mode.

```javascript
// not in strict mode
function mixArgs(first, second = "b") {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a");
```

This outputs:

1
true
false
false
false

### Default Parameter Expressions

Perhaps the most interesting feature of default parameter values is that the default value need not be a primitive value. You can, for example, execute a function to retrieve the default parameter, like this:

```javascript
function getValue() {
    return 5;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
```

This behavior introduces another interesting capability. You can use a previous parameter as the default for a later parameter. Here’s an example:

```javascript
function add(first, second = first) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1)); 
```

The ability to reference parameters from default parameter assignments works only for previous arguments, so earlier arguments do not have access to later arguments.


## Unnamed Parameters in ECMAScript 5

When We have an unknown number of parameters in a function and We use arguments to iterate over all of them is not obvious
what the function does.

## Rest Parameters

A rest parameter is indicated by three dots (...) preceding a named parameter. That named parameter becomes an Array 
containing the rest of the parameters passed to the function, which is where the name “rest” parameters originates.

```javascript
function pick(object, ...keys) {
    let result = Object.create(null);
    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
} 
```

In this version of the function, keys is a rest parameter that contains all parameters passed after object 
(unlike arguments, which contains all parameters including the first one). That means you can iterate over keys from 
beginning to end without worry. As a bonus, you can tell by looking at the function that it is capable of handling any 
number of parameters.

### Rest Parameter Restrictions

- The first restriction is that there can be only one rest parameter, and the rest parameter must be last.
- The arguments object always correctly reflects the parameters that were passed into a function regardless of rest 
parameter usage.

## The Spread Operator

```javascript
let values = [25, 50, 75, 100]

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```   

## Block-Level Functions
    
Block level functions are hoisted to the top of the block in which they are defined, so typeof doSomething returns 
"function" even though it appears before the function declaration in the code. Once the if block is finished executing, 
doSomething() no longer exists.

```javascript
"use strict";
if (true) {
    console.log(typeof doSomething);        // "function"
    function doSomething() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething);            // "undefined"
```

### Deciding When to Use Block-Level Functions

Block level functions are similar to let function expressions in that the function definition is removed once execution 
flows out of the block in which it’s defined. The key difference is that block level functions are hoisted to the top 
of the containing block. Function expressions that use let are not hoisted, as this example illustrates:

```javascript
"use strict";
if (true) {
    console.log(typeof doSomething);        // throws error
    let doSomething = function () {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething);
```

Here, code execution stops when typeof doSomething is executed, because the let statement hasn’t been executed yet, 
leaving doSomething() in the TDZ. Knowing this difference, you can choose whether to use block level functions or let 
expressions based on whether or not you want the hoisting behavior.


## Arrow Functions
   
- No this, super, arguments, and new.target bindings - The value of this, super, arguments, and new.target inside of the 
function is by the closest containing nonarrow function. 
- Cannot be called with new - Arrow functions do not have a [[Construct]] method and therefore cannot be used as 
constructors. Arrow functions throw an error when used with new.
- No prototype - since you can’t use new on an arrow function, there’s no need for a prototype. The prototype property of 
an arrow function doesn’t exist.
- Can’t change this - The value of this inside of the function can’t be changed. It remains the same throughout the 
entire lifecycle of the function.
- No arguments object - Since arrow functions have no arguments binding, you must rely on named and rest parameters to 
access function arguments..
- No duplicate named arguments - arrow functions cannot have duplicate named arguments in strict or nonstrict mode, as 
opposed to nonarrow functions that cannot have duplicate named arguments only in strict mode.

The rest of the differences are also focused on reducing errors and ambiguities inside of arrow functions. By doing so, 
JavaScript engines are better able to optimize arrow function execution.

### Arrow Function Syntax

```javascript
var reflect = value => value;

// effectively equivalent to:

var reflect = function(value) {
    return value;
};
```

If you are passing in more than one argument, then you must include parentheses around those arguments, like this:

```javascript
var sum = (num1, num2) => num1 + num2;

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

If there are no arguments to the function, then you must include an empty set of parentheses in the declaration, as 
follows:

```javascript
var getName = () => "Nicholas";

// effectively equivalent to:

var getName = function() {
    return "Nicholas";
};
```

When you want to provide a more traditional function body, perhaps consisting of more than one expression, then you 
need to wrap the function body in braces and explicitly define a return value, as in this version of sum():

```javascript
var sum = (num1, num2) => {
    return num1 + num2;
};

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

You can more or less treat the inside of the curly braces the same as you would in a traditional function, with the 
exception that arguments is not available.

Curly braces are used to denote the function’s body, which works just fine in the cases you’ve seen so far. But an 
arrow function that wants to return an object literal outside of a function body must wrap the literal in parentheses. 
For example:

```javascript
var getTempItem = id => ({ id: id, name: "Temp" });

// effectively equivalent to:

var getTempItem = function(id) {

    return {
        id: id,
        name: "Temp"
    };
};
```

### Creating Immediately-Invoked Function Expressions

One popular use of functions in JavaScript is creating immediately-invoked function expressions (IIFEs). 
IIFEs allow you to define an anonymous function and call it immediately without saving a reference. This pattern comes 
in handy when you want to create a scope that is shielded from the rest of a program.

You can accomplish the same thing using arrow functions, so long as you wrap the arrow function in parentheses:

```javascript
let person = ((name) => {

    return {
        getName: function() {
            return name;
        }
    };

})("Nicholas");

console.log(person.getName());      // "Nicholas"
```

Arrow functions have no this binding, which means the value of this inside an arrow function can only be determined by 
looking up the scope chain. If the arrow function is contained within a nonarrow function, this will be the same as the 
containing function; otherwise, this is undefined.


### Arrow Functions and Arrays

```javascript
var result = values.sort(function(a, b) {
    return a - b;
});
```

That’s a lot of syntax for a very simple procedure. Compare that to the more terse arrow function version:

```javascript
var result = values.sort((a, b) => a - b);
```

### No arguments Binding

Even though arrow functions don’t have their own arguments object, it’s possible for them to access the arguments 
object from a containing function. That arguments object is then available no matter where the arrow function is 
executed later on. For example:

```javascript
function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
}
var arrowFunction = createArrowFunctionReturningFirstArg(5);
console.log(arrowFunction());       // 5
```

## Tail Call Optimization

Perhaps the most interesting change to functions in ECMAScript 6 is an engine optimization, which changes the tail call 
system. A tail call is when a function is called as the last statement in another function, like this:

```javascript
function doSomething() {
    return doSomethingElse();   // tail call
}
```

ECMAScript 6 seeks to reduce the size of the call stack for certain tail calls in strict mode (nonstrict mode tail 
calls are left untouched). With this optimization, instead of creating a new stack frame for a tail call, the current 
stack frame is cleared and reused so long as the following conditions are met:

1. The tail call does not require access to variables in the current stack frame (meaning the function is not a closure)
2. The function making the tail call has no further work to do after the tail call returns
3. The result of the tail call is returned as the function value

# Expanded Object Functionality

## Property Initializer Shorthand


In ECMAScript 6, you can eliminate the duplication that exists around property names and local variables by using the 
property initializer shorthand. When an object property name is the same as the local variable name, you can simply 
include the name without a colon and value. For example, createPerson() can be rewritten for ECMAScript 6 as follows:

```javascript
function createPerson(name, age) {
    return {
        name,
        age
    };
}   
```

## Concise Methods

In ECMAScript 6, the syntax is made more concise by eliminating the colon and the function keyword. That means you can 
rewrite the previous example like this:

```javascript
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```

## Computed Property Names

```javascript
var lastName = "last name";

var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

The square brackets inside the object literal indicate that the property name is computed, so its contents are 
evaluated as a string. That means you can also include expressions such as:

```javascript
var suffix = " name";

var person = {
    ["first" + suffix]: "Nicholas",
    ["last" + suffix]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person["last name"]);       // "Zakas"
```

## New Methods

### The Object.is() Method

This method accepts two arguments and returns true if the values are equivalent. Two values are considered equivalent 
when they are of the same type and have the same value. Here are some examples:

```javascript
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false
```

### The Object.assign() Method

```javascript
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
}

var myObject = {}
Object.assign(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

## Changing an Object’s Prototype

The Object.setPrototypeOf() method accepts two arguments: the object whose prototype should change and the object that 
should become the first argument’s prototype. For example:

```javascript
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

## Easy Prototype Access with Super References

















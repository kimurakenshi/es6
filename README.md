# ES6 Fundamentals

New features added in ES6 based on the book written by Nicholas Zakas [Understanding ECMAScript 6
](https://leanpub.com/understandinges6/read)

## Table of contents

- [Block Binding](#block-bindings)
- [Strings and Regular Expressions](#strings-and-regular-expressions)
- [Functions](#functions)
- [Rest Parameters](#rest-parameters)
- [Arrow Functions](#arrow-functions)
- [Expanded Object Functionality](#expanded-object-functionality)
- [Destructuring for Easier Data Access](#destructuring-for-easier-data-access)
- [Sets and Maps](#sets-and-maps)
- [Iterators and Generators](#iterators-and-generators)
- [Classes](#classes)
- [Arrays](#arrays)

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

## Functions

### Functions with Default Parameters
   
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

#### How Default Parameters Affect the arguments Object

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

#### Default Parameter Expressions

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


### Unnamed Parameters in ECMAScript 5

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

### The Spread Operator

```javascript
let values = [25, 50, 75, 100]

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```   

### Block-Level Functions
    
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

#### Deciding When to Use Block-Level Functions

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

### Tail Call Optimization

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

## Expanded Object Functionality

### Property Initializer Shorthand

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

### Concise Methods

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

### Computed Property Names

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

### New Methods

#### The Object.is() Method

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

#### The Object.assign() Method

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

### Changing an Object’s Prototype

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

### Easy Prototype Access with Super References

in ECMAScript 5:

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


let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};

// set prototype to person
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting());                      // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);  // true
```

ECMAScript 6 introduced super. At it’s simplest, super is a pointer to the current object’s prototype, effectively the 
Object.getPrototypeOf(this) value.

```javascript
let friend = {
    getGreeting() {
        // in the previous example, this is the same as:
        // Object.getPrototypeOf(this).getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
```

### A Formal Method Definition
   
ECMAScript 6 formally defines a method as a function that has an internal [[HomeObject]] property containing the object 
to which the method belongs. Consider the following:

```javascript
let person = {

    // method
    getGreeting() {
        return "Hello";
    }
};

// not a method
function shareGreeting() {
    return "Hi!";
}
```

This example defines person with a single method called getGreeting(). The [[HomeObject]] for getGreeting() is person 
by virtue of assigning the function directly to an object. The shareGreeting() function, on the other hand, has 
no [[HomeObject]] specified because it wasn’t assigned to an object when it was created. In most cases, this difference isn’t important, but it becomes very important when using super references.

Any reference to super uses the [[HomeObject]] to determine what to do. The first step is to call 
Object.getPrototypeOf() on the [[HomeObject]] to retrieve a reference to the prototype. Then, the prototype is searched 
for a function with the same name. Last, the this-binding is set and the method is called. If a function has no 
[[HomeObject]], or has a different [[HomeObject]] than expected, then this process won’t work and an error is thrown, 
as in this code snippet:

```javascript
let person = {
    getGreeting() {
        return "Hello";
    }
};

// prototype is person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);

function getGlobalGreeting() {
    return super.getGreeting() + ", yo!";
}

console.log(friend.getGreeting());  // "Hello, hi!"

getGlobalGreeting();                // throws error
```

Calling friend.getGreeting() returns a string, while calling getGlobalGreeting() throws an error for improper use of 
the super keyword. Since the getGlobalGreeting() function has no [[HomeObject]], it’s not possible to perform a lookup.

Interestingly, the situation doesn’t change if getGlobalGreeting() is later assigned as a method on the friend object, 
like this:

```javascript
// prototype is person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);

function getGlobalGreeting() {
    return super.getGreeting() + ", yo!";
}

console.log(friend.getGreeting());  // "Hello, hi!"

// assign getGreeting to the global function
friend.getGreeting = getGlobalGreeting;

friend.getGreeting();               // throws error
```

Here the getGlobalGreeting() function overwrites the previously-defined getGreeting() method on the friend object. 
Calling friend.getGreeting() at that point results in an error as well, because it’s now calling the getGlobalGreeting() 
method, which does not have a [[HomeObject]]. The value of [[HomeObject]] is only set when the function is first created, 
so even assigning the method onto an object doesn’t fix the problem.

## Destructuring for Easier Data Access
  
ECMAScript 6 simplifies this task by adding destructuring, which is the process of breaking a data structure down into 
smaller parts.

### Object Destructuring
   
```javascript
let node = {
        type: "Identifier",
        name: "foo"
    };

let { type, name } = node;

console.log(type);      // "Identifier"
console.log(name);      // "foo"
```
In this code, the value of node.type is stored in a variable called type and the value of node.name is stored in a 
variable called name.
 
#### Destructuring Assignment

 The object destructuring examples so far have used variable declarations. However, it’s also possible to use 
 destructuring in assignments. For instance, you may decide to change the values of variables after they are defined, 
 as follows:
 
 ```javascript
 let node = {
         type: "Identifier",
         name: "foo"
     },
     type = "Literal",
     name = 5;
 
 // assign different values using structuring
 ({ type, name } = node);
 
 console.log(type);      // "Identifier"
 console.log(name);      // "foo"
```

#### Default Values

You can optionally define a default value to use when a specified property doesn’t exist. To do so, insert an equals 
sign (=) after the property name and specify the default value, like this:

```javascript
let node = {
        type: "Identifier",
        name: "foo"
    };

let { type, name, value = true } = node;

console.log(type);      // "Identifier"
console.log(name);      // "foo"
console.log(value);     // true
```

#### Assigning to Different Local Variable Names

```javascript
let node = {
        type: "Identifier",
        name: "foo"
    };

let { type: localType, name: localName } = node;

console.log(localType);     // "Identifier"
console.log(localName);     // "foo"
```

#### Nested Object Destructuring

```javascript
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        }
    };

let { loc: { start }} = node;

console.log(start.line);        // 1
console.log(start.column);      // 1
```
### Array Destructuring
   
Array destructuring syntax is very similar to object destructuring; it just uses array literal syntax instead of object 
literal syntax. The destructuring operates on positions within an array, rather than the named properties that are 
available in objects. For example:

```javascript
let colors = [ "red", "green", "blue" ];

let [ firstColor, secondColor ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

If, for example, you just want the third value of an array:

```javascript
let colors = [ "red", "green", "blue" ];

let [ , , thirdColor ] = colors;

console.log(thirdColor);        // "blue"
```

#### Destructuring Assignment

You can use array destructuring in the context of an assignment, but unlike object destructuring, there is no need to 
wrap the expression in parentheses. For example:

```javascript
let colors = [ "red", "green", "blue" ],
    firstColor = "black",
    secondColor = "purple";

[ firstColor, secondColor ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

Here’s how you can swap variables in ECMAScript 6:

```javascript
// Swapping variables in ECMAScript 6
let a = 1,
    b = 2;

[ a, b ] = [ b, a ];

console.log(a);     // 2
console.log(b);     // 1
```
#### Default Values

Array destructuring assignment allows you to specify a default value for any position in the array, too. The default 
value is used when the property at the given position either doesn’t exist or has the value undefined. For example:

```javascript
let colors = [ "red" ];

let [ firstColor, secondColor = "green" ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

#### Nested Destructuring

```javascript
let colors = [ "red", [ "green", "lightgreen" ], "blue" ];

// later

let [ firstColor, [ secondColor ] ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```
#### Rest Items

Chapter 3 introduced rest parameters for functions, and array destructuring has a similar concept called rest items. Rest items use the ... syntax to assign the remaining items in an array to a particular variable. Here’s an example:

```javascript
let colors = [ "red", "green", "blue" ];

let [ firstColor, ...restColors ] = colors;

console.log(firstColor);        // "red"
console.log(restColors.length); // 2
console.log(restColors[0]);     // "green"
console.log(restColors[1]);     // "blue"
```

A glaring omission from JavaScript arrays is the ability to easily create a clone. In ECMAScript 5, developers 
frequently used the concat() method as an easy way to clone an array. For example:

```javascript
// cloning an array in ECMAScript 5
var colors = [ "red", "green", "blue" ];
var clonedColors = colors.concat();

console.log(clonedColors);      //"[red,green,blue]"
```
While the concat() method is intended to concatenate two arrays together, calling it without an argument returns a 
clone of the array. In ECMAScript 6, you can use rest items to achieve the same thing through syntax intended to 
function that way. It works like this:

```javascript
// cloning an array in ECMAScript 6
let colors = [ "red", "green", "blue" ];
let [ ...clonedColors ] = colors;

console.log(clonedColors);      //"[red,green,blue]"
```
### Mixed Destructuring
   
```javascript
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        },
        range: [0, 3]
    };

let {
    loc: { start },
    range: [ startIndex ]
} = node;

console.log(start.line);        // 1
console.log(start.column);      // 1
console.log(startIndex);        // 0
```

### Destructured Parameters
   
Destructuring has one more particularly helpful use case, and that is when passing function arguments. When a JavaScript 
function takes a large number of optional parameters, one common pattern is to create an options object whose properties 
specify the additional parameters, like this:

```javascript
// properties on options represent additional parameters
function setCookie(name, value, options) {

    options = options || {};

    let secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;

    // code to set the cookie
}

// third argument maps to options
setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```

Destructured parameters offer an alternative that makes it clearer what arguments a function expects. A destructured 
parameter uses an object or array destructuring pattern in place of a named parameter. To see this in action, look at 
this rewritten version of the setCookie() function from the last example:

```javascript
function setCookie(name, value, { secure, path, domain, expires }) {

    // code to set the cookie
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```

This function behaves similarly to the previous example, but now, the third argument uses destructuring to pull out the 
necessary data. The parameters outside the destructured parameter are clearly expected, and at the same time, it’s clear 
to someone using setCookie() what options are available in terms of extra arguments. And of course, if the third argument 
is required, the values it should contain are crystal clear. The destructured parameters also act like regular parameters 
in that they are set to undefined if they are not passed.

**Destructured Parameters are Required**

If you want the destructured parameter to be required, then this behavior isn’t all that troubling. But if you want the 
destructured parameter to be optional, you can work around this behavior by providing a default value for the 
destructured parameter, like this:

```javascript
function setCookie(name, value, { secure, path, domain, expires } = {}) {

    // ...
}
```

Or you can specify the default values:

```javascript
function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
    }
) {

    // ...
}
```

If you want default parameters but also optional parameters you can do something like this:

```javascript
const setCookieDefaults = {
        secure: false,
        path: "/",
        domain: "example.com",
        expires: new Date(Date.now() + 360000000)
    };

function setCookie(name, value,
    {
        secure = setCookieDefault.secure,
        path = setCookieDefault.path,
        domain = setCookieDefault.domain,
        expires = setCookieDefault.expires
    } = setCookieDefaults
) {

    // ...
}
```

## Sets and Maps
  
A `set` is a list of values that cannot contain duplicates. 
A `map` is a collection of keys that are mapped to specific values.As such, each item in a map stores two pieces of data 
and values are retrieved by specifying the key to read from. Maps are frequently used as caches, storing data that is to 
be quickly retrieved later on.

### Sets

ECMAScript 6 adds a Set type that is an ordered list of values without duplicates. Sets allow fast access to the data 
contained within, adding a more efficient manner of tracking discrete values. Sets are created using new Set() and items
are added to the set by using the add() method. You can see how many items are in the set by using the size property.

```javascript
let set = new Set();
set.add(5);
set.add("5");

console.log(set.size);    // 2
```
Sets do not coerce values to determine they are the same. So, a set can contain both the number 5 and the string "5" 
(internally, the comparison is done using Object.is(). That means you can also add multiple objects to the set and they 
remain distinct:

```javascript
let set = new Set(),
    key1 = {},
    key2 = {};

set.add(key1);
set.add(key2);

console.log(set.size);    // 2
```

You can test to see which values are in the set using the has() method:

```javascript
let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5));    // true
console.log(set.has(6));    // false
```

It’s possible to remove a single value from a set by using the delete() method or you can remove all values from the set 
by using clear().

The strange difference between the set version of `forEach()` and the array version is that the first and second arguments 
to the callback function are the same.

The other objects that have forEach() methods, arrays and maps, pass three arguments to their callback functions. The 
first two arguments for arrays and maps are the value and the key (the numeric index for arrays). Sets do not have keys, 
so you could either make the callback function accept two arguments (which would make it different from the others) or 
find a way to keep the callback function the same and accept three arguments.

### WeakSet

The biggest difference between weak sets and regular sets is the weak reference held to the object value. Here’s an 
example of what that means:

```javascript
let set = new WeakSet(),
    key = {};

// add the object to the set
set.add(key);

console.log(set.has(key));      // true

// remove the last strong reference to key, also removes from weak set
key = null;
```

1. The add(), has(), and delete() methods throw an error when passed a non-object.
2. Weak sets are not iterables and therefore cannot be used in a for-of loop.
3. Weak sets do not expose any iterators (such as keys() and values()), so there is no way to programmatically 
determine the contents of a weak set.
4. Weak sets do not have a forEach() method.

### Maps

The ECMAScript 6 Map type is an ordered list of key-value pairs where both the key and the value can be of any type. 
Keys are considered to be the same by using Object.is(), so you can have both a key of 5 and a key of "5" because they 
are different types. This is quite different than using object properties as keys, which always coerce values into 
strings.

Items are added to maps by using the set() method and passing in the key and the value to associate with the key. 
You can later retrieve a value by passing the key to get(). For example:

```javascript
let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2016);

console.log(map.get("title"));      // "Understanding ES6"
console.log(map.get("year"));       // 2016
```

You can also use objects as keys, something that isn’t possible using object properties. Here’s an example:

```javascript
let map = new Map(),
    key1 = {},
    key2 = {};

map.set(key1, 5);
map.set(key2, 42);

console.log(map.get(key1));         // 5
console.log(map.get(key2));         // 42
```

#### Map Methods

1. has(key) - determines if the given key exists in the map.
2. delete(key) - removes the key and its associated value from the map.
3. clear() - removes all keys and values from the map.

Additionally, maps have a size property that indicates how many key-value pairs it contains. 

#### Map Initialization

Also similar to sets, you can initialize a map with data by passing an array to the Map constructor. Each item in the 
array must itself be an array where the first item is the key and the second is the value. The entire map, therefore, 
is an array of these two-item arrays, for example:

```javascript
let map = new Map([ ["name", "Nicholas"], ["age", 25]]);

console.log(map.has("name"));   // true
console.log(map.get("name"));   // "Nicholas"
console.log(map.has("age"));    // true
console.log(map.get("age"));    // 25
console.log(map.size);          // 2
```

#### The forEach Method
The forEach() method for maps is similar to forEach() for sets and arrays in that it accepts a callback function that 
receives three arguments:

- The value from the next position in the map
- The key for that value
- The map from which the value is read

```javascript
let map = new Map([ ["name", "Nicholas"], ["age", 25]]);

map.forEach(function(value, key, ownerMap) {
    console.log(key + " " + value);
    console.log(ownerMap === map);
});
```

### Weak Maps

Weak maps are to maps what weak sets are to sets, which is a way to store weak object references. In weak maps, every 
key must be an object (and error is thrown if you try to use a non-object key), and those object references are held 
weakly so as not to interfere with garbage collection. When there are no other references to a weak map key, the 
key-value pair is removed from the weak map.

`It’s important to note that only weak map keys, and not weak map values, are weak references. An object stored as a 
weak map value will prevent garbage collection if all other references are removed.`

#### Using Weak Maps

The ECMAScript 6 WeakMap type is an unordered list of key-value pairs where the key must be a non-null object and the 
value can be of any type.

```javascript
let map = new WeakMap(),
    element = document.querySelector(".element");

map.set(element, "Original");

let value = map.get(element);
console.log(value);             // "Original"

// remove the element
element.parentNode.removeChild(element);
element = null;

// the weak map is empty at this point
```

`Similar to weak sets, there is no way to verify that the weak map is empty because it doesn’t have a size property. 
Because there are no remaining references to the key, you can’t use get() to attempt to retrieve the value. The weak 
map has cut off access to the value for that key and, when the garbage collector runs, that memory will be freed.`

#### Weak Map Methods

Weak maps have only a couple of additional methods available to interact with its items. There is a has() method to 
determine if the given key exists in the map and a delete() method to remove a specific key-value pair. There is no 
clear() method because that would require enumerating keys, and like weak sets, that is not possible with weak maps.

##### Private Object Data
While most developers consider the main use case of weak maps to be associated data with DOM elements, there are many 
possible uses (and no doubt, some that have yet to be discovered). One practical use of weak maps is to store data that 
is private to object instances. All object properties are public in ECMAScript 6 and so you need to use some creativity 
to make data access to objects but not accessible to everything. Consider the following example:

```javascript
function Person(name) {
    this._name = name;
}

Person.prototype.getName = function() {
    return this._name;
};
```

This problem can be solved by using a weak map instead:

```javascript
let Person = (function() {

    let privateData = new WeakMap();

    function Person(name) {
        privateData.set(this, { name: name });
    }

    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };

    return Person;
}());
```

This version of the code uses a weak map for the private data instead of an object. Because the object instance itself 
can be used as a key, there’s no need to keep track of a separate ID. When the Person constructor is called, a new entry 
is made into the weak map with a key of this and a value of an object containing private information (in this case, just 
name). That information is retrieved inside of getName() by passing this to privateData.get() in order to retrieve the 
data object and access the name property. In this way, the private information is kept private and will be destroyed 
whenever an object instance is destroyed.

#### Uses and Limitations

When deciding whether to use a weak map or a regular map, the primary decision is whether you want to use only object 
keys. Anytime you’re going to use only object keys then the best choice is a weak map. That will allow you to optimize 
memory usage and avoid memory leaks by ensuring that extra data isn’t kept around after it’s no longer accessible.

Keep in mind that weak maps give you very little visibility into their contents, so you can’t use forEach(), size, or 
clear() to manage the items. If you need some inspection capabilities, then regular maps are a better choice. Just be 
sure to keep an eye on memory usage.

## Iterators and Generators
  
When coupled with new array methods and new types of collections (such as sets and maps), iterators become even more 
important for efficient processing of data.

### What are Iterators?

Iterators are nothing more than objects with a specific interface. That interface consists of a method called next() 
that returns a result object. The result object has two properties, value, which is the next value, and done, which is 
a boolean value that’s true when there are no more values to return. The iterator keeps an internal pointer to a 
location within a collection of values and, with each call to next(), returns the next appropriate value.

If you call next() after the last value has been returned, the method returns done as true and value contains the return 
value for the iterator. The return value is not considered part of the data set, but rather a final piece of related 
data or undefined if no such data exists.

### Generators

A generator is a special kind of function that returns an iterator. Generator functions are indicated by inserting a 
star character (*) after the function keyword.
The yield keyword is used inside of generators to specify the values that the iterator should return when next() is 
called. So if you want to return three different values for each successive call to next(), you can do so as follows:

```javascript
// generator
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

// generators are called like regular functions but return an iterator
let iterator = createIterator();

console.log(iterator.next().value);     // 1
console.log(iterator.next().value);     // 2
console.log(iterator.next().value);     // 3
```

Perhaps the most interesting aspect of generator functions is that they stop execution after each yield statement, so 
yield 1 executes and then the function doesn’t execute anything else until the iterator’s next() method is called. At 
that point, execution resumes with the next statement after yield 1, which in this case is yield 2. This ability to 
stop execution in the middle of a function is extremely powerful and lends to some interesting uses of generator 
functions.

#### Generator Function Expressions

```javascript
let createIterator = function *(items) {
    for (let i=0; i < items.length; i++) {
        yield items[i];
    }
};

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

#### Generator Object Methods

```javascript
var o = {

    createIterator: function *(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }
};

let iterator = o.createIterator([1, 2, 3]);
```

## Iterables and for-of

Closely related to the concept of an iterator is an iterable. An iterable is an object with a @@iterator symbol property. 
The well-known @@iterator symbol specifies a function that returns an iterator for the given object. All of the collection 
objects, including arrays, sets, and maps, as well as strings, are iterables in ECMAScript 6 and so have a default 
iterator specified. Iterables are designed to be used with a new addition to ECMAScript: the for-of loop.


The for-of loop is the second part of the solution to the problem introduced at the beginning of this chapter. Instead 
of requiring you to track an index into a collection, the for-of loop works by calling next() on an iterable each time 
through the loop and storing the value from the result object in a variable. The loop continues this process until the 
done property of the returned object is true. For example:

```javascript
let values = [1, 2, 3];

for (let num of values) {
    console.log(num);
}
```

The advantage of the for-of loop as opposed to the traditional for loop is that you never have to keep track of an 
index into a collection. Instead, you can just focus on working with the contents of the collection.

Knowing that `Symbol.iterator` specifies the default iterator, it’s possible to detect if an object is iterable by using 
the following:

```javascript
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
```

### Collection Iterators

ECMAScript 6 has three types of collection objects: arrays, maps, and sets. All three have the same built-in iterators 
to help you navigate their content. You can retrieve an iterator for a collection by calling one of these methods:

- entries() - returns an iterator whose values are a key-value pair.
- values() - returns an iterator whose values are the values of the collection.
- keys() - returns an iterator whose values are the keys contained in the collection.

The entries() iterator returns a two-item array each time next() is called. The two-item array represents the key and 
value for each item in the collection. For arrays, the first item is the numeric index; for sets, the first item is 
also the value (since values double as keys in sets); for maps, the first item is the key. Here are some examples:

```javascript
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
    console.log(entry);
}

for (let entry of tracking.entries()) {
    console.log(entry);
}

for (let entry of data.entries()) {
    console.log(entry);
}
```

This example outputs the following:

```javascript
[0, "red"]
[1, "green"]
[2, "blue"]
[1234, 1234]
[5678, 5678]
[9012, 9012]
["title", "Understanding ECMAScript 6"]
["format", "ebook"]
```

The values() iterator simply returns the values as they are stored in the collection. For example:

```javascript
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let value of colors.values()) {
    console.log(value);
}

for (let value of tracking.values()) {
    console.log(value);
}

for (let value of data.values()) {
    console.log(value);
}
```

This example outputs the following:

```javascript
"red"
"green"
"blue"
1234
5678
9012
"Understanding ECMAScript 6"
"ebook"
```

The keys() iterator returns each key present in the collection. For arrays, this is the numeric keys only (it never 
returns other own properties of the array); for sets, the keys are the same as the values and so keys() and values() 
return the same iterator; for maps, this is each unique key. Here’s an example:

```javascript
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let key of colors.keys()) {
    console.log(key);
}

for (let key of tracking.keys()) {
    console.log(key);
}

for (let key of data.keys()) {
    console.log(key);
}
```

This example outputs the following:

```javascript
0
1
2
1234
5678
9012
"title"
"format"
```    

Additionally, each collection type has a default iterator that is used by for-of whenever an iterator isn’t explicitly 
specified. The default iterator for arrays and sets is values() while the default iterator for maps is entries(). This 
makes it a little bit easier to use collection objects in for-of:

```javascript
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

// same as using colors.values()
for (let value of colors) {
    console.log(value);
}

// same as using tracking.values()
for (let num of tracking) {
    console.log(num);
}

// same as using data.entries()
for (let entry of data) {
    console.log(entry);
}
```

### String Iterators

ECMAScript 6 has added a lot of functionality to fully support Unicode (see Chapter 2) and as such, the default iterator 
for strings works on characters rather than code units.

```javascript
var message = "A ð ®· B";

for (let c of message) {
    console.log(c);
}
This code outputs the following:

A
(blank)
ð ®·
(blank)
B
```

### NodeList Iterators

With the addition of default iterators in ECMAScript 6, the DOM definition of NodeList now specifically includes a 
default iterator that behaves in the same manner as the array default iterator. That means you can use NodeList in a 
for-of loop or any other place that uses an object’s default iterator. For example:

```javascript
var divs = document.getElementsByTagName("div");

for (let div of divs) {
    console.log(div.id);
}
```

### Passing Arguments to Iterators
Throughout this chapter, you’ve seen that iterators can pass values out via the next() method or by using yield in a 
generator. It’s also possible to pass arguments into the iterator through the next() method. When an argument is passed 
to next(), it becomes the value of the yield statement inside a generator. For example:

```javascript
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;       // 4 + 2
    yield second + 3;                   // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next(4));          // "{ value: 6, done: false }"
console.log(iterator.next(5));          // "{ value: 8, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

### Generator Return Statements

Since generators are functions, you can use the return statement both to exit early and to specify a return value for 
the last call to next().

```javascript
function *createIterator() {
    yield 1;
    return 42;
}

let iterator = createIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 42, done: true }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

### Asynchronous Task Running
   
A lot of the excitement around generators is directly related to usage with asynchronous programming. Asynchronous 
programming in JavaScript is a double-edged sword: it’s very easy to do simple things while complex things become an 
errand in code organization. Since generators allow you to effectively pause code in the middle of execution, this 
opens up a lot of possibilities as it relates to asynchronous processing.

#### A Simple Task Runner
Because yield stops execution and waits for the next() method to be called before starting again, this provides a way 
to implement asynchronous calls without managing callbacks. To start, you need a function that can call a generator and 
start the iterator, such as:

```javascript
function run(taskDef) {

    // create the iterator, make available elsewhere
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to keep calling next()
    function step() {

        // if there's more to do
        if (!result.done) {
            result = task.next();
            step();
        }
    }

    // start the process
    step();
}
```

## Classes

### Class Declarations
    
```javascript
class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonClass);     // true
console.log(person instanceof Object);          // true

console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"
```

1. Class declarations, unlike function declarations, are not hoisted. Class declarations act like let declarations and 
so exist in the temporal dead zone until execution reaches the declaration.
2. All code inside of class declarations runs in strict mode automatically. There’s no way to opt-out of strict mode 
inside of classes.
3. All methods are non-enumerable. This is a significant change from custom types, where you need to use 
Object.defineProperty() to make a method non-enumerable.
4. All methods have no [[Construct]] internal method and so throw an error if you try to call them with new.
5. Calling the class constructor without new throws an error.
6. Attempting to overwrite the class name within a class method throws an error.

### Class Expressions
    
These class expressions are designed to be used in variable declarations or passed into functions as arguments. Here’s 
the class expression equivalent of the previous examples:

```javascript
// class expressions do not require identifiers after "class"
let PersonClass = class {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonClass);     // true
console.log(person instanceof Object);          // true

console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"
```

Whether you use class declarations or class expressions is purely a matter of style. Unlike function declarations and 
function expressions, both class declarations and class expressions are not hoisted, and so the choice has little 
bearing on the runtime behavior of the code.

### Accessor Properties
    
While own properties should be created inside of class constructors, classes allow you to define accessor properties on 
the prototype. To create a getter, use the keyword get followed by a space followed by an identifier; to create a 
setter, do the same using the keyword set. For example:

```javascript
class CustomHTMLElement {

    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,\
 "html");
console.log("get" in descriptor);   // true
console.log("set" in descriptor);   // true
console.log(descriptor.enumerable); // false
```

### Static Members
    
Classes simplify the creation of static members by using the formal static annotation before the method or accessor 
property name. Here’s the equivalent of the last example:

```javascript
class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }

    // equivalent of PersonType.create
    static create(name) {
        return new PersonClass(name);
    }
}

let person = PersonClass.create("Nicholas");
```
        
### Inheritance with Derived Classes
    
Classes make inheritance easier by using the familiar extends keyword to specify the function from which the class 
should inherit. The prototypes are automatically adjusted and you can access the base class constructor using super(). 
Here’s the equivalent of the previous example:
        
```javascript
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }
}

class Square extends Rectangle {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}

var square = new Square(3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true
```

### Shadowing Class Methods

The methods on derived classes always shadow methods of the same name on the base class. For instance, you can add getArea() to Square in order to redefine that functionality:

```javascript
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // override and shadow Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}
```
                                                                
### new.target
    
In Chapter 3, you learned about new.target and how its value changes depending on how a function is called. You can 
also use new.target in class constructors to determine how the class is being invoked. In the simple case, new.target 
is equal to the constructor function for the class:
                                                                
```javascript
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

// new.target is Rectangle
var obj = new Rectangle(3, 4);      // outputs true
```

## Arrays

### Creating Arrays

#### Array.of()

The Array.of() method always creates an array containing its arguments regardless of the number of arguments or the 
argument types. Here are some examples:

```javascript
let items = Array.of(1, 2);         // length is 2
console.log(items.length);          // 2
console.log(items[0]);              // 1
console.log(items[1]);              // 2

items = Array.of(2);
console.log(items.length);          // 1
console.log(items[0]);              // 2

items = Array.of("2");
console.log(items.length);          // 1
console.log(items[0]);              // "2"
```

#### Array.from()

The Array.from() method was added in ECMAScript 6 as a more obvious way of converting objects into arrays. You can pass 
either an iterable or an array-like object as the first argument and Array.from() returns an array. Here’s a simple 
example:

```javascript
function doSomething() {
    var args = Array.from(arguments);

    // use args
}
```

#### Mapping Conversion
If you want to take this conversion a step further, you can provide a second argument to Array.from() that is a mapping 
function used to convert each value into a final form. For example:

```javascript
function translate() {
    return Array.from(arguments, (value) => value + 1);
}

let numbers = translate(1, 2, 3);

console.log(numbers);               // 2,3,4
```























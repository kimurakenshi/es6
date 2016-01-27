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
```javascript

#### Tagged Templates







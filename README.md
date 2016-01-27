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
